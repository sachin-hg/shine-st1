import React from 'react';
import { render, screen } from '@testing-library/react';
import Carouselmage from './index';
import '@testing-library/jest-dom';

describe('Carouselmage', () => {
  it('renders all carousel images', () => {
    const images = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
      { src: 'image3.jpg', alt: 'Image 3' },
    ];
    render(<Carouselmage images={images} />);

    images.forEach((image) => {
      const imgElement = screen.getByAltText(image.alt);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', image.src);
    });
  });

  it('handles the case where no images are passed', () => {
    render(<Carouselmage images={[]} />);

    const noImagesMessage = screen.queryByText('No images available');
    expect(noImagesMessage).toBeNull()

  });

    it('handles the case where images are not passed', () => {
        render(<Carouselmage />);
        const noImagesMessage = screen.queryByText('No images available');
        expect(noImagesMessage).toBeNull()
    });
});