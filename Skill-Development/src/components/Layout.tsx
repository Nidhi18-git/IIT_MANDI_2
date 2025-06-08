import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import '../styles/layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout-root">
      <main className="layout-main-content">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout; 