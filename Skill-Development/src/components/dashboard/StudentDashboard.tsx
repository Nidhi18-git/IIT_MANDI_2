import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './StudentDashboard.css';

const courses = [
  {
    id: 1,
    title: 'Advance Machine Learnings',
    image: 'images/aml.jpeg',
    progress: 100
  },
  {
    id: 2,
    title: 'Artificial Intelligence',
    image: 'images/ai.jpg',
    progress: 100
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    image: 'images/uiux.png',
    progress: 100
  },
  {
    id: 4,
    title: 'Data Analyst',
    image: 'images/da.jpeg',
    progress: 100
  },
  {
    id: 5,
    title: 'Internet of Things',
    image: 'images/iot.jpeg',
    progress: 100
  },
  {
    id: 6,
    title: 'Robotics & Drone Tech',
    image: 'images/drone.jpeg',
    progress: 100
  }
];

const StudentDashboard: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isDashboard activeMenu="dashboard" />
      <div className="student-dashboard-bg" style={{ flex: 1 }}>
        <div className="student-dashboard-header-row">
          <div className="student-dashboard-title">My courses</div>
          <div className="student-dashboard-header-icons">
            <span className="student-header-icon"><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#B0B0B0" strokeWidth="2"/><path d="M11 6V12L15 14" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round"/></svg></span>
            <span className="student-header-icon"><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#B0B0B0" strokeWidth="2"/><circle cx="11" cy="11" r="4" stroke="#B0B0B0" strokeWidth="2"/></svg></span>
            <div className="profile-dropdown">
              <span className="student-header-avatar" onClick={handleProfileClick}>AS</span>
              {showProfileMenu && (
                <div className="profile-dropdown-menu">
                  <Link to="/accessibility" className="dropdown-item">Accessibility</Link>
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/certificate" className="dropdown-item">Certificate</Link>
                  <Link to="/reports" className="dropdown-item">Reports</Link>
                  <button onClick={handleLogout} className="dropdown-item">Log out</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="student-dashboard-section-title">Course overview</div>
        <div className="student-dashboard-section-divider" />
        <div className="student-dashboard-courses-grid">
          {courses.map((course, i) => (
            <div className="student-dashboard-course-card" key={course.id}>
              <img src={course.image} alt={course.title} className="student-dashboard-course-img" />
              <div className="student-dashboard-course-title">{course.title}</div>
              <div className="student-dashboard-progress-bar-bg">
                <div className="student-dashboard-progress-bar" style={{width: `${course.progress}%`}} />
              </div>
              <div className="student-dashboard-progress-label">100% Complete</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 