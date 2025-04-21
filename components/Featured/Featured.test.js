import React from 'react';
import { render, screen } from '@testing-library/react';
import Featured from './index';

describe('Featured Component', () => {
  const mockFeaturedItems = [
    { src: '/path/to/image1.png', alt: 'Image 1 Alt Text', title: 'Featured Title 1' },
    { src: '/path/to/image2.png', alt: 'Image 2 Alt Text', title: 'Featured Title 2' },
  ];

  it('renders all featured items correctly', () => {
    render(<Featured featuredItems={mockFeaturedItems} />);

    mockFeaturedItems.forEach((item) => {
      const image = screen.getByAltText(item.alt);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', item.src);

      const title = screen.getByText(item.title);
      expect(title).toBeInTheDocument();
    });
  });

  it('renders correctly when no data is passed', () => {
    render(<Featured featuredItems={[]} />);

    const featuredContainer = screen.getByTestId("featured-container");
    expect(featuredContainer).toBeInTheDocument();
    
    const noFeaturedText = screen.getByText('No featured data available.');
    expect(noFeaturedText).toBeInTheDocument();
  });
  it('renders correctly when featuredItems is undefined', () => {
    render(<Featured />);
    const featuredContainer = screen.getByTestId("featured-container");
    expect(featuredContainer).toBeInTheDocument();
    const noFeaturedText = screen.getByText('No featured data available.');
    expect(noFeaturedText).toBeInTheDocument();

  });
});