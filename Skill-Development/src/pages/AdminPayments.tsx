import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminPayments: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isDashboard activeMenu="payment" dashboardType="admin" />
      <div className="admin-dashboard-bg" style={{ flex: 1 }}>
        <div className="admin-dashboard-header-row">
          <div className="admin-dashboard-title">Fee Payments</div>
          <div className="admin-dashboard-header-icons">
            <span className="admin-header-icon"><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#B0B0B0" strokeWidth="2"/><path d="M11 6V12L15 14" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round"/></svg></span>
            <span className="admin-header-icon"><svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10" stroke="#B0B0B0" strokeWidth="2"/><circle cx="11" cy="11" r="4" stroke="#B0B0B0" strokeWidth="2"/></svg></span>
            <span className="admin-header-avatar">AS</span>
          </div>
        </div>
        <div className="admin-payments-content">
          <div className="payments-header">
            <h2>Payment Management</h2>
            <div className="payment-filters">
              <select className="payment-filter">
                <option value="all">All Payments</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
              <input type="date" className="payment-date-filter" />
            </div>
          </div>
          <div className="payments-table">
            {/* Payment records will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments; 