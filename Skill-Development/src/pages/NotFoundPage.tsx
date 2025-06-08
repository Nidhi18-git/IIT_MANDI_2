import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>We're sorry, the page you requested could not be found.</p>
        <p>The page might have been removed, had its name changed, or is temporarily unavailable.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="primary-button">Go to Home</Link>
          <button onClick={() => window.history.back()} className="secondary-button">Go Back</button>
        </div>
        
        <div className="not-found-help">
          <p>If you believe this is an error, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 