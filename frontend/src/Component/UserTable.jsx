// src/components/UserTable.js
import React from 'react';
import axios from 'axios';
import styles from '../Component/UserTable.module.css';

const UserTable = ({ users, onUserDeleted, onEditUser }) => {
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      onUserDeleted();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.address}</td>
            <td>
              <button className={styles.editButton} onClick={() => onEditUser(user)}>Edit</button>
              <button className={styles.deleteButton} onClick={() => deleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;