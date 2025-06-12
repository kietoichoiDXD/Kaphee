# KAPHEE - Café Management System

## Project Overview
KAPHEE is a comprehensive café management system that handles customer bookings, menu management, and administrative functions. The system is built with a modern web stack, featuring separate frontend and backend components.

## Project Structure

### Root Directory Files

#### HTML Files
- `index.html` (7.3KB)
  - Main landing page of the application
  - Serves as the entry point for users
  - Contains navigation to all main features

- `login.html` (4.5KB)
  - User authentication page
  - Handles customer login functionality
  - Redirects to dashboard upon successful login

- `register.html` (5.4KB)
  - New user registration page
  - Collects customer information
  - Creates new customer accounts

- `menu.html` (3.9KB)
  - Displays café menu items
  - Shows prices, descriptions, and images
  - Allows customers to browse available items

- `booking.html` (7.5KB)
  - Table reservation system
  - Allows customers to book tables
  - Handles date and time selection

- `admin.html` (16KB)
  - Main admin interface
  - Provides access to all administrative functions
  - Restricted to admin users only

- `dashboard.html` (7.3KB)
  - Customer dashboard
  - Shows booking history
  - Displays loyalty points and account information

- `admin-dashboard.html` (16KB)
  - Administrative dashboard
  - Shows system statistics
  - Manages bookings, menu, and users

- `admin-login.html` (2.9KB)
  - Admin authentication page
  - Secure login for administrative users
  - Separate from customer login

### Data Files (JSON)

- `admins.json`
  - Stores admin user data
  - Contains authentication information
  - Manages admin roles and permissions

- `customers.json`
  - Stores customer information
  - Contains personal details and preferences
  - Tracks loyalty points and visit history

- `bookings.json`
  - Manages table reservations
  - Stores booking details and status
  - Links customers to their reservations

- `menu.json`
  - Contains menu item information
  - Includes prices, descriptions, and ingredients
  - Manages item availability

### Backend Structure (`/backend`)

#### Main Files
- `index.js` (1.9KB)
  - Main server file
  - Sets up Express server
  - Configures middleware and routes

#### Directories
- `/routes`
  - Contains API route handlers
  - Manages HTTP endpoints
  - Handles request processing

- `/models`
  - Defines data models
  - Contains database schemas
  - Manages data validation

- `/middleware`
  - Custom middleware functions
  - Authentication checks
  - Request processing

- `/config`
  - Configuration files
  - Environment variables
  - Database settings

- `/utils`
  - Utility functions
  - Helper methods
  - Common operations

### Frontend Structure (`/frontend`)

#### Files
- `admin-dashboard.html` (11KB)
  - Admin control panel interface
  - Real-time statistics
  - Management tools

- `menu.html` (1.2KB)
  - Menu display interface
  - Item categorization
  - Search and filter functionality

### JavaScript Files (`/js`)

- `main.js` (8.5KB)
  - Core application logic
  - Event handlers
  - UI interactions

- `auth.js` (5.5KB)
  - Authentication handling
  - Login/Register functionality
  - Session management

- `menu.js` (5.3KB)
  - Menu display logic
  - Item filtering
  - Search functionality

- `booking.js` (1.0B)
  - Booking system logic
  - Date/time handling
  - Reservation management

- `dashboard.js` (7.3KB)
  - User dashboard functionality
  - Data display
  - User preferences

- `admin.js` (15KB)
  - Admin panel functionality
  - User management
  - System configuration

- `admin-dashboard.js` (16KB)
  - Admin dashboard logic
  - Statistics and reporting
  - System monitoring

- `login.js` (2.2KB)
  - Login form handling
  - Authentication requests
  - Error handling

### Additional Directories

- `/css`
  - Contains stylesheets
  - Manages application styling
  - Responsive design files

- `/assets`
  - Static resources
  - Images and icons
  - Media files

- `/scripts`
  - Additional JavaScript files
  - Utility scripts
  - Third-party integrations

- `/data`
  - Data storage
  - Backup files
  - Temporary data

## Technical Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Responsive Design

### Backend
- Node.js
- Express.js
- JSON Data Storage

### Development Tools
- VS Code Configuration
- Git Version Control
- Node Package Manager (npm)

