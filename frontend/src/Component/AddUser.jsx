// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Component/AddUser.module.css';

const AddUser = ({ onUserAdded, onCancel }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', user);
      onUserAdded();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className={styles.addUserContainer}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} className={styles.addUserForm}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name*"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email*"
          required
        />
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password*"
          required
        />
        <div className={styles.formButtons}>
          <button type="submit" className={styles.addButton}>Add</button>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;