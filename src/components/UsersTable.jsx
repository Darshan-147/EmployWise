import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserModal from './EditUserModal';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();
  
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
          method: 'DELETE',
        });
        
        if (response.status === 204 || response.ok) {
          // Remove user from the list
          setUsers(users.filter(user => user.id !== userId));
          showNotification('User deleted successfully', 'success');
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (err) {
        showNotification(`Error: ${err.message}`, 'error');
      }
    }
  };
  
  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      // Update the user in the list with the form data directly
      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      
      setShowEditModal(false);
      showNotification('User updated successfully', 'success');
    } catch (err) {
      showNotification(`Error: ${err.message}`, 'error');
    }
  };
  
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };
  
  if (loading && users.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Users List</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        <p className="text-lg">Loading users...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Users List</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users List</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      
      {/* Notification */}
      {notification.show && (
        <div className={`mb-4 p-3 rounded ${
          notification.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {notification.message}
        </div>
      )}
      
      {/* Table layout for users */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Avatar</th>
              <th className="py-2 px-4 border-b text-left">First Name</th>
              <th className="py-2 px-4 border-b text-left">Last Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <img 
                    src={user.avatar} 
                    alt={`${user.first_name} ${user.last_name}`} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b">{user.first_name}</td>
                <td className="py-2 px-4 border-b">{user.last_name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination controls */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            Previous
          </button>
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
      
      {loading && users.length > 0 && (
        <div className="mt-4 text-center text-gray-600">
          Loading...
        </div>
      )}
      
      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <EditUserModal 
          user={selectedUser} 
          onClose={() => setShowEditModal(false)} 
          onUpdate={handleUpdateUser} 
        />
      )}
    </div>
  );
};

export default UsersTable;