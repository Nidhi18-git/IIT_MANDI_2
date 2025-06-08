import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'admin';
  status: 'active' | 'inactive';
  registeredDate: string;
  lastLogin: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      role: 'student',
      status: 'active',
      registeredDate: '2023-12-15',
      lastLogin: '2024-04-25'
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya.singh@example.com',
      role: 'student',
      status: 'active',
      registeredDate: '2024-01-10',
      lastLogin: '2024-04-26'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      role: 'student',
      status: 'inactive',
      registeredDate: '2023-11-05',
      lastLogin: '2024-03-15'
    },
    {
      id: 4,
      name: 'Neha Patel',
      email: 'neha.patel@example.com',
      role: 'admin',
      status: 'active',
      registeredDate: '2023-10-20',
      lastLogin: '2024-04-28'
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      email: 'vikram.mehta@example.com',
      role: 'student',
      status: 'active',
      registeredDate: '2024-02-25',
      lastLogin: '2024-04-27'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue: any = a[sortField as keyof User];
    let bValue: any = b[sortField as keyof User];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="user-management">
      <h1>User Management</h1>
      
      <div className="user-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => handleStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Role:</label>
            <select 
              value={roleFilter} 
              onChange={(e) => handleRoleFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        
        <button className="add-user-btn">Add New User</button>
      </div>
      
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('email')}>
                Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('role')}>
                Role {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('registeredDate')}>
                Registered Date {sortField === 'registeredDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('lastLogin')}>
                Last Login {sortField === 'lastLogin' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map(user => (
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
                  <td>{new Date(user.registeredDate).toLocaleDateString()}</td>
                  <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <button className="edit-btn">Edit</button>
                    <button 
                      className="status-toggle-btn"
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteClick(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-users-message">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={handleConfirmDelete}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 