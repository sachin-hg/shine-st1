import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceGallery from './index';
import '@testing-library/jest-dom';

describe('ServiceGallery', () => {
  const mockServices = [
    { id: 1, url: '/service1.jpg', title: 'Service 1' },
    { id: 2, url: '/service2.jpg', title: 'Service 2' },
    { id: 3, url: '/service3.jpg', title: 'Service 3' },
  ];

  it('renders without crashing', () => {
    render(<ServiceGallery services={mockServices} />);
  });

  it('renders all service images', () => {
    render(<ServiceGallery services={mockServices} />);
    mockServices.forEach(service => {
      const image = screen.getByRole('img', { name: service.title });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', service.url);
    });
  });

  it('displays "No services available" message when services array is empty', () => {
    render(<ServiceGallery services={[]} />);
    const noServicesMessage = screen.getByText('No services available');
    expect(noServicesMessage).toBeInTheDocument();
  });

  it('displays "No services available" message when services prop is not provided', () => {
    render(<ServiceGallery />);
    const noServicesMessage = screen.getByText('No services available');
    expect(noServicesMessage).toBeInTheDocument();
  });

  it('renders service container', () => {
    render(<ServiceGallery services={mockServices}/>);
    const container = screen.getByTestId('service-gallery-container')
    expect(container).toBeInTheDocument()
  })

  it('each image has a title', () => {
    render(<ServiceGallery services={mockServices}/>);
    mockServices.forEach(service => {
        const title = screen.getByText(service.title);
        expect(title).toBeInTheDocument();
    });
  })

  it('renders the correct number of service images', () => {
    render(<ServiceGallery services={mockServices}/>);
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(mockServices.length)
  })

  it('renders correctly when services prop is null', () => {
    render(<ServiceGallery services={null} />);
    const noServicesMessage = screen.getByText('No services available');
    expect(noServicesMessage).toBeInTheDocument();
  });
});