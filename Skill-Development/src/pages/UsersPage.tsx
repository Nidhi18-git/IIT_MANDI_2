import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@example.com',
      role: 'student',
      status: 'active',
      lastLogin: '2024-04-28'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      role: 'student',
      status: 'active',
      lastLogin: '2024-04-27'
    },
    {
      id: 3,
      name: 'Amit Singh',
      email: 'amit.singh@example.com',
      role: 'student',
      status: 'inactive',
      lastLogin: '2024-04-15'
    },
    {
      id: 4,
      name: 'Neha Patel',
      email: 'neha.patel@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-04-28'
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      email: 'vikram.mehta@example.com',
      role: 'student',
      status: 'active',
      lastLogin: '2024-04-26'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && user.status === 'active';
    if (filter === 'inactive') return matchesSearch && user.status === 'inactive';
    if (filter === 'admin') return matchesSearch && user.role === 'admin';
    if (filter === 'student') return matchesSearch && user.role === 'student';
    
    return matchesSearch;
  });

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>User Management</h1>
        <p>View and manage all users in the Skill India platform</p>
      </div>

      <div className="users-controls">
        <div className="search-filter">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="filter-box">
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">All Users</option>
              <option value="active">Active Users</option>
              <option value="inactive">Inactive Users</option>
              <option value="admin">Admins Only</option>
              <option value="student">Students Only</option>
            </select>
          </div>
        </div>
        
        <div className="action-buttons">
          <Link to="/users/add" className="add-user-btn">Add New User</Link>
          <button className="export-btn">Export User Data</button>
        </div>
      </div>

      <div className="users-table-container">
        {filteredUsers.length > 0 ? (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <Link to={`/users/${user.id}`} className="view-btn">View</Link>
                    <Link to={`/users/${user.id}/edit`} className="edit-btn">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-users-message">
            <p>No users found matching your search criteria.</p>
          </div>
        )}
      </div>

      <div className="pagination">
        <button className="pagination-button active">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
        <button className="pagination-button">Next →</button>
      </div>
    </div>
  );
};

export default UsersPage; 