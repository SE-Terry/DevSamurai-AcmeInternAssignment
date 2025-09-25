# Acme Dashboard - Terry - DevSamurai Intern Assignment

A full-stack web application that replicates the Acme Dashboard interface, built as part of the DevSamurai internship assessment. This project demonstrates modern web development practices with a React frontend and NestJS backend.

## 🚀 Live Demo

- **Frontend (Vercel):** [https://dev-samurai-acme-intern-assignment.vercel.app/](https://dev-samurai-acme-intern-assignment.vercel.app/)
- **Backend API (Railway):** [https://devsamurai-acmeinternassignment-production.up.railway.app/](https://devsamurai-acmeinternassignment-production.up.railway.app/)
> **Demo Account**

You can try the dashboard instantly with the following demo credentials:

- **Email:** `devsamurai@devsamurai.com`
- **Password:** `password123`

_Use these credentials on the sign-in page to explore all features without registration._

## 📋 Project Overview

This project is a complete clone of the Acme Dashboard interface, featuring:

- **🔐 User Authentication** - Sign up, sign in, and JWT-based session management
- **📊 Interactive Dashboard** - Lead generation charts with date range filtering
- **👥 Contact Management** - Most/least visited contacts with team member integration
- **🎨 Modern UI/UX** - Responsive design with dark/light theme support
- **🛡️ Security** - Protected routes, input validation, and secure API endpoints

## 🛠️ Tech Stack

### Frontend
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI
- **State Management:** Redux Toolkit
- **Data Fetching:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **Form Handling:** React Hook Form + Zod validation
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Charts:** Recharts + ShadCN UI

### Backend
- **Framework:** NestJS with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Class Validator & Class Transformer
- **Security:** bcrypt for password hashing
- **Code Quality:** ESLint & Prettier

### Deployment
- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** Railway PostgreSQL

## 📁 Project Structure

```
DevSamurai-AcmeInternAssignment/
├── frontend/                        # React frontend application
│   ├── public/                      # Static assets
│   │   └── DevSamuraiLogo.png      # Company logo
│   ├── src/                        # Source code
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                # ShadCN UI components
│   │   │   ├── AuthForm.tsx       # Authentication form
│   │   │   ├── Dashboard.tsx      # Main dashboard page
│   │   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   │   └── ...                # Other components
│   │   ├── pages/                 # Page components
│   │   ├── services/              # API service layers
│   │   ├── store/                 # Redux store configuration
│   │   ├── hooks/                 # Custom React hooks
│   │   └── lib/                   # Utility libraries
│   ├── package.json               # Frontend dependencies
│   └── README.md                  # Frontend documentation
├── backend/                        # NestJS backend API
│   ├── src/                       # Source code
│   │   ├── auth/                  # Authentication module
│   │   ├── chart/                 # Chart data module
│   │   ├── common/                # Shared utilities
│   │   └── prisma/                # Database integration
│   ├── prisma/                    # Database schema and migrations
│   ├── package.json               # Backend dependencies
│   └── README.md                  # Backend documentation
├── LICENSE                         # Apache 2.0 License
└── README.md                       # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd DevSamurai-AcmeInternAssignment
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and JWT secret

# Set up the database
npx prisma generate
npx prisma db push
npm run prisma:seed

# Start the development server
npm run start:dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your backend API URL

# Start the development server
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

## 🔧 Environment Configuration

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@host:port/database_name"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## ✨ Key Features

### 🔐 Authentication System
- **User Registration** with email validation
- **Secure Login** with JWT tokens
- **Protected Routes** with automatic redirects
- **User Profile Management**
- **Session Persistence**

### 📊 Dashboard Analytics
- **Interactive Charts** for lead generation data
- **Date Range Filtering** with multiple time periods
- **Real-time Data Updates**
- **Responsive Chart Design**

### 👥 Contact Management
- **Most Visited Contacts** with visit tracking
- **Least Visited Contacts** for follow-up
- **Team Member Integration** with DevSamurai branding
- **Contact Interaction** with hover effects

### 🎨 User Experience
- **Dark/Light Theme** support
- **Responsive Design** for all devices
- **Smooth Animations** and transitions
- **Loading States** and error handling
- **Accessible Components** with proper ARIA labels

## 🏗️ Architecture

### Frontend Architecture
- **Component-Based** React architecture
- **State Management** with Redux Toolkit
- **API Integration** with TanStack Query
- **Form Handling** with React Hook Form + Zod
- **Type Safety** with TypeScript

### Backend Architecture
- **Modular Design** with NestJS modules
- **Database Integration** with Prisma ORM
- **JWT Authentication** with Passport
- **RESTful API** design
- **Error Handling** with global filters

### Security Features
- **JWT Token Authentication**
- **Password Hashing** with bcrypt
- **Input Validation** with DTOs
- **CORS Configuration**
- **Protected API Endpoints**

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `VITE_API_URL` = Your Railway backend URL
3. Deploy automatically on push to main

### Backend (Railway)
1. Connect GitHub repository to Railway
2. Set environment variables:
   - `DATABASE_URL` = PostgreSQL connection string
   - `JWT_SECRET` = Secure JWT secret
3. Configure build command: `npm run build`
4. Deploy automatically on push to main

## 📊 API Documentation

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `GET /auth/me` - Get current user profile

### Chart Data Endpoints
- `GET /chart/data` - Get chart data with date filtering

## 🔒 Security Considerations

- **Environment Variables** - All secrets stored securely
- **JWT Tokens** - Secure token-based authentication
- **Input Validation** - All inputs validated and sanitized
- **CORS Configuration** - Properly configured for production
- **Error Handling** - Sensitive information not exposed

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DevSamurai](https://devsamurai.vn/) for the internship opportunity
- [NestJS](https://nestjs.com/) for the amazing backend framework
- [React](https://react.dev/) for the frontend framework
- [ShadCN UI](https://ui.shadcn.com/) for beautiful components
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Vercel](https://vercel.com/) and [Railway](https://railway.app/) for seamless deployment

## 📞 Contact

- **Developer:** Terry
- **Project:** Acme Dashboard - DevSamurai Intern Assignment
- **Repository:** DevSamurai-AcmeInternAssignment

---

**Note:** This project was created as part of the DevSamurai internship assessment to demonstrate full-stack development capabilities with modern web technologies.