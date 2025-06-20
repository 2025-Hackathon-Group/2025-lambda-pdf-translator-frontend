import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth(); // Needs backend logout integration

  return (
    <header className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📄</span>
          <span className="logo-text">
            <span className="logo-primary">PDF</span>
            <span className="logo-secondary">Translator</span>
          </span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/translate" className="nav-link">Translate</Link>
          {!user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          ) : (
            <div className="account-dropdown">
              <Link to="/account" className="nav-link">My Account</Link>
              <button onClick={logout} className="nav-link logout-btn">Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;