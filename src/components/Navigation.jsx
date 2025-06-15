import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './Navigation.css';

function Navigation() {
  const { user, logout } = useAuth(); // Needs backend logout functionality

  return (
    <header className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span>🌐 PDF Translator</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/translate" className="nav-link">Translate</Link>
          {user ? (
            <div className="account-dropdown">
              <Link to="/account" className="nav-link">My Account</Link>
              <button onClick={logout} className="nav-link">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/account/login" className="nav-link">Login</Link>
              <Link to="/account/register" className="nav-link">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;