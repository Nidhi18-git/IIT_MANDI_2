import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './AdminDashboard.css';

const cardData = [
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#F5F5F5"/>
        <path d="M20 12V28" stroke="#234a8c" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M12 20H28" stroke="#234a8c" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Upload Pdf Resources',
    button: 'Upload',
    onClick: () => document.getElementById('upload-pdf-modal')?.classList.add('active')
  },
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#F5F5F5"/>
        <path d="M12 28C12 23.58 15.58 20 20 20C24.42 20 28 23.58 28 28" stroke="#234a8c" strokeWidth="2.2"/>
        <circle cx="20" cy="16" r="4" stroke="#234a8c" strokeWidth="2.2"/>
      </svg>
    ),
    title: 'Check Attendance',
    button: 'Show More',
    onClick: () => alert('Check Attendance')
  },
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#F5F5F5"/>
        <path d="M14 26C14 22.6863 16.6863 20 20 20C23.3137 20 26 22.6863 26 26" stroke="#234a8c" strokeWidth="2.2"/>
        <circle cx="20" cy="16" r="4" stroke="#234a8c" strokeWidth="2.2"/>
        <path d="M24 14L28 18" stroke="#234a8c" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Check Startup Application',
    button: 'Show More',
    onClick: () => alert('Check Startup Application')
  }
];

const AdminDashboard: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 156,
    activeCourses: 12,
    pendingRequests: 5,
    completionRate: 78
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, user: 'Rahul Sharma', action: 'enrolled in Web Development', time: '2 hours ago' },
    { id: 2, user: 'Priya Singh', action: 'completed Digital Marketing', time: '3 hours ago' },
    { id: 3, user: 'Amit Kumar', action: 'submitted an assignment', time: '5 hours ago' },
    { id: 4, user: 'Neha Patel', action: 'joined the platform', time: '1 day ago' }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
    }
  };

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
      <div className="admin-dashboard-bg" style={{ flex: 1 }}>
        <div className="admin-dashboard-header-row">
          <div className="admin-dashboard-title">Admin Dashboard</div>
          <div className="admin-dashboard-header-icons">
            <span className="admin-header-icon"><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#B0B0B0" strokeWidth="2"/><path d="M11 6V12L15 14" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round"/></svg></span>
            <span className="admin-header-icon"><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#B0B0B0" strokeWidth="2"/><circle cx="11" cy="11" r="4" stroke="#B0B0B0" strokeWidth="2"/></svg></span>
            <div className="profile-dropdown">
              <span className="admin-header-avatar" onClick={handleProfileClick}>AS</span>
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
        <div className="admin-dashboard-grid">
          {[0,1,2,0,1,2,0,1,2].map((col, i) => (
            <div className="admin-dashboard-card" key={i}>
              <div className="admin-dashboard-card-icon">{cardData[col].icon}</div>
              <div className="admin-dashboard-card-title">{cardData[col].title}</div>
              <button className="admin-dashboard-card-btn" onClick={cardData[col].onClick}>
                {cardData[col].button} <span className="admin-dashboard-card-btn-arrow">&rarr;</span>
              </button>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        <div id="upload-pdf-modal" className="upload-modal">
          <div className="upload-modal-content">
            <h2>Upload PDF Resources</h2>
            <div className="upload-options">
              <div className="upload-option">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="upload-button">
                  Upload from Device
                </label>
              </div>
              <div className="upload-option">
                <button className="upload-button">
                  Upload from Google Drive
                </button>
              </div>
              <div className="upload-option">
                <button className="upload-button">
                  Upload from Dropbox
                </button>
              </div>
            </div>
            <button 
              className="close-modal"
              onClick={() => document.getElementById('upload-pdf-modal')?.classList.remove('active')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 