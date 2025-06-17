import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features: Feature[] = [
    {
      title: 'Smart Translation',
      description: 'AI-powered translation maintains context and meaning',
      icon: '🤖'
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
  ];

  return (
    <div className="page-container">
      <h1 className="hero-title">PDF AI Translator</h1>
      <p className="hero-description">
        Transform your documents instantly with AI-powered translation.
      </p>

      <section className="features-grid">
        {features.map((feature, index) => (
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
};

export default Home;
