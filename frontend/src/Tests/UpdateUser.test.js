import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateUser from '../Component/UpdateUser';
import axios from 'axios';

jest.mock('axios');

describe('UpdateUser Component', () => {
  const mockUser = {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    address: '123 Main St'
  };

  test('renders UpdateUser component', () => {
    render(<UpdateUser user={mockUser} onUserUpdated={() => {}} onCancel={() => {}} />);
    
    const updateButton = screen.getByText('Update');
    expect(updateButton).toBeInTheDocument();
    
    const nameInput = screen.getByDisplayValue('John Doe');
    expect(nameInput).toBeInTheDocument();
    
    const emailInput = screen.getByDisplayValue('john@example.com');
    expect(emailInput).toBeInTheDocument();
  });

  test('submits form with updated user data', async () => {
    axios.put.mockResolvedValue({ data: { message: 'User updated successfully' } });

    render(<UpdateUser user={mockUser} onUserUpdated={() => {}} onCancel={() => {}} />);
    
    fireEvent.change(screen.getByDisplayValue('John Doe'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByDisplayValue('john@example.com'), { target: { value: 'jane@example.com' } });
    
    fireEvent.click(screen.getByText('Update'));
    
    expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      name: 'Jane Doe',
      email: 'jane@example.com'
    }));
  });
});