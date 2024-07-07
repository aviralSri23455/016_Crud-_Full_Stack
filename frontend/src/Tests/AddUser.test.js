import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddUser from '../Component/AddUser';
import axios from 'axios';

jest.mock('axios');

describe('AddUser Component', () => {
  test('renders AddUser component', () => {
    render(<AddUser onUserAdded={() => {}} onCancel={() => {}} />);
    
    const nameInput = screen.getByPlaceholderText('Name*');
    expect(nameInput).toBeInTheDocument();
    
    const emailInput = screen.getByPlaceholderText('Email*');
    expect(emailInput).toBeInTheDocument();
  });

  test('submits form with user data', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User added successfully' } });

    render(<AddUser onUserAdded={() => {}} onCancel={() => {}} />);
    
    fireEvent.change(screen.getByPlaceholderText('Name*'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email*'), { target: { value: 'john@example.com' } });
    
    fireEvent.click(screen.getByText('Add'));
    
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      name: 'John Doe',
      email: 'john@example.com',
      address: '',
      age: '',
      password: ''
    });
  });
});
