import React from 'react';
import { render, screen } from '@testing-library/react';
import Gallery from './index';

describe('Gallery Component', () => {
  const mockImages = [
    { id: 1, src: '/image1.jpg', alt: 'Image 1', title: 'Title 1' },
    { id: 2, src: '/image2.jpg', alt: 'Image 2', title: 'Title 2' },
    { id: 3, src: '/image3.jpg', alt: 'Image 3', title: 'Title 3' },
  ];

  it('renders all images in the gallery', () => {
    render(<Gallery images={mockImages} />);
    mockImages.forEach((image) => {
      const imgElement = screen.getByAltText(image.alt);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', image.src);
    });
  });

  it('renders the correct title for each image', () => {
    render(<Gallery images={mockImages} />);
    mockImages.forEach((image) => {
      const titleElement = screen.getByText(image.title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('renders the component when there are no images', () => {
    render(<Gallery images={[]} />);
    const galleryContainer = screen.getByTestId('gallery-container');
    expect(galleryContainer).toBeInTheDocument();
  });

    it('renders the correct text elements', () => {
    render(<Gallery images={mockImages} />);
    const titleElement = screen.getByText('Our services');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(<Gallery images={mockImages} />);
    expect(container).toBeInTheDocument();
  });
});