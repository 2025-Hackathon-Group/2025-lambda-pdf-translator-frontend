import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TranslationPage from './pages/TranslationPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/translate" element={<TranslationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