## Features

### Customer Features
- User registration and login
- Menu browsing
- Table reservations
- Loyalty points tracking
- Personal dashboard

### Admin Features
- User management
- Menu management
- Booking oversight
- System statistics
- Administrative controls

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
4. Access the application through the browser

## Security
- Admin authentication
- User session management
- Secure data storage
- Input validation

## Maintenance
- Regular data backups
- System updates
- Performance monitoring
- Security patches

## Future Enhancements
- Online ordering system
- Payment integration
- Mobile application
- Advanced analytics
- Customer feedback system

## Detailed Technical Documentation

### System Architecture

#### Frontend-Backend Communication
1. **API Endpoints**
   - All frontend-backend communication happens through RESTful API endpoints
   - Base URL: `http://localhost:3000/api`
   - Authentication: JWT tokens in request headers

2. **Data Flow**
   ```
   Frontend (HTML/JS) → API Requests → Backend (Node.js/Express) → JSON Files
   ```

### Running the Application

#### Prerequisites
1. Node.js (v14 or higher)
2. npm (v6 or higher)
3. Modern web browser
4. Code editor (VS Code recommended)

#### Step-by-Step Setup

1. **Initial Setup**
   ```bash
   # Clone the repository
   git clone [repository-url]
   cd kaphee

   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install bcryptjs jsonwebtoken express-rate-limit cors dotenv mongoose
   cd ..

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

2. **Environment Configuration**
   - Create `.env` file in backend directory:
     ```
     PORT=5000
     NODE_ENV=development
     FRONTEND_URL=http://localhost:3000
     MONGO_URI=mongodb://localhost:27017/Vintage_Coffee
     JWT_SECRET=your_jwt_secret_key_here
     REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
     JWT_EXPIRES_IN=1h
     REFRESH_TOKEN_EXPIRES_IN=7d
     ```

3. **Starting the Application**
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # In a new terminal, serve frontend
   cd frontend
   npm start
   ```

4. **Accessing the Application**
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:3000`

### Core Components Interaction

#### 1. Authentication Flow
```
login.html → auth.js → backend/routes/auth.js → admins.json/customers.json
```
- `auth.js` handles form submission
- Backend validates credentials
- JWT token generated for authenticated users
- Session maintained in localStorage

#### 2. Booking System Flow
```
booking.html → booking.js → backend/routes/bookings.js → bookings.json
```
- Date/time selection in frontend
- Validation in `booking.js`
- Backend checks availability
- Updates `bookings.json`

#### 3. Menu Management Flow
```
menu.html → menu.js → backend/routes/menu.js → menu.json
```
- Menu items loaded from `menu.json`
- Frontend filtering in `menu.js`
- Admin updates through `admin-dashboard.js`

### File System Details

#### Backend Structure (`/backend`)
```
backend/
├── index.js              # Server entry point
├── routes/               # API endpoints
│   ├── auth.js          # Authentication routes
│   ├── bookings.js      # Booking management
│   ├── menu.js          # Menu operations
│   └── users.js         # User management
├── models/              # Data models
│   ├── Booking.js       # Booking schema
│   ├── MenuItem.js      # Menu item schema
│   └── User.js          # User schema
├── middleware/          # Custom middleware
│   ├── auth.js          # Authentication checks
│   └── validation.js    # Input validation
├── config/             # Configuration
│   └── database.js      # Database settings
└── utils/              # Utility functions
    ├── logger.js        # Logging utility
    └── helpers.js       # Helper functions
```

#### Frontend Structure (`/frontend`)
```
frontend/
├── js/                 # JavaScript files
│   ├── auth.js         # Authentication logic
│   ├── booking.js      # Booking system
│   ├── menu.js         # Menu display
│   └── admin.js        # Admin panel
├── css/               # Stylesheets
│   ├── main.css       # Main styles
│   └── admin.css      # Admin styles
└── assets/           # Static resources
    ├── images/       # Image files
    └── icons/        # Icon files
