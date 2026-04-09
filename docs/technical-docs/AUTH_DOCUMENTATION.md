# Authentication System Documentation

## Overview
The e-commerce application now includes a complete authentication system with user registration, login, and session management using SQLite database.

## Features Implemented

### 1. User Registration (`/register`)
- **Form validation**: Email format, password strength (min 8 chars, must include uppercase, lowercase, and numbers)
- **Password confirmation**: Ensures passwords match
- **Terms and conditions**: Users must agree before registration
- **Duplicate email check**: Prevents multiple accounts with the same email
- **Password hashing**: Uses bcryptjs for secure password storage
- **JWT token generation**: Returns a token upon successful registration
- **Auto-login**: Users are automatically logged in after successful registration

### 2. User Login (`/login`)
- **Email/password authentication**
- **Remember me option** (UI only, not yet implemented in backend)
- **Secure password verification**: Uses bcrypt to compare hashed passwords
- **JWT token**: Returns authentication token on successful login
- **Error handling**: Clear error messages for invalid credentials

### 3. Database (SQLite)
- **Location**: `data/users.db` (gitignored)
- **Schema**:
  ```sql
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  ```
- **Indexes**: Email field is indexed for faster lookups

### 4. API Endpoints

#### POST `/api/auth/register`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2026-04-08T...",
    "updated_at": "2026-04-08T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

#### POST `/api/auth/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### 5. Authentication Context (`AuthContext`)
- **Global state management** for user authentication
- **Persistent sessions**: Stores auth token and user data in localStorage
- **Auto-login**: Restores session on page reload
- **Logout functionality**: Clears local storage and state

**Usage:**
```tsx
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (isAuthenticated) {
    return <div>Welcome {user?.name}</div>;
  }
  
  return <div>Please log in</div>;
}
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds of 10
2. **JWT Tokens**: Secure token-based authentication with 7-day expiration
3. **SQL Injection Prevention**: Uses prepared statements with parameter binding
4. **Unique Email Constraint**: Database-level constraint prevents duplicate accounts
5. **HTTPS Recommended**: Should always be used in production

## Environment Variables

Create a `.env.local` file with:
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**⚠️ Important**: Change the JWT_SECRET in production!

## Dependencies

- `better-sqlite3` - SQLite database driver
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation and verification

## Testing the Authentication

1. **Register a new user**:
   - Navigate to `/register`
   - Fill in the form with valid data
   - Submit - you'll be redirected to home page with a welcome message

2. **Login**:
   - Navigate to `/login`
   - Enter your email and password
   - Submit - you'll be redirected to home page

3. **Check authentication**:
   - Open browser console
   - Check localStorage: `localStorage.getItem('authToken')`
   - Check user data: `localStorage.getItem('user')`

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)
- [ ] Remember me functionality (refresh tokens)
- [ ] User profile page
- [ ] Admin dashboard
- [ ] Protected routes middleware
- [ ] Session timeout handling
- [ ] Password change functionality

## Troubleshooting

### Database file not being created
- Ensure the `data/` directory has write permissions
- Check the console for any error messages

### JWT token errors
- Verify JWT_SECRET is set in environment variables
- Check token expiration (default: 7 days)

### Login/Register not working
- Check browser console for network errors
- Verify API endpoints are accessible (`/api/auth/login`, `/api/auth/register`)
- Check database file exists and is accessible
