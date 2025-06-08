import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  const { user, logout } = useAuth();

  return (
    <header className="main-header">
      <div className="header-left">
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
        <div className="site-title">
          <Link to="/">Skill India Portal</Link>
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <input type="text" placeholder="Search..." />
          <button className="search-button">Search</button>
        </div>

        <div className="user-menu">
          {user ? (
            <div className="user-dropdown">
              <div className="user-avatar">
                <span className="avatar-placeholder">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div className="dropdown-content">
                <div className="user-info">
                  <div className="user-name">{user.name || 'User'}</div>
                  <div className="user-role">{user.role || 'Student'}</div>
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/register" className="register-button">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 