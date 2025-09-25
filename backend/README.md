# Acme Dashboard - Terry - DevSamurai Intern Assignment Backend

A robust NestJS backend API for the Acme Dashboard application, featuring authentication, data management, and chart analytics with PostgreSQL database integration.

## 🚀 Live Demo

**Deployed on Railway:** [https://devsamurai-acmeinternassignment-production.up.railway.app](https://devsamurai-acmeinternassignment-production.up.railway.app)

## 🛠️ Tech Stack

- **Framework:** NestJS with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Class Validator & Class Transformer
- **Security:** bcrypt for password hashing
- **Code Quality:** ESLint & Prettier

## ✨ Features

### 🔐 Authentication System
- **User Registration** with email validation
- **Secure Login** with JWT tokens
- **Password Hashing** using bcrypt
- **Protected Routes** with JWT guards
- **User Profile Management**

### 📊 Chart Data API
- **Lead Generation Analytics** with date range filtering
- **RESTful API** for chart data
- **Data Validation** with DTOs
- **Protected Endpoints** requiring authentication

### 🛡️ Security & Error Handling
- **Global Exception Filter** for consistent error responses
- **Request Logging** with custom interceptors
- **CORS Configuration** for frontend integration
- **Input Validation** with decorators

## 📁 Project Structure

```
backend/
├── prisma/                          # Database schema and migrations
│   ├── schema.prisma                # Prisma database schema definition
│   ├── seed.cjs                     # Database seeding script
│   └── dummy_data.json              # Sample data for seeding
├── src/
│   ├── auth/                        # Authentication module
│   │   ├── dto/                     # Data Transfer Objects
│   │   │   ├── signin.dto.ts        # Sign-in request validation
│   │   │   └── signup.dto.ts        # Sign-up request validation
│   │   ├── auth.controller.ts       # Authentication endpoints
│   │   ├── auth.module.ts           # Authentication module configuration
│   │   ├── auth.service.ts          # Authentication business logic
│   │   ├── auth.service.spec.ts     # Authentication service tests
│   │   ├── auth.controller.spec.ts  # Authentication controller tests
│   │   ├── jwt-auth.guard.ts        # JWT authentication guard
│   │   └── jwt.strategy.ts          # JWT passport strategy
│   ├── chart/                       # Chart data module
│   │   ├── dto/                     # Data Transfer Objects
│   │   │   └── chart-query.dto.ts   # Chart query validation
│   │   ├── interfaces/              # TypeScript interfaces
│   │   │   └── chart-response.interface.ts # Chart response types
│   │   ├── chart.controller.ts      # Chart data endpoints
│   │   ├── chart.module.ts          # Chart module configuration
│   │   └── chart.service.ts         # Chart data business logic
│   ├── common/                      # Shared utilities and configurations
│   │   ├── exceptions/              # Custom exception classes
│   │   │   └── auth.exceptions.ts   # Authentication-specific exceptions
│   │   ├── filters/                 # Global exception filters
│   │   │   └── global-exception.filter.ts # Global error handling
│   │   ├── interceptors/            # Request/response interceptors
│   │   │   └── logging.interceptor.ts # Request logging interceptor
│   │   └── middleware/              # Custom middleware
│   ├── prisma/                      # Database integration
│   │   ├── prisma.module.ts         # Prisma module configuration
│   │   ├── prisma.service.ts        # Prisma database service
│   │   └── prisma.service.spec.ts   # Prisma service tests
│   ├── app.controller.ts            # Main application controller
│   ├── app.controller.spec.ts       # Main controller tests
│   ├── app.module.ts                # Root application module
│   ├── app.service.ts               # Main application service
│   └── main.ts                      # Application entry point
├── generated/                       # Generated Prisma client
│   └── prisma/                      # Prisma client files
├── dist/                            # Compiled JavaScript output
├── .env                             # Environment variables (ignored)
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── .prettierrc                      # Prettier configuration
├── eslint.config.mjs                # ESLint configuration
├── nest-cli.json                    # NestJS CLI configuration
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Dependency lock file
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.build.json              # TypeScript build configuration
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
```bash
   cp .env.example .env
   ```
   
   Configure the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database_name"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```

4. **Set up the database**
```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Seed the database (optional)
   npm run prisma:seed
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT tokens | Required |

### Database Schema

The application uses the following main entities:

- **User**: User authentication and profile data
- **Chart Data**: Analytics data for lead generation charts

## 🏗️ Architecture

### Module Structure

- **AppModule**: Root module that imports all feature modules
- **AuthModule**: Handles user authentication and JWT management
- **ChartModule**: Provides chart data and analytics
- **PrismaModule**: Database connection and ORM configuration

### Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: DTOs with class-validator decorators
- **CORS Configuration**: Configured for frontend integration
- **Global Exception Handling**: Consistent error responses

### API Endpoints

#### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `GET /auth/me` - Get current user profile

#### Chart Data
- `GET /chart/data` - Get chart data with date filtering

## 🚀 Deployment

### Railway Deployment

1. **Connect your repository** to Railway
2. **Set environment variables** in Railway dashboard
3. **Configure build command**: `npm run build`
4. **Configure start command**: `npm run start:prod`
5. **Deploy** automatically on push to main branch

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
```

### Build Process

The build process includes:
1. **Prisma Client Generation** - Generates database client
2. **TypeScript Compilation** - Compiles to JavaScript
3. **Dependency Installation** - Installs production dependencies

## 🔒 Security Considerations

- **JWT Secret**: Use a strong, unique secret in production
- **Database Security**: Use connection pooling and SSL
- **CORS**: Configure appropriate origins for production
- **Input Validation**: All inputs are validated and sanitized
- **Error Handling**: Sensitive information is not exposed in errors

## 📊 Database Management

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Seed database with sample data
npm run prisma:seed
```

### Schema Changes

When modifying the Prisma schema:
1. Update `prisma/schema.prisma`
2. Run `npx prisma db push` to apply changes
3. Run `npx prisma generate` to update the client


This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Railway](https://railway.app/) for seamless deployment
- [DevSamurai](https://devsamurai.vn/) for the internship opportunity