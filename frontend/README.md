# Acme Dashboard - Terry - DevSamurai Intern Assignment Frontend

A modern React application built with TypeScript, featuring authentication, dashboard functionality, and a beautiful UI using ShadCN components.

## 🚀 Live Demo

**Deployed on Vercel:** [https://devsamurai-frontend.vercel.app](https://devsamurai-frontend.vercel.app)

## 🛠️ Tech Stack

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

## ✨ Features

### 🔐 Authentication
- **Sign Up/Sign In Flow** with form validation
- **JWT Token-based Authentication**
- **Protected Routes** with automatic redirects
- **User Profile Management**
- **Error Handling** with user-friendly messages

### 📊 Dashboard
- **Interactive Charts** for lead generation data
- **Contact Management** with most/least visited contacts
- **Date Range Filtering** with multiple time periods
- **Responsive Design** for all screen sizes
- **Dark/Light Theme** support

### 🎨 UI/UX
- **Modern Design** with ShadCN UI components
- **Smooth Animations** and transitions
- **Accessible Components** with proper ARIA labels
- **Mobile-First** responsive design
- **Loading States** and error boundaries

## 📁 Project Structure

```
frontend/
├── public/                          # Static assets
│   └── DevSamuraiLogo.png          # Company logo
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── __tests__/              # Component unit tests
│   │   ├── ui/                     # ShadCN UI components
│   │   │   ├── alert.tsx           # Alert/notification component
│   │   │   ├── button.tsx          # Button component with variants
│   │   │   ├── card.tsx            # Card container component
│   │   │   ├── dialog.tsx          # Modal dialog component
│   │   │   ├── form.tsx            # Form wrapper component
│   │   │   ├── input.tsx           # Input field component
│   │   │   ├── sidebar.tsx         # Sidebar layout component
│   │   │   └── ...                 # Other UI components
│   │   ├── AppHeader.tsx           # Main application header
│   │   ├── AuthForm.tsx            # Authentication form (sign in/up)
│   │   ├── ContactItem.tsx         # Individual contact display
│   │   ├── DateRangeBar.tsx        # Date range selector
│   │   ├── LeadGenerationChart.tsx # Chart component for leads
│   │   ├── LeastVisitedContacts.tsx # Least visited contacts list
│   │   ├── MostVisitedContacts.tsx # Most visited contacts list
│   │   ├── OrgMenu.tsx             # Organization menu dropdown
│   │   ├── Sidebar.tsx             # Main navigation sidebar
│   │   ├── ThemeProvider.tsx       # Theme context provider
│   │   ├── ThemeToggle.tsx         # Dark/light mode toggle
│   │   └── UserMenu.tsx            # User profile menu
│   ├── features/                   # Feature-based modules
│   │   └── auth/
│   │       └── authSlice.ts        # Authentication Redux slice
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-mobile.ts           # Mobile device detection hook
│   │   └── useChartData.ts         # Chart data fetching hook
│   ├── lib/                        # Utility libraries
│   │   ├── axios.ts                # HTTP client configuration
│   │   └── utils.ts                # General utility functions
│   ├── pages/                      # Page components
│   │   ├── Dashboard.tsx           # Main dashboard page
│   │   ├── SignIn.tsx              # Sign in page
│   │   └── SignUp.tsx              # Sign up page
│   ├── schemas/                    # Zod validation schemas
│   │   └── formSchemas.ts          # Form validation schemas
│   ├── services/                   # API service layers
│   │   └── authService.ts          # Authentication API service
│   ├── store/                      # Redux store configuration
│   │   ├── slices/                 # Redux slices
│   │   │   ├── dateRangeSlice.ts   # Date range state management
│   │   │   ├── favoritesSlice.ts   # Favorites state management
│   │   │   ├── organizationSlice.ts # Organization state management
│   │   │   └── themeSlice.ts       # Theme state management
│   │   └── store.ts                # Redux store configuration
│   ├── types/                      # TypeScript type definitions
│   │   └── api.ts                  # API response types
│   ├── App.tsx                     # Main application component
│   ├── App.css                     # Global application styles
│   ├── index.css                   # Global CSS imports
│   ├── main.tsx                    # Application entry point
│   └── vite-env.d.ts               # Vite environment types
├── .env                            # Environment variables (ignored)
├── .gitignore                      # Git ignore rules
├── components.json                 # ShadCN UI configuration
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # TypeScript app configuration
├── tsconfig.node.json              # TypeScript node configuration
├── vite.config.ts                  # Vite build configuration
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
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
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

### Tailwind CSS

The project uses Tailwind CSS with custom configuration for:
- Dark mode support
- Custom color palette
- Responsive breakpoints
- Component-specific utilities

### ShadCN UI

Components are configured with:
- Neutral base color
- CSS variables for theming
- Lucide React icons

## 🏗️ Architecture

### State Management

The application uses Redux Toolkit for global state management:

- **Auth Slice:** User authentication state
- **Theme Slice:** Dark/light mode preferences
- **Organization Slice:** Organization settings
- **Favorites Slice:** User favorites management
- **Date Range Slice:** Chart date filtering

### API Integration

- **Axios** for HTTP requests with interceptors
- **TanStack Query** for data fetching and caching
- **JWT tokens** for authentication
- **Automatic token refresh** and error handling

### Form Handling

- **React Hook Form** for form state management
- **Zod** for schema validation
- **Real-time validation** with error messages
- **Accessible form components**

## 🎨 Theming

The application supports both light and dark themes:

- **CSS Variables** for dynamic theming
- **System preference detection**
- **Manual theme toggle**
- **Persistent theme selection**

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoint-based** layouts
- **Touch-friendly** interactions
- **Optimized** for all screen sizes

## 🔒 Security

- **JWT token** authentication
- **Protected routes** with automatic redirects
- **Input validation** with Zod schemas
- **XSS protection** with proper sanitization
- **CSRF protection** via same-origin policy

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Build Configuration

The project is optimized for production with:
- **Tree shaking** for smaller bundle sizes
- **Code splitting** for better performance
- **Asset optimization** with Vite
- **TypeScript compilation** with strict mode

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for fast development experience
- [React](https://react.dev/) for the amazing framework
- [DevSamurai](https://devsamurai.vn/) for the internship opportunity