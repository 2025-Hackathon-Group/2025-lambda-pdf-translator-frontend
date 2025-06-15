import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <header className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span>🌐 PDF Translator</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/translate" className="nav-link">Translate</Link>
          <Link to="/account" className="nav-link">Account</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;