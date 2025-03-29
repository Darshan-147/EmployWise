# EmployWise - Employee Management System

A web application for managing employee information with secure authentication and user management capabilities.

## Features

- User Authentication
- Employee Data Management
- Protected Routes
- Responsive Design

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Tech Stack

- React.js
- React Router Dom
- Other dependencies as listed in package.json

## Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd EmployWise
```

2. Install dependencies:
```bash
npm install
```


## Dependencies

The project requires the following main dependencies:
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x"
}
```

To install all dependencies, run:
```bash
npm install react react-dom react-router-dom
```

## Running the Application

1. Development mode:
```bash
npm start
```
This will start the development server at `http://localhost:3000`

2. Production build:
```bash
npm run build
```

## Project Structure

```
EmployWise/
├── src/
│   ├── components/
│   │   ├── AuthScreen.jsx
│   │   └── UsersTable.jsx
│   ├── App.jsx
│   └── index.js
├── public/
└── package.json
```

## Authentication

- The application uses token-based authentication
- Protected routes require valid authentication
- Login credentials are required to access the user management features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
