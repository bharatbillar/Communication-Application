# Communication Application

A web-based communication and document management application built with HTML, CSS, and JavaScript. This application provides user authentication, real-time chat functionality, user management, and document sharing capabilities.

## Features

### 🔐 User Authentication
- User registration with email validation
- Secure login system
- Session management with localStorage
- Logout functionality

### 💬 Chat System
- Real-time messaging interface
- Message history storage
- Timestamp display (HH:MM format)
- User identification in messages
- Auto-scroll to latest messages

### 👥 User Management
- View all registered users
- Edit user profiles
- Delete user accounts
- User data persistence

### 📁 Document Management
- File upload functionality
- Document listing and management
- Edit and delete documents
- File size tracking
- Upload date tracking

### 🎨 User Interface
- Responsive design
- Clean and modern interface
- Modal dialogs for actions
- Tabbed navigation
- Consistent styling across pages

## File Structure

```
project/
├── index.html              # Welcome/landing page
├── login.html              # User login page
├── register.html           # User registration page
├── register_success.html   # Registration confirmation page
├── dashboard.html          # Main application dashboard
├── style.css              # Consolidated stylesheet
├── scripts.js             # Application logic and functionality
└── README.md              # Project documentation
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling, layouts, and responsive design
- **JavaScript (ES6)**: Application logic and DOM manipulation
- **localStorage API**: Client-side data persistence
- **File API**: File upload handling

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start using the application!

### Usage

#### Registration
1. Navigate to the registration page from the welcome screen
2. Fill in your full name, email, and password
3. Email validation ensures proper format
4. Confirm your password
5. Click "Register" to create your account

#### Login
1. Use your registered email and password
2. Click "Login" to access the dashboard

#### Dashboard Navigation
- **Chat**: Send and receive messages
- **Users**: Manage user accounts (view, edit, delete)
- **Documents**: 
  - **My Uploads**: View and manage your uploaded files
  - **Shared with Me**: View documents shared by others

#### Chat Features
- Type messages in the input field
- Press Enter or click Send to send messages
- Messages display with username and timestamp
- Chat history is preserved across sessions

#### Document Management
- Click "Upload Document" to add files
- View uploaded documents in the table
- Edit or delete documents as needed

## Data Storage

The application uses browser localStorage to persist:
- User accounts and profiles
- Chat message history
- Uploaded document metadata
- Session information

**Note**: Data is stored locally in your browser and will be lost if browser data is cleared.


## Features in Detail

### Email Validation
- Real-time email format validation
- Inline error messages
- Prevents registration with invalid emails

### Security Features
- Password confirmation during registration
- Email uniqueness validation
- Session-based authentication

### User Experience
- Smooth navigation between sections
- Modal confirmations for destructive actions
- Auto-clearing form inputs after submission
- Responsive layout for different screen sizes

## Development

### Code Organization
- **scripts.js**: Organized by functionality (register, login, dashboard, utilities)
- **style.css**: Consolidated styling with component-based approach
- **HTML files**: Clean structure with external CSS and JavaScript

### Key Functions
- `handleRegister()`: User registration logic
- `handleLogin()`: Authentication handling
- `displayMessages()`: Chat message rendering
- `loadUsers()`: User management interface
- `loadDocuments()`: Document listing and management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## Support

For questions or issues, please create an issue in the repository or contact the development team.

---
