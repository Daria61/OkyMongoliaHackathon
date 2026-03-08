# Technical Design Document: Oky

## 1. Introduction

This document provides a technical overview of the Oky project, a period tracker mobile application. The project is a monorepo containing the mobile app, a backend API, a content management system (CMS), and a shared core library. This document is intended to help developers understand the project's architecture, technology stack, and key components.

## 2. Project Architecture

The Oky project is a monorepo managed with Yarn Workspaces. This structure allows for a clear separation of concerns and efficient code sharing between the different parts of the application.

The project is organized into the following main directories:

*   **`app`**: The React Native mobile application for iOS and Android.
*   **`packages`**: Contains the backend services and shared code:
    *   **`api`**: The backend API that serves the mobile app.
    *   **`cms`**: The content management system for managing the app's content.
    *   **`core`**: A shared library containing code used by the `app`, `api`, and `cms`.
*   **`sql`**: Contains SQL scripts for database creation and migration.
*   **`docs`**: Contains project documentation.

## 3. Tech Stack

The Oky project uses a modern and robust technology stack:

### Mobile App (`app`)

*   **Framework**: React Native with Expo
*   **Language**: TypeScript
*   **State Management**: Redux, Redux Saga
*   **Navigation**: React Navigation
*   **UI**: React Native Calendars, Lottie for animations, React Native SVG
*   **Testing**: Jest, React Native Testing Library
*   **Backend Communication**: Axios
*   **Push Notifications**: Firebase Messaging

### Backend API (`packages/api`)

*   **Framework**: Express.js with `routing-controllers`
*   **Language**: TypeScript
*   **Database**: PostgreSQL
*   **ORM**: TypeORM
*   **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
*   **Testing**: Jest

### Backend CMS (`packages/cms`)

*   **Framework**: Express.js
*   **Language**: TypeScript
*   **Database**: PostgreSQL
*   **ORM**: TypeORM
*   **Templating**: EJS
*   **Authentication**: Passport.js, cookie-session
*   **File Uploads**: Multer
*   **Testing**: Jest

### Shared (`packages/core`)

*   **Language**: TypeScript
*   Contains shared logic, mappers, and translations.

### Monorepo Management

*   **Package Manager**: Yarn Workspaces
*   **Build Tools**: `ts-node`, `typescript`, `concurrently`
*   **Linting/Formatting**: TSLint, Prettier, ESLint

## 4. Mobile App (`app`)

The mobile app is a React Native application built with Expo. It is written in TypeScript and uses Redux for state management.

### Key Features

*   **Period Tracking**: Allows users to track their menstrual cycle.
*   **Content**: Provides users with articles, quizzes, and "did you know" facts.
*   **Customization**: Allows users to customize their experience with avatars and themes.
*   **Help Centers**: Provides a list of help centers with contact information.
*   **User Accounts**: Supports user registration and login.

### Code Structure

The `app/src` directory is organized as follows:

*   **`components`**: Reusable UI components.
*   **`config`**: Application configuration, including themes and environment variables.
*   **`contexts`**: React contexts for managing state.
*   **`core`**: Core application logic, including API clients.
*   **`hooks`**: Custom React hooks.
*   **`mappers`**: Data mappers for transforming data from the API.
*   **`navigation`**: React Navigation stacks and navigators.
*   **`redux`**: Redux actions, reducers, and sagas.
*   **`resources`**: Static assets, including images, fonts, and translations.
*   **`screens`**: Application screens.
*   **`services`**: Application services, such as authentication and analytics.

## 5. Backend API (`packages/api`)

The backend API is a TypeScript-based Express.js application that serves the mobile app. It uses TypeORM to interact with the PostgreSQL database.

### Code Structure

The `packages/api/src` directory is organized as follows:

*   **`application`**: Application services that contain the business logic.
*   **`domain`**: Domain entities and services.
*   **`infrastructure`**: Infrastructure-level components, such as database repositories.
*   **`interfaces`**: API controllers and middlewares.

## 6. Backend CMS (`packages/cms`)

The backend CMS is a TypeScript-based Express.js application that allows administrators to manage the app's content. It uses EJS for templating and TypeORM to interact with the PostgreSQL database.

### Key Features

*   **Content Management**: Allows administrators to create, edit, and delete articles, quizzes, and other content.
*   **User Management**: Allows administrators to manage users.
*   **Analytics**: Provides an analytics dashboard.

### Code Structure

The `packages/cms/src` directory is organized as follows:

*   **`controller`**: Express.js controllers for handling HTTP requests.
*   **`entity`**: TypeORM entities that map to database tables.
*   **`views`**: EJS templates for rendering HTML pages.

## 7. Database

The project uses a PostgreSQL database. The database schema is defined in the `sql/create-tables.sql` file.

### Key Tables

*   **`oky_user`**: Stores user information, including date of birth, gender, location, and hashed credentials.
*   **`app_event`**: A log of events that occur in the app, used for analytics.
*   **`article`**: Stores encyclopedia articles.
*   **`category`**: Defines the categories for articles.
*   **`quiz`**: Stores quiz questions and answers.
*   **`survey`**: Stores survey questions and answers.
*   **`help_center`**: Stores information about help centers.

## 8. Deployment

The project is deployed using Docker and Kubernetes. The deployment process is defined in the `.github/workflows` directory and the `aws-infra.yml` file. The application is deployed to AWS.
