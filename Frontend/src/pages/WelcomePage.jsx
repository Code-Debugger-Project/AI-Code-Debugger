import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleModeClick = (path) => {
    navigate(path);
  };

  return (
    <div className="welcome-section">
      <h1 className="welcome-title">Welcome to AI Assistant</h1>
      <p className="welcome-subtitle">
        Choose your preferred assistance mode to get started with intelligent solutions
      </p>
      <div className="action-buttons">
        <button className="action-button" onClick={() => handleModeClick('/home/error-rectifier')}>
          <span className="button-icon">
            <div className="wrench-icon"></div>
          </span>
          Error Rectifier
        </button>
        <button className="action-button" onClick={() => handleModeClick('/home/source-code')}>
          <span className="button-icon">
            <div className="code-icon"></div>
          </span>
          Source Code
        </button>
      </div>
    </div>
  );
};

export default WelcomePage; 