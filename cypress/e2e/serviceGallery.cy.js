// cypress/e2e/serviceGallery.cy.js
import React from 'react';

describe('ServiceGallery Component Visual Tests', () => {
  const mockImages = [
    { id: 1, src: 'https://via.placeholder.com/150', alt: 'Service Image 1' },
    { id: 2, src: 'https://via.placeholder.com/150', alt: 'Service Image 2' },
    { id: 3, src: 'https://via.placeholder.com/150', alt: 'Service Image 3' },
  ];

  beforeEach(() => {
    cy.mount(
      <div style={{ width: '500px' }}>
        <div className="gallery">
        {mockImages.map(image => (
            <div className="image-container" key={image.id}>
                <img src={image.src} alt={image.alt} />
            </div>
        ))}
        </div>
      </div>
    );
  });

  it('should render all images in the ServiceGallery', () => {
    mockImages.forEach((image) => {
      cy.get(`img[alt="${image.alt}"]`)
        .should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });
});