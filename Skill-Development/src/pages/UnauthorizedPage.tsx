import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-content">
        <div className="unauthorized-icon">🔒</div>
        <h1>Access Denied</h1>
        <p>Sorry, you don't have permission to access this page.</p>
        <p>Please log in with the appropriate credentials or contact an administrator for assistance.</p>
        
        <div className="unauthorized-actions">
          <Link to="/" className="primary-button">Go to Home</Link>
          <Link to="/login" className="secondary-button">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 