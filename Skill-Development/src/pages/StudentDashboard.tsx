import React from 'react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard-container">
      <h1>Student Dashboard</h1>
      
      <div className="dashboard-welcome">
        <h2>Welcome, {user?.name}!</h2>
        <p>You are logged in as a student.</p>
      </div>
      
      <div className="dashboard-content">
        <h3>Your Courses</h3>
        <p>You don't have any courses yet.</p>
        
        <h3>Recommended Courses</h3>
        <ul>
          <li>Web Development</li>
          <li>Data Science</li>
          <li>Digital Marketing</li>
        </ul>
      </div>
      
      <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
};

export default StudentDashboard; 