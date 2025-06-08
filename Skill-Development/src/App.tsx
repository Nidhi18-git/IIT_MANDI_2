import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

// Import components
import Layout from './components/Layout';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CoursePage from './components/courses/CoursePage';
import CourseDetails from './components/courses/CourseDetails';
import UserManagement from './components/admin/UserManagement';

// Import pages
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import ResourcesPage from './pages/ResourcesPage';
import TeamPage from './pages/TeamPage';
import GalleryPage from './pages/GalleryPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import UsersPage from './pages/UsersPage';
import AdminCourses from './pages/AdminCourses';
import AdminPayments from './pages/AdminPayments';
import LoginStudent from './pages/LoginStudent';
import LoginAdmin from './pages/LoginAdmin';
import RegisterStudent from './pages/RegisterStudent';
import RegisterAdmin from './pages/RegisterAdmin';

// Import styles
import './App.css';
import './index.css';
import './styles/layout.css';
import './styles/home.css';
import './styles/dashboard.css';

// Make Google Client ID available to components
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
(window as any).__GOOGLE_CLIENT_ID__ = GOOGLE_CLIENT_ID;

// Protected route component
const ProtectedRoute = ({ element, requiredRole }: { element: JSX.Element, requiredRole?: string }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return element;
};

// Main App component
const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route index element={<HomePage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="login-student" element={<LoginStudent />} />
            <Route path="login-admin" element={<LoginAdmin />} />
            <Route path="register-student" element={<RegisterStudent />} />
            <Route path="register-admin" element={<RegisterAdmin />} />
            <Route path="unauthorized" element={<UnauthorizedPage />} />
            <Route path="users" element={<UsersPage />} />

            {/* Protected routes */}
            <Route 
              path="student-dashboard" 
              element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" />} 
            />
            <Route 
              path="admin-dashboard" 
              element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} 
            />
            <Route 
              path="courses" 
              element={<ProtectedRoute element={<CoursePage />} />} 
            />
            <Route 
              path="courses/:id" 
              element={<ProtectedRoute element={<CourseDetails />} />} 
            />
            <Route 
              path="manage-users" 
              element={<ProtectedRoute element={<UserManagement />} requiredRole="admin" />} 
            />

            {/* Additional routes for IIT Mandi Catalyst */}
            <Route path="skill-development" element={<div className="content-page"><h1>Skill Development</h1></div>} />
            <Route path="incubation" element={<div className="content-page"><h1>Incubation Program</h1></div>} />
            <Route path="fellowship" element={<div className="content-page"><h1>Fellowship Program</h1></div>} />
            <Route path="dst" element={<div className="content-page"><h1>DST</h1></div>} />
            <Route path="tableau" element={<div className="content-page"><h1>Tableau</h1></div>} />
            <Route path="portfolio" element={<div className="content-page"><h1>Portfolio Brochure</h1></div>} />
            <Route path="report" element={<div className="content-page"><h1>Annual Report</h1></div>} />
            <Route path="sitemap" element={<div className="content-page"><h1>Sitemap</h1></div>} />
            <Route path="terms" element={<div className="content-page"><h1>Terms of Use</h1></div>} />
            
            {/* Admin routes */}
            <Route path="admin-courses" element={<AdminCourses />} />
            <Route path="admin-payments" element={<AdminPayments />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App; 