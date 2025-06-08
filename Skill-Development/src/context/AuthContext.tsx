import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginStudent: (email: string, password: string) => Promise<boolean>;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  registerStudent: (username: string, email: string, password: string) => Promise<boolean>;
  registerAdmin: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  googleLogin: (credential: string, role: 'student' | 'admin') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const loginStudent = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.auth.loginStudent({ email, password });
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/student-dashboard');
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.auth.loginAdmin({ email, password });
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/admin-dashboard');
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerStudent = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await api.auth.registerStudent({ username, email, password });
      return true;
    } catch (error: any) {
      console.error('Student registration failed:', error.response?.data || error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerAdmin = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await api.auth.registerAdmin({ username, email, password });
      return true;
    } catch (error: any) {
      console.error('Admin registration failed:', error.response?.data || error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (credential: string, role: 'student' | 'admin'): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.auth.googleLogin({ credential, role });
      setUser(response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate(role === 'student' ? '/student-dashboard' : '/admin-dashboard');
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    loginStudent,
    loginAdmin,
    registerStudent,
    registerAdmin,
    logout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;