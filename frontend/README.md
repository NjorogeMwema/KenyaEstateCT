
# Frontend Documentation

## Overview

This documentation provides an overview of the frontend structure for the RealEstate project. It includes details about the project setup, folder structure, and key components.

## Folder Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── UserForm.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   └── RegisterPage.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── .env
├── package.json
└── 

README.md


```

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager) or yarn

### Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/your-repo/realestate-frontend.git
   cd realestate-frontend
   ```

2. **Install Dependencies**:

   Using npm:

   ```sh
   npm install
   ```

   Using yarn:

   ```sh
   yarn install
   ```

3. **Start the Development Server**:

   Using npm:

   ```sh
   npm start
   ```

   Using yarn:

   ```sh
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```
REACT_APP_API_URL=http://localhost:8000/api
```

## Key Components

### Header Component

Create a file named `Header.js` in the `components` folder:

```javascript
// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>RealEstate</h1>
    </header>
  );
};

export default Header;
```

### Footer Component

Create a file named `Footer.js` in the `components` folder:

```javascript
// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2023 RealEstate. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
```

### UserForm Component

Create a file named `UserForm.js` in the `components` folder:

```javascript
// src/components/UserForm.js
import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default UserForm;
```

## Pages

### HomePage

Create a file named `HomePage.js` in the `pages` folder:

```javascript
// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to RealEstate</h2>
        <p>Your one-stop solution for real estate needs.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
```

### RegisterPage

Create a file named `RegisterPage.js` in the `pages` folder:

```javascript
// src/pages/RegisterPage.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserForm from '../components/UserForm';

const RegisterPage = () => {
  const handleRegister = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log('User registered:', data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Register</h2>
        <UserForm onSubmit={handleRegister} />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
```

## Main Application

### App Component

Create a file named `App.js` in the `src` folder:

```javascript
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
};

export default App;
```

### Entry Point

Create a file named `index.js` in the `src` folder:

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
