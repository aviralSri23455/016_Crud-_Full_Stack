import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './src/App';

test('renders App component', () => {
  render(<App />);
  
  // Example test case: find a navigation link and assert its presence
  const homeLink = screen.getByText('Home');
  expect(homeLink).toBeInTheDocument();
  
  // Add more test cases as needed
});
