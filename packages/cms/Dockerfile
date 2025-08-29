# This Dockerfile should be run from the ROOT of the repository
# Usage: docker build -f packages/cms/Dockerfile -t cms-app .

# Build stage - build both core and cms packages
FROM node:20 AS builder

WORKDIR /usr/src/app

ENV DOCKER_ENV=true

# Copy root package files for workspace dependencies
COPY package.json yarn.lock ./

# Copy package.json files for required packages
COPY packages/core/package.json ./packages/core/
COPY packages/cms/package.json ./packages/cms/

# Install dependencies
RUN NOYARNPOSTINSTALL=1 yarn

# Copy configuration files
COPY .prettierrc tsconfig.json tslint.json ./

# Copy source code for core and cms packages only
COPY packages/core ./packages/core
COPY packages/cms ./packages/cms

# Build core package first
RUN cd packages/core && yarn run compile

# Build cms package
RUN cd packages/cms && yarn run build

# Development stage
FROM node:20 AS development

ENV NODE_ENV=development
ENV GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/packages/cms/firebase-config.json
WORKDIR /usr/src/app

# Copy everything needed for development
COPY --from=builder /usr/src/app ./

WORKDIR /usr/src/app/packages/cms

CMD [ "yarn", "run", "start" ]

# Production stage
FROM node:20 AS production

ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy only the built and runtime artifacts
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages/cms/package.json ./packages/cms/package.json
COPY --from=builder /usr/src/app/packages/cms/dist ./packages/cms/dist

# Copy core package artifacts
COPY --from=builder /usr/src/app/packages/core/package.json ./packages/core/package.json
COPY --from=builder /usr/src/app/packages/core/dist ./packages/core/dist

WORKDIR /usr/src/app/packages/cms

CMD [ "yarn", "serve" ]
