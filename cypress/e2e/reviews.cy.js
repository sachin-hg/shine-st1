// cypress/e2e/reviews.cy.js
describe('Reviews Component Visual Tests', () => {
  const mockReviews = [
    {
      name: 'John Doe',
      text: 'Great service! Highly recommend.',
      image: '/mock/img1.jpg',
    },
    {
      name: 'Jane Smith',
      text: 'Amazing experience. Will use again!',
      image: '/mock/img2.jpg',
    },
  ];

  beforeEach(() => {
    cy.mount(
      <div style={{width: "100vw", height:"100vh", display:"flex", alignItems: "center", justifyContent: "center"}}>
      <Reviews reviews={mockReviews} />
      </div>
    );
  });

  it('should render all reviews', () => {
    cy.get('[data-testid="reviews-container"]').should('be.visible');
    cy.get('[data-testid="review-item"]').should('have.length', mockReviews.length);
  });

  it('should render the name in each review', () => {
    cy.get('[data-testid="review-item"]').each(($el, index) => {
      cy.wrap($el).find('[data-testid="review-name"]').should('be.visible').and('contain', mockReviews[index].name);
    });
  });

  it('should render the text in each review', () => {
    cy.get('[data-testid="review-item"]').each(($el, index) => {
      cy.wrap($el).find('[data-testid="review-text"]').should('be.visible').and('contain', mockReviews[index].text);
    });
  });

  it('should render the image in each review', () => {
    cy.get('[data-testid="review-item"]').each(($el, index) => {
      cy.wrap($el).find('[data-testid="review-image"]').should('be.visible').and('have.attr', 'src', mockReviews[index].image);
    });
  });

  it('should match the reviews screenshot', () => {
    cy.get('[data-testid="reviews-container"]').matchImageSnapshot('reviews');
  })
});

import React from 'react';
import Reviews from '../../components/Reviews';