import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TranslationPage from './pages/TranslationPage';
import AccountCreation from './pages/AccountCreation';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translate" element={<TranslationPage />} />
          <Route path="/account/*" element={<AccountCreation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
