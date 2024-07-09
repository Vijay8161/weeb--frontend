import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import { AuthContextProvider } from './context/AuthContext.js';

// Create a root element for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app within the AuthContextProvider
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
