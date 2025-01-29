# eJam Backend API

## Description

A NestJS API for managing superheroes with Redis caching and pagination support.

## Features

- Create superheroes
- List superheroes with pagination
- Redis Cloud caching
- Input validation
- Error handling

## Prerequisites

- Node.js (v16+)
- Yarn package manager
- Redis Cloud account

## Installation

```bash
yarn install
```

## Running the app

```bash
# Development
yarn start:dev

# Production
yarn start:prod
```

## Test

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e
```

## API Endpoints

### Add a new superhero

```http
POST /v1/superheroes
Content-Type: application/json

{
  "name": "string",
  "superpower": "string",
  "humilityScore": number (1-10)
}
```

### Fetch the list of superheroes

```http
GET /v1/superheroes?page=1&limit=10
```

## Environment Variables

```env
APP_NAME=ejam-backend
APP_ENV=development
APP_KEY=base64:mzn5oBvLgv3qnr6lEWktzcqb3UFPSL4ZgX+fK3T8bo4=
APP_DEBUG=true
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=vs_ebdb
REDIS_HOST=redis-17923.c341.af-south-1-1.ec2.redns.redis-cloud.com
REDIS_PORT=17923
REDIS_PASSWORD=9EqjB12O8IMLJntu32YbBOYcW9tYZ38o
CACHE_TTL=172800
```

## Collaboration

To improve or expand this task, I would collaborate with a teammate by:

1. Conducting code reviews to ensure code quality and adherence to best practices.
2. Pair programming to implement new features or refactor existing code.
3. Discussing and planning the architecture and design decisions together.
4. Sharing knowledge about NestJS, Prisma, and other technologies used in the project.

## If I had more time

If I had more time, I would:

1. Implement a proper database solution like PostgreSQL instead of an in-memory database.
2. Add authentication and authorization using AWS Cognito.
3. Integrate Redis for caching and queuing operations with BullMQ.
4. Implement real-time updates using Socket.IO.
5. Write more comprehensive tests, including integration and end-to-end tests.
6. Improve error handling and validation for the API endpoints.
