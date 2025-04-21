// cypress/e2e/servicePage.cy.js
import React from 'react';

describe('ServicePage Component - Visual Tests', () => {
  const mockServiceData = {
    title: 'Mock Service Title',
    description: 'This is a mock description for the service.',
    images: [
      { src: 'https://via.placeholder.com/150', alt: 'Mock Image 1' },
      { src: 'https://via.placeholder.com/150', alt: 'Mock Image 2' },
    ],
  };

  beforeEach(() => {
    cy.mount(
        <div>
          <h1>{mockServiceData.title}</h1>
          <p>{mockServiceData.description}</p>
          {mockServiceData.images.map((image, index) => (
              <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
              />
          ))}
        </div>
    );
  });

  it('should render the service title', () => {
    cy.contains(mockServiceData.title).should('be.visible');
    cy.matchImageSnapshot();
  });

  it('should render the service description', () => {
    cy.contains(mockServiceData.description).should('be.visible');
    cy.matchImageSnapshot();
  });

  it('should render all service images', () => {
    mockServiceData.images.forEach((image) => {
      cy.get(`img[alt="${image.alt}"]`)
        .should('be.visible')
        .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
    cy.matchImageSnapshot();
  });
});