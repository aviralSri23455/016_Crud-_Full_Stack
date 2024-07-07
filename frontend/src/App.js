// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './Component/UserTable';
import AddUser from './Component/AddUser';
import UpdateUser from './Component/UpdateUser';
import styles from './App.module.css';

function App() {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setEditingUser(null);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowAddForm(false);
  };

  const handleUpdateUser = () => {
    fetchUsers();
    setEditingUser(null);
  };

  return (
    <div className={styles.app}>
      <h1>Mean Stack CRUD App</h1>
      {!showAddForm && !editingUser && (
        <button className={styles.addButton} onClick={toggleAddForm}>
          Add User
        </button>
      )}
      {showAddForm ? (
        <AddUser onUserAdded={() => { fetchUsers(); toggleAddForm(); }} onCancel={toggleAddForm} />
      ) : editingUser ? (
        <UpdateUser user={editingUser} onUserUpdated={handleUpdateUser} onCancel={() => setEditingUser(null)} />
      ) : (
        <UserTable users={users} onUserDeleted={fetchUsers} onEditUser={handleEditUser} />
      )}
    </div>
  );
}

export default App;