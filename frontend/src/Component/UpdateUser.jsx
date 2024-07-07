// src/components/UpdateUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Component/UpdateUser.module.css';

const UpdateUser = ({ user, onUserUpdated, onCancel }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser);
      onUserUpdated();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className={styles.updateUserContainer}>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit} className={styles.updateUserForm}>
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleChange}
          placeholder="Name*"
          required
        />
        <input
          type="email"
          name="email"
          value={updatedUser.email}
          onChange={handleChange}
          placeholder="Email*"
          required
        />
        <input
          type="number"
          name="age"
          value={updatedUser.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="address"
          value={updatedUser.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.updateButton}>Update</button>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};


export default UpdateUser;