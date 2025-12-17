Visit the repository at: [https://github.com/TayLabs/Auth](https://github.com/TayLabs/Auth)

A self-hosted, open-source authentication service I built to provide secure user management for personal projects, serving as an alternative to commercial providers like Auth0 or Kinde.

## Overview

This REST API handles all aspects of user authentication and account management, allowing developers to own their user data without relying on third-party services. It's part of the TayLabs microservices suite, designed for flexibility, security, and ease of deployment.

## Key Features

- **User Authentication**: Secure signup, login, and session management with JWT tokens.
- **Security Enhancements**: Two-factor authentication (TOTP), email verification, password resets, and CSRF protection.
- **Account Management**: Profile updates, device session tracking, and account deletion.
- **Administrative Controls**: Role-based access control (RBAC) for managing services, roles, and permissions.
- **Rate Limiting & Monitoring**: Built-in protection against abuse with Redis-backed rate limiting and logging.

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Caching**: Redis
- **Security**: Argon2, JWT, Helmet, Csurf, and Zod for validation
- **Deployment**: Docker/Docker Compose
- **Testing**: Jest

## What I Learned

Building this service challenged me to implement robust security practices, manage complex authentication flows, and design scalable APIs and micro-services. I gained experience with modern TypeScript development, database schema design, and integrating microservices.

## Deployment

Easily deployable via Docker Compose for self-hosted environments. Includes setup for development and production with automated database migrations.
