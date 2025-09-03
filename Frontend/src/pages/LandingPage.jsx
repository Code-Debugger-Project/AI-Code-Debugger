import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import LandingPageHeroImg from '../assets/Landing_Page_Hero_img.jpeg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to CodeDebugger</h1>
          <p className="hero-subtitle">Your AI-Powered Code Assistant for Seamless Development</p>
          <div className="hero-buttons">
            <Link to="/register" className="cta-button primary">Get Started</Link>
            <Link to="/login" className="cta-button secondary">Login</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Add a relevant illustration or animation here */}
          {/* <div className="code-animation"></div> */}
          <img src={LandingPageHeroImg} alt="Code Debugger Hero Image" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Powerful Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3>Error Rectifier</h3>
            <p>Instantly identify and fix code errors with AI-powered analysis and suggestions.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <h3>Source Code Analysis</h3>
            <p>Get detailed insights and improvements for your code with advanced AI analysis.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10M12 20l-4-4m4 4l4-4M4 6h16"></path>
              </svg>
            </div>
            <h3>Chat History</h3>
            <p>Access your past conversations and solutions for quick reference and learning.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3>User Profiles</h3>
            <p>Personalized experience with saved preferences and history tracking.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2 className="section-title">Why Choose CodeDebugger?</h2>
        <div className="benefits-container">
          <div className="benefit-item">
            <h3>AI-Powered Assistance</h3>
            <p>Leverage advanced AI technology to get instant help with your code.</p>
          </div>
          <div className="benefit-item">
            <h3>Time-Saving Solutions</h3>
            <p>Quickly identify and fix issues without spending hours debugging.</p>
          </div>
          <div className="benefit-item">
            <h3>Learning & Improvement</h3>
            <p>Learn from AI suggestions and improve your coding skills over time.</p>
          </div>
          <div className="benefit-item">
            <h3>Secure & Reliable</h3>
            <p>Your code is handled securely with enterprise-grade protection.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Coding Experience?</h2>
          <p>Join thousands of developers who are already using CodeDebugger to write better code.</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Start Free Trial</Link>
            <Link to="/login" className="cta-button secondary">Login to Your Account</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>CodeDebugger</h4>
            <p>Your AI-powered code assistant for seamless development.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/home">Dashboard</Link>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <Link to="/home/error-rectifier">Error Rectifier</Link>
            <Link to="/home/source-code">Source Code Analysis</Link>
            <Link to="/home">Chat History</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CodeDebugger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
