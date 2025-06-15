import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navigation />
      <h1 className="hero-title">PDF AI Translator</h1>
      <p className="hero-description">
        Transform your documents instantly with AI-powered translation.
      </p>

      <section className="features-grid">
        {[
          {
            title: 'Smart Translation',
            description: 'AI-powered translation maintains context and meaning',
            icon: '🤖',
          },
          {
            title: 'Interactive Chat',
            description: 'Ask questions about your document in any language',
            icon: '💬',
          },
          {
            title: 'PDF Support',
            description: 'Works with all PDF documents, maintaining formatting',
            icon: '📄',
          }
        ].map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </section>
      
      <button 
        className="cta-button"
        onClick={() => navigate('/translate')}
      >
        Start Translating →
      </button>
    </div>
  );
}

export default Home;
