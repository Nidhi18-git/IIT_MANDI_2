import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import '../components/auth/Auth.css';
import SkillDevelopmentPrograms from '../components/SkillDevelopmentPrograms';

const RegisterAdmin: React.FC = () => {
  const { registerAdmin } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const ok = await registerAdmin(username, email, password);
    setLoading(false);
    if (ok) {
      navigate('/login-admin');
    } else {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', minHeight: '100vh', height: '100vh' }}>
        <Sidebar activeMenu="skill" />
        <div className="catalyst-login-page" style={{ flex: 1 }}>
          <div className="catalyst-login-content">
            <div className="login-container">
              <div className="welcome-title">
                <h1>Welcome to Skill India!</h1>
              </div>
              <div className="login-form-container">
                <h2>Admin Registration</h2>
                <form onSubmit={handleSubmit}>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="auth-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="auth-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="auth-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="auth-input"
                      required
                    />
                  </div>
                  <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>
                <div className="auth-links">
                  <div className="create-account">
                    <span>Already have an account?</span>
                    <Link to="/login-admin" className="auth-link">Click here for Sign In</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SkillDevelopmentPrograms />
    </div>
  );
};

export default RegisterAdmin; 