```

### Data Management

#### JSON Files Structure
1. **admins.json**
   ```json
   {
     "admins": [
       {
         "id": "ADM001",
         "username": "admin1",
         "password": "hashed_password",
         "role": "super_admin"
       }
     ]
   }
   ```

2. **customers.json**
   ```json
   {
     "customers": [
       {
         "id": "CUST001",
         "fullName": "John Doe",
         "email": "john@example.com",
         "loyaltyPoints": 100
       }
     ]
   }
   ```

3. **bookings.json**
   ```json
   {
     "bookings": [
       {
         "id": "BK001",
         "customerId": "CUST001",
         "date": "2024-03-20",
         "time": "19:00",
         "status": "confirmed"
       }
     ]
   }
   ```

4. **menu.json**
   ```json
   {
     "menuItems": [
       {
         "id": "M001",
         "name": "Cappuccino",
         "price": 4.50,
         "category": "Hot Coffee"
       }
     ]
   }
   ```

### Development Workflow

1. **Making Changes**
   - Frontend changes: Edit files in `/frontend` or `/js`
   - Backend changes: Modify files in `/backend`
   - Data changes: Update JSON files directly

2. **Testing Changes**
   ```bash
   # Run backend tests
   cd backend
   npm test

   # Run frontend tests
   cd frontend
   npm test
   ```

3. **Debugging**
   - Backend: Use `console.log()` or debugger
   - Frontend: Browser developer tools
   - API: Postman or similar tool

### Security Considerations

1. **Authentication**
   - JWT tokens for session management
   - Password hashing using bcrypt
   - Role-based access control

2. **Data Protection**
   - Input validation on both ends
   - XSS protection
   - CSRF tokens

3. **File Security**
   - Regular backups of JSON files
   - Access control for admin functions
   - Secure file uploads

### Performance Optimization

1. **Frontend**
   - Minified JavaScript and CSS
   - Image optimization
   - Lazy loading

2. **Backend**
   - Caching frequently accessed data
   - Efficient JSON file operations
   - Request rate limiting

### Troubleshooting

1. **Common Issues**
   - Port conflicts: Change PORT in .env
   - CORS errors: Check backend CORS settings
   - File permissions: Ensure read/write access

2. **Debugging Steps**
   - Check browser console
   - Review server logs
   - Verify JSON file integrity

## Important Files and Token Management

### Critical Files by Directory

#### Root Directory
1. **package.json**
   - Location: `/package.json`
   - Purpose: Main project configuration
   - Contains: Dependencies, scripts, project metadata
   - Key fields:
     ```json
     {
       "name": "kaphee",
       "version": "1.0.0",
       "scripts": {
         "start": "node backend/index.js",
         "dev": "nodemon backend/index.js"
       }
     }
     ```

2. **.env**
   - Location: `/.env`
   - Purpose: Environment variables
   - Contains: API keys, secrets, configuration
   - Required variables:
     ```
     PORT=5000
     NODE_ENV=development
     FRONTEND_URL=http://localhost:3000
     MONGO_URI=mongodb://localhost:27017/Vintage_Coffee
     JWT_SECRET=your_jwt_secret_key_here
     REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
     JWT_EXPIRES_IN=1h
     REFRESH_TOKEN_EXPIRES_IN=7d
     ```

#### Backend Directory (`/backend`)
1. **index.js**
   - Location: `/backend/index.js`
   - Purpose: Server entry point
   - Key functions:
     - Server initialization
     - Middleware setup
     - Route registration
     - Error handling

2. **routes/auth.js**
   - Location: `/backend/routes/auth.js`
   - Purpose: Authentication endpoints
   - Key endpoints:
     ```javascript
     POST /api/auth/login
     POST /api/auth/register
     POST /api/auth/refresh-token
     ```

3. **middleware/auth.js**
   - Location: `/backend/middleware/auth.js`
   - Purpose: Token verification
   - Key functions:
     - JWT validation
     - Role checking
     - Request authentication

#### Frontend Directory (`/frontend`)
1. **js/auth.js**
   - Location: `/frontend/js/auth.js`
   - Purpose: Authentication handling
   - Key functions:
     - Token storage
     - Login/Logout
     - Session management

2. **js/admin.js**
   - Location: `/frontend/js/admin.js`
   - Purpose: Admin functionality
   - Key features:
     - User management
     - System configuration
     - Access control

### Token Management

#### 1. JWT Token Structure
```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "USER_ID",
    "role": "admin|customer",
    "iat": 1516239022,
    "exp": 1516242622
  },
  "signature": "HMACSHA256(...)"
}
```

#### 2. Obtaining Tokens

##### Admin Token
1. **Login Process**
   ```javascript
   // POST /api/auth/admin/login
   {
     "username": "admin1",
     "password": "your_password"
   }
   ```
   - Response:
   ```javascript
   {
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
     "role": "admin"
   }
   ```

##### Customer Token
1. **Login Process**
   ```javascript
   // POST /api/auth/customer/login
   {
     "email": "customer@example.com",
     "password": "your_password"
   }
   ```
   - Response:
   ```javascript
   {
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
     "role": "customer"
   }
   ```

#### 3. Token Storage

##### Frontend Storage
```javascript
// Storing tokens
localStorage.setItem('accessToken', token);
localStorage.setItem('refreshToken', refreshToken);

