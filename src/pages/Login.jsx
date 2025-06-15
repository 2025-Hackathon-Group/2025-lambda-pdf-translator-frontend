// filepath: c:\Users\david\2025-lambda-pdf-translator-frontend\src\pages\Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Needs backend API call for authentication
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
        </form>
      </div>
    </div>
  );
}