# eJam Full Stack Application

This repository contains both the backend and frontend applications for the eJam project.

## Project Structure

```
eJam/
├── backend/    # NestJS API
└── frontend/   # React application
```

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the backend directory with the following content:

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
REDIS_PASSWORD=9EqjB12O8IMLJntu32YbBOYcW9tYZ38o // yeah, you can steal the password, it's a free account anyway
CACHE_TTL=172800
```

## ⚠️ Security Notice

For development purposes, Redis credentials are exposed in this repository. In a production environment:

1. Never commit sensitive credentials
2. Use environment variables
3. Keep .env file private
4. Use a secure Redis instance

### Development Credentials (DO NOT USE IN PRODUCTION)

```env
REDIS_HOST=redis-17923.c341.af-south-1-1.ec2.redns.redis-cloud.com
REDIS_PORT=17923
REDIS_PASSWORD=9EqjB12O8IMLJntu32YbBOYcW9tYZ38o
```

4. Run the development server:

```bash
yarn run start:dev
```

The backend will be available at `http://localhost:3000`

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
yarn run dev
```

The frontend will be available at `http://localhost:5173`

## Running Both Applications

You'll need to run both the backend and frontend applications simultaneously. Open two terminal windows:

Terminal 1 (Backend):

```bash
cd backend
npm run start:dev
```

Terminal 2 (Frontend):

```bash
cd frontend
npm run dev
```

## Testing

### Backend Tests

```bash
cd backend
yarn run test:e2e     # Run end-to-end tests
```

### Frontend Tests

```bash
cd frontend
yarn run test
```

## Additional Information

- The backend uses NestJS with PostgreSQL and Redis
- The frontend is built with React and Vite
- Both projects use TypeScript for type safety

## Available Scripts

### Backend

- `yarn start:dev` - Start development server
- `yarn build` - Build for production
- `yarn start:prod` - Start production server
- `yarn lint` - Run linter
- `yarn format` - Format code
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn test:cov` - Generate test coverage

### Frontend

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run linter
- `yarn test` - Run tests

## Development Workflow

```bash
# Install dependencies
yarn install

# Start development servers
cd backend && yarn start:dev
cd frontend && yarn dev

# Run tests
cd backend && yarn test
cd frontend && yarn test

# Build for production
cd backend && yarn build
cd frontend && yarn build
```
