import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import '../components/auth/Auth.css';
import SkillDevelopmentPrograms from '../components/SkillDevelopmentPrograms';

const GOOGLE_CLIENT_ID = (window as any).__GOOGLE_CLIENT_ID__ || "";
console.log('Detected Google Client ID:', GOOGLE_CLIENT_ID);

const LoginStudent: React.FC = () => {
  const { loginStudent, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await loginStudent(email, password);
    setLoading(false);
    if (success) {
      navigate('/student-dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    try {
      const success = await googleLogin(credentialResponse.credential, 'student');
      if (success) {
        navigate('/student-dashboard');
      } else {
        setError('Google login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
                <h2>Student Login</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="input-icon-wrapper">
                      <span className="input-icon">
                        {/* Email/User Icon */}
                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M2 5.5A2.5 2.5 0 014.5 3h11A2.5 2.5 0 0118 5.5v9A2.5 2.5 0 0115.5 17h-11A2.5 2.5 0 012 14.5v-9z" stroke="#e99057" strokeWidth="1.5"/><path d="M3.5 5.5l6.5 5 6.5-5" stroke="#e99057" strokeWidth="1.5"/></svg>
                      </span>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-icon-wrapper">
                      <span className="input-icon">
                        {/* Password Icon */}
                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="4" y="8" width="12" height="8" rx="2" stroke="#e99057" strokeWidth="1.5"/><path d="M7 8V6a3 3 0 116 0v2" stroke="#e99057" strokeWidth="1.5"/></svg>
                      </span>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="login-btn"
                  >
                    {loading ? 'Logging in...' : 'Login Now'}
                  </button>
                </form>
                <div className="google-login-container">
                  {GOOGLE_CLIENT_ID ? (
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setError('Google login failed. Please try again.')}
                      useOneTap
                      text="signin_with"
                      shape="pill"
                      theme="filled_black"
                    />
                  ) : (
                    <button className="login-with-google-btn">
                      <div className="google-icon">G</div>
                      <span>Login With Google</span>
                    </button>
                  )}
                </div>
                <div className="auth-links">
                  <div className="forgot-password">
                    <span>Forget password</span>
                    <Link to="/reset-password" className="auth-link">Click here</Link>
                  </div>
                  <div className="create-account">
                    <span>Don't have an account yet?</span>
                    <Link to="/register-student" className="auth-link">Create account</Link>
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

export default LoginStudent; 