import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TranslationPage from './pages/TranslationPage';
import AccountCreation from './pages/AccountCreation';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translate" element={<TranslationPage />} />
          <Route path="/account" element={<AccountCreation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
