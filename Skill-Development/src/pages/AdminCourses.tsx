import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminCourses: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isDashboard activeMenu="courses" dashboardType="admin" />
      <div className="admin-dashboard-bg" style={{ flex: 1 }}>
        <div className="admin-dashboard-header-row">
          <div className="admin-dashboard-title">Admin Courses</div>
          <div className="admin-dashboard-header-icons">
            <span className="admin-header-icon"><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#B0B0B0" strokeWidth="2"/><path d="M11 6V12L15 14" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round"/></svg></span>
            <span className="admin-header-icon"><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#B0B0B0" strokeWidth="2"/><circle cx="11" cy="11" r="4" stroke="#B0B0B0" strokeWidth="2"/></svg></span>
            <span className="admin-header-avatar">AS</span>
          </div>
        </div>
        <div className="admin-courses-content">
          <div className="courses-header">
            <h2>Manage Courses</h2>
            <button className="add-course-btn">Add New Course</button>
          </div>
          <div className="courses-grid">
            {/* Course cards will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses; 