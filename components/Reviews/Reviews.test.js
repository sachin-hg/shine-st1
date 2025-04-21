import React from 'react';
import { render, screen } from '@testing-library/react';
import Reviews from './index';

describe('Reviews Component', () => {
  const mockReviews = [
    {
      text: 'Review 1 text',
      name: 'Reviewer 1',
      image: '/path/to/image1.jpg',
    },
    {
      text: 'Review 2 text',
      name: 'Reviewer 2',
      image: '/path/to/image2.jpg',
    },
  ];

  it('renders without crashing', () => {
    render(<Reviews />);
  });

  it('renders all reviews when data is present', () => {
    render(<Reviews reviews={mockReviews} />);
    
    mockReviews.forEach(review => {
        const textElement = screen.getByText(review.text);
        expect(textElement).toBeInTheDocument();

        const nameElement = screen.getByText(review.name);
        expect(nameElement).toBeInTheDocument();

        const imageElement = screen.getByAltText(review.name);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', review.image);
    });
  });

  it('renders placeholder content when no reviews are provided', () => {
    render(<Reviews reviews={[]} />);

    const noReviewsMessage = screen.getByText('No reviews to display.');
    expect(noReviewsMessage).toBeInTheDocument();
  });

  it('renders fallback content when reviews prop is missing', () => {
    render(<Reviews />);
    const noReviewsMessage = screen.getByText('No reviews to display.');
    expect(noReviewsMessage).toBeInTheDocument();
  });

    it('does not render reviews if reviews array is empty', () => {
        render(<Reviews reviews={[]} />);

        expect(screen.queryByText(mockReviews[0].text)).not.toBeInTheDocument();
        expect(screen.queryByText(mockReviews[1].text)).not.toBeInTheDocument();
    });

    it('does not render reviews if reviews prop is not provided', () => {
        render(<Reviews />);
        expect(screen.queryByText(mockReviews[0].text)).not.toBeInTheDocument();
        expect(screen.queryByText(mockReviews[1].text)).not.toBeInTheDocument();
    });
});