// Retrieving tokens
const token = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
```

##### Backend Storage
```javascript
// Token verification
const token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

#### 4. Token Usage

##### API Requests
```javascript
// Adding token to requests
fetch('/api/protected-route', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

##### Token Refresh
```javascript
// POST /api/auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Security Best Practices

1. **Token Storage**
   - Store tokens in localStorage for web applications
   - Use secure, HTTP-only cookies for sensitive applications
   - Never store tokens in URL parameters

2. **Token Validation**
   - Verify token signature
   - Check token expiration
   - Validate token claims

3. **Token Refresh**
   - Implement automatic token refresh
   - Use refresh tokens for long-term sessions
   - Rotate refresh tokens

4. **Error Handling**
   ```javascript
   try {
     const token = localStorage.getItem('accessToken');
     if (!token) {
       window.location.href = '/login.html';
     }
   } catch (error) {
     console.error('Token error:', error);
     // Handle token errors
   }
   ```

### File Access Control

1. **Admin Files**
   - `/backend/routes/admin.js`
   - `/frontend/js/admin.js`
   - `/admin-dashboard.html`
   - Access: Requires admin token

2. **Customer Files**
   - `/backend/routes/customer.js`
   - `/frontend/js/customer.js`
   - `/dashboard.html`
   - Access: Requires customer token

3. **Public Files**
   - `/index.html`
   - `/menu.html`
   - `/login.html`
   - Access: No token required

### Token Implementation Example

```javascript
// Backend token generation
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Frontend token usage
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('No token available');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    // Token expired, attempt refresh
    await refreshToken();
    return makeAuthenticatedRequest(url, options);
  }

  return response;
};
```

## Detailed Folder and File Structure

### Root Directory (`/`)
```
/
├── index.html              # Main landing page
├── login.html             # Customer login page
├── register.html          # Customer registration
├── menu.html             # Menu display
├── booking.html          # Table reservation
├── admin.html            # Admin interface
├── dashboard.html        # Customer dashboard
├── admin-dashboard.html  # Admin control panel
├── admin-login.html      # Admin authentication
├── package.json          # Project configuration
├── package-lock.json     # Dependency lock file
├── admins.json           # Admin user data
├── customers.json        # Customer information
├── bookings.json         # Reservation data
└── menu.json            # Menu items data
```

### Backend Directory (`/backend`)
```
/backend
├── index.js              # Server entry point
├── package.json          # Backend dependencies
├── package-lock.json     # Backend dependency lock
│
├── routes/               # API endpoints
│   ├── auth.js          # Authentication routes
│   ├── bookings.js      # Booking management
│   ├── menu.js          # Menu operations
│   └── users.js         # User management
│
├── models/              # Data models
│   ├── Booking.js       # Booking schema
│   ├── MenuItem.js      # Menu item schema
│   └── User.js          # User schema
│
├── middleware/          # Custom middleware
│   ├── auth.js          # Authentication checks
│   └── validation.js    # Input validation
│
├── config/             # Configuration
│   └── database.js      # Database settings
│
└── utils/              # Utility functions
    ├── logger.js        # Logging utility
    └── helpers.js       # Helper functions
```

