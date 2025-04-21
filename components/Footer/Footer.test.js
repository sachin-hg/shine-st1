import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('renders all text content', () => {
    render(<Footer />);
    expect(screen.getByText(/Terms and Conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Site Map/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it('renders the copyright year dynamically', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear, 'i'))).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<Footer />);
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage.src).toContain('/logo.png');
  });

  it('renders the youtube image', () => {
    render(<Footer />);
    const youtubeImage = screen.getByAltText('youtube');
    expect(youtubeImage).toBeInTheDocument();
    expect(youtubeImage.src).toContain('/yt.png');
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/Contact:/i)).toBeInTheDocument();
  });

  it('renders the social media links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /youtube/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
  });

  it('renders without errors when no props are passed', () => {
    render(<Footer />);
    expect(screen.getByText(/Terms and Conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Site Map/i)).toBeInTheDocument();
  });

});