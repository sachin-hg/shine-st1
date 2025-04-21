import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServicePage from './index';

describe('ServicePage', () => {
  const mockService = {
    title: 'Mock Service',
    details: 'This is a mock service detail.',
    images: ['image1.jpg', 'image2.jpg'],
    pin:'123'
  };

  it('renders the component', () => {
    render(<ServicePage service={mockService} />);
    expect(screen.getByTestId('service-page')).toBeInTheDocument();
  });

  it('renders the service title', () => {
    render(<ServicePage service={mockService} />);
    expect(screen.getByText(mockService.title)).toBeInTheDocument();
  });

  it('renders the service details', () => {
    render(<ServicePage service={mockService} />);
    expect(screen.getByText(mockService.details)).toBeInTheDocument();
  });

  it('renders the service images', () => {
    render(<ServicePage service={mockService} />);
    mockService.images.forEach((image) => {
        expect(screen.getByAltText(image)).toBeInTheDocument();
    });
  });

  it('renders fallback when service is null', () => {
    render(<ServicePage service={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders fallback when service details are empty', () => {
    render(<ServicePage service={{}} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

});