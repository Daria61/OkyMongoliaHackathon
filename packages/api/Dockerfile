# This Dockerfile should be run from the ROOT of the repository
# Usage: docker build -f packages/api/Dockerfile -t api-app .

# Build stage - build both core and api packages
FROM node:20 AS builder

WORKDIR /usr/src/app

ENV DOCKER_ENV=true

# Copy root package files for workspace dependencies
COPY package.json yarn.lock ./

# Copy package.json files for required packages
COPY packages/core/package.json ./packages/core/
COPY packages/api/package.json ./packages/api/

# Install dependencies
RUN NOYARNPOSTINSTALL=1 yarn

# Copy configuration files
COPY .prettierrc tsconfig.json tslint.json ./

# Copy source code for core and api packages only
COPY packages/core ./packages/core
COPY packages/api ./packages/api

# Build core package first
RUN cd packages/core && yarn run compile

# Build api package
RUN cd packages/api && yarn run build

# Development stage
FROM node:20 AS development

ENV NODE_ENV=development
WORKDIR /usr/src/app

# Copy everything needed for development
COPY --from=builder /usr/src/app ./

WORKDIR /usr/src/app/packages/api

CMD [ "yarn", "run", "watch" ]

# Production stage
FROM node:20 AS production

ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy only the built and runtime artifacts
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages/api/package.json ./packages/api/package.json
COPY --from=builder /usr/src/app/packages/api/dist ./packages/api/dist

# Copy core package artifacts
COPY --from=builder /usr/src/app/packages/core/package.json ./packages/core/package.json
COPY --from=builder /usr/src/app/packages/core/dist ./packages/core/dist

WORKDIR /usr/src/app/packages/api

CMD [ "yarn", "serve" ]
