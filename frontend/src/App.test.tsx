import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders superhero manager component', () => {
    render(<App />);
    expect(screen.getByText(/add new superhero/i)).toBeInTheDocument();
  });
});
