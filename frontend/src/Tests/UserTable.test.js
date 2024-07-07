import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from '../Component/UserTable';
import axios from 'axios';

jest.mock('axios');

describe('UserTable Component', () => {
  const mockUsers = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', age: 30, address: '123 Main St' },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25, address: '456 Elm St' }
  ];

  test('renders UserTable component', () => {
    render(<UserTable users={mockUsers} onUserDeleted={() => {}} onEditUser={() => {}} />);
    
    // Asserting table headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    
    // Asserting user data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('deletes a user when delete button is clicked', async () => {
    axios.delete.mockResolvedValue({ data: { message: 'User deleted successfully' } });

    render(<UserTable users={mockUsers} onUserDeleted={jest.fn()} onEditUser={jest.fn()} />);
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(axios.delete).toHaveBeenCalledWith(expect.any(String));
  });

  test('calls onEditUser when edit button is clicked', () => {
    const mockOnEditUser = jest.fn();
    render(<UserTable users={mockUsers} onUserDeleted={() => {}} onEditUser={mockOnEditUser} />);
    
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    
    expect(mockOnEditUser).toHaveBeenCalledWith(mockUsers[0]);
  });
});
