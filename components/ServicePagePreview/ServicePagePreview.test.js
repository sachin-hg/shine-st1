import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServicePagePreview from './index';

describe('ServicePagePreview', () => {
  const mockService = {
    title: 'Test Service',
    description: 'This is a test service description.',
    image: 'test-image.jpg',
  };

  it('renders the service title', () => {
    render(<ServicePagePreview {...mockService} />);
    const titleElement = screen.getByText(mockService.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the service description', () => {
    render(<ServicePagePreview {...mockService} />);
    const descriptionElement = screen.getByText(mockService.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the service image', () => {
    render(<ServicePagePreview {...mockService} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockService.image);
  });

  it('handles missing title gracefully', () => {
    const { title, ...serviceWithoutTitle } = mockService;
    render(<ServicePagePreview {...serviceWithoutTitle} />);
    const titleElement = screen.queryByRole('heading');
    expect(titleElement).not.toBeInTheDocument();
  });

  it('handles missing description gracefully', () => {
    const { description, ...serviceWithoutDescription } = mockService;
    render(<ServicePagePreview {...serviceWithoutDescription} />);
    const descriptionElement = screen.queryByText(/This is a test service description/i);
    expect(descriptionElement).not.toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const { image, ...serviceWithoutImage } = mockService;
    render(<ServicePagePreview {...serviceWithoutImage} />);
    const imageElement = screen.queryByRole('img');
    expect(imageElement).not.toBeInTheDocument();
  });

    it('renders without crashing when no props are passed', () => {
    render(<ServicePagePreview />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(/./i)).not.toBeInTheDocument();

  });
});