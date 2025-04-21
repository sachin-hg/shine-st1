import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  it('renders all text content correctly', () => {
    render(<Home />);

    const welcomeText = screen.getByText(/Welcome/i);
    expect(welcomeText).toBeInTheDocument();

    const subText = screen.getByText(/Discover/i);
    expect(subText).toBeInTheDocument();
  });

  it('renders the component without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('home-container')).toBeInTheDocument();
  });
  
  it('renders the correct styles', () => {
    render(<Home />);
    const homeElement = screen.getByTestId('home-container');
    expect(homeElement).toHaveClass('container');
  });

  it('handles edge case: no props', () => {
    render(<Home />);
    expect(screen.getByTestId('home-container')).toBeInTheDocument();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});