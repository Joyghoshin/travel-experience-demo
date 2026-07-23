import React from 'react';
import { experiences } from '../data/experiences';

export default function CatalogView({ onSelectExperience }) {
  const handleCardClick = (exp) => {
    if (onSelectExperience) {
      onSelectExperience(exp);
    } else {
      console.log("Experience selected:", exp.title);
    }
  };

  return (
    <div className="booking-demo-container">
      
      {/* Top Header Bar */}
      <div className="demo-top-bar">
        <div className="demo-title-group">
          <span className="demo-eyebrow">PRODUCT DEMO PORTFOLIO</span>
          <h2>Travel & Experience Booking Flow</h2>
        </div>
        <span className="demo-badge">Live Interactive Prototype</span>
      </div>

      {/* Main Experience Card */}
      {experiences.map((exp) => (
        <div 
          key={exp.id} 
          className="experience-card clickable-card"
          onClick={() => handleCardClick(exp)}
          style={{ cursor: 'pointer' }}
        >
          <div className="experience-banner">
            <img 
              src={exp.image} 
              alt={exp.title} 
              className="experience-img" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <div className="experience-overlay"></div>
            {exp.featured && <span className="badge-featured">Featured Experience</span>}
            
            <div className="experience-banner-text">
              <h1>{exp.title}</h1>
              <p>{exp.location} • {exp.duration}</p>
            </div>
          </div>
          
          <div className="experience-content">
            <p className="experience-desc">{exp.description}</p>
            <div className="pricing-action-group" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="pricing-box">
                <span className="price-label">From</span>
                <span className="price-val">${exp.price}</span>
                <span className="price-unit">/ person</span>
              </div>
              <button 
                type="button"
                className="btn-select-flow" 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double triggering with the card click
                  handleCardClick(exp);
                }}
                style={{
                  background: '#6366f1',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Book Experience →
              </button>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}