import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

interface SidebarProps {
  isDashboard?: boolean;
  activeMenu?: string;
  onMenuClick?: (menu: string) => void;
  dashboardType?: 'student' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ isDashboard, activeMenu, onMenuClick, dashboardType }) => {
  const [skillOpen, setSkillOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (menu: string) => {
    if (menu === 'home') {
      navigate('/');
    } else if (isDashboard) {
      // Handle dashboard-specific navigation
      switch (menu) {
        case 'dashboard':
          navigate(dashboardType === 'admin' ? '/admin-dashboard' : '/student-dashboard');
          break;
        case 'courses':
          navigate('/admin-courses');
          break;
        case 'payment':
          navigate('/admin-payments');
          break;
        default:
          if (onMenuClick) {
            onMenuClick(menu);
          }
      }
    } else if (onMenuClick) {
      onMenuClick(menu);
    }
  };

  if (isDashboard) {
    return (
      <aside className="sidebar-root dashboard">
        <div className="sidebar-logo-area-simple">
          <img src="images/logo.png" alt="IIT Mandi iHub & HCi Foundation" className="sidebar-logo-img-simple" />
        </div>
        <nav className="sidebar-menu-area-simple">
          <button 
            className={`sidebar-menu-btn-simple${activeMenu === 'home' ? ' active' : ''}`} 
            onClick={() => handleMenuClick('home')}
          >
            Home
          </button>
          <button 
            className={`sidebar-menu-btn-simple${activeMenu === 'dashboard' ? ' active' : ''}`} 
            onClick={() => handleMenuClick('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`sidebar-menu-btn-simple${activeMenu === 'courses' ? ' active' : ''}`} 
            onClick={() => handleMenuClick('courses')}
          >
            My Courses
          </button>
          <button 
            className={`sidebar-menu-btn-simple${activeMenu === 'payment' ? ' active' : ''}`} 
            onClick={() => handleMenuClick('payment')}
          >
            Fee Payment
          </button>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="sidebar-root">
      <div className="sidebar-logo-area-simple">
        <img src="images/logo.png" alt="IIT Mandi iHub & HCi Foundation" className="sidebar-logo-img-simple" />
      </div>
      <nav className="sidebar-menu-area-simple">
        <button 
          className={`sidebar-menu-btn-simple${activeMenu === 'home' ? ' active' : ''}`} 
          onClick={() => { setSkillOpen(false); handleMenuClick('home'); }}
        >
          Home
        </button>
        <div style={{ width: '100%' }}>
          <button
            className={`sidebar-menu-btn-simple${activeMenu === 'skill' ? ' active' : ''}`}
            onClick={() => { setSkillOpen((v) => !v); onMenuClick && onMenuClick('skill'); }}
            aria-expanded={skillOpen}
            aria-controls="skill-dropdown"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            Skill Development
            <span className="sidebar-arrow-simple" style={{ transform: skillOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              {skillOpen ? '\u25BC' : '\u203A'}
            </span>
          </button>
          {skillOpen && (
            <div className="sidebar-dropdown" id="skill-dropdown">
              <button className="sidebar-dropdown-btn" onClick={() => { setSkillOpen(false); navigate('/login-student'); }}>Student</button>
              <button className="sidebar-dropdown-btn" onClick={() => { setSkillOpen(false); navigate('/login-admin'); }}>Admin</button>
            </div>
          )}
        </div>
        <button 
          className={`sidebar-menu-btn-simple${activeMenu === 'incubation' ? ' active' : ''}`} 
          onClick={() => { setSkillOpen(false); onMenuClick && onMenuClick('incubation'); }}
        >
          Incubation
        </button>
        <button 
          className={`sidebar-menu-btn-simple${activeMenu === 'fellowship' ? ' active' : ''}`} 
          onClick={() => { setSkillOpen(false); onMenuClick && onMenuClick('fellowship'); }}
        >
          Fellowship
        </button>
        <button 
          className={`sidebar-menu-btn-simple${activeMenu === 'dst' ? ' active' : ''}`} 
          onClick={() => { setSkillOpen(false); onMenuClick && onMenuClick('dst'); }}
        >
          DST
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar; 