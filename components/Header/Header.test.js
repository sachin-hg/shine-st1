import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header Component', () => {
  it('should render the header text', () => {
    render(<Header />);
    const headerText = screen.getByText(/Your Header Text/i);
    expect(headerText).toBeInTheDocument();
  });

  it('should render the logo image', () => {
    render(<Header />);
    const logoImage = screen.getByAltText(/logo/i);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage.src).toContain('/path/to/your/logo.png');
  });

  it('should handle missing logo image gracefully', () => {
    const originalError = console.error;
    console.error = jest.fn();

    render(<Header />);
    const logoImage = screen.queryByAltText(/logo/i);
    
    expect(logoImage).not.toBeNull();

    console.error = originalError;
  });
  it('should display the icon', () => {
    render(<Header />);
    const icon = screen.getByAltText(/icon/i);
    expect(icon).toBeInTheDocument();
  })

});