### Frontend Directory (`/frontend`)
```
/frontend
├── admin-dashboard.html  # Admin panel interface
├── menu.html            # Menu display
├── package.json         # Frontend dependencies
│
├── js/                 # JavaScript files
│   ├── auth.js         # Authentication logic
│   ├── booking.js      # Booking system
│   ├── menu.js         # Menu display
│   └── admin.js        # Admin panel
│
├── css/               # Stylesheets
│   ├── main.css       # Main styles
│   └── admin.css      # Admin styles
│
└── assets/           # Static resources
    ├── images/       # Image files
    └── icons/        # Icon files
```

### JavaScript Directory (`/js`)
```
/js
├── main.js            # Core application logic
├── auth.js            # Authentication handling
├── menu.js            # Menu functionality
├── booking.js         # Booking system
├── dashboard.js       # User dashboard
├── admin.js           # Admin functionality
├── admin-dashboard.js # Admin panel
└── login.js           # Login handling
```

### CSS Directory (`/css`)
```
/css
├── main.css           # Main stylesheet
├── admin.css          # Admin panel styles
├── menu.css           # Menu page styles
└── booking.css        # Booking page styles
```

### Assets Directory (`/assets`)
```
/assets
├── images/            # Image files
│   ├── logo.png       # Application logo
│   ├── menu/          # Menu item images
│   └── backgrounds/   # Background images
│
└── icons/            # Icon files
    ├── menu/         # Menu icons
    └── ui/           # UI icons
```

### Data Directory (`/data`)
```
/data
├── backups/          # Data backups
├── temp/            # Temporary files
└── logs/            # System logs
```

### File Functions and Dependencies

#### Root Directory Files
1. **HTML Files**
   - `index.html`: Entry point, navigation, main features
   - `login.html`: Customer authentication
   - `register.html`: New customer registration
   - `menu.html`: Menu display and ordering
   - `booking.html`: Table reservation system
   - `admin.html`: Administrative interface
   - `dashboard.html`: Customer dashboard
   - `admin-dashboard.html`: Admin control panel
   - `admin-login.html`: Admin authentication

2. **JSON Files**
   - `admins.json`: Admin user management
   - `customers.json`: Customer data storage
   - `bookings.json`: Reservation management
   - `menu.json`: Menu item management

#### Backend Files
1. **Server Files**
   - `index.js`: Server setup, middleware, routes
   - `package.json`: Backend dependencies

2. **Route Files**
   - `auth.js`: Authentication endpoints
   - `bookings.js`: Booking management
   - `menu.js`: Menu operations
   - `users.js`: User management

3. **Model Files**
   - `Booking.js`: Booking data structure
   - `MenuItem.js`: Menu item structure
   - `User.js`: User data structure

#### Frontend Files
1. **JavaScript Files**
   - `auth.js`: Authentication logic
   - `booking.js`: Booking system
   - `menu.js`: Menu display
   - `admin.js`: Admin panel

2. **CSS Files**
   - `main.css`: Global styles
   - `admin.css`: Admin panel styles
   - `menu.css`: Menu page styles
   - `booking.css`: Booking page styles

### File Dependencies

#### Frontend Dependencies
```javascript
// auth.js dependencies
import { validateForm } from './utils/validation.js';
import { api } from './utils/api.js';

// menu.js dependencies
import { displayMenu } from './utils/display.js';
import { filterItems } from './utils/filter.js';

// booking.js dependencies
import { datePicker } from './utils/date.js';
import { timeSlots } from './utils/time.js';
```

#### Backend Dependencies
```javascript
// index.js dependencies
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// auth.js dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// bookings.js dependencies
const { validateBooking } = require('../utils/validation');
const { sendEmail } = require('../utils/email');
```

### File Execution Flow

1. **Application Start**
   ```
   index.html → main.js → backend/index.js
   ```

2. **Authentication Flow**
   ```
   login.html → auth.js → backend/routes/auth.js → JWT token
   ```

3. **Booking Flow**
   ```
   booking.html → booking.js → backend/routes/bookings.js → bookings.json
   ```

4. **Menu Flow**
   ```
   menu.html → menu.js → backend/routes/menu.js → menu.json
   ```

5. **Admin Flow**
   ```
   admin-login.html → auth.js → admin-dashboard.html → admin.js
   ``` 