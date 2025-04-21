// cypress/e2e/carouselmage.cy.js
describe('Carouselmage Component Visual Tests', () => {
  const mockImages = [
    { src: 'https://via.placeholder.com/150', alt: 'Mock Image 1' },
    { src: 'https://via.placeholder.com/200', alt: 'Mock Image 2' },
    { src: 'https://via.placeholder.com/250', alt: 'Mock Image 3' },
  ];

  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Replace with your app's URL if needed
  });

  it('should render all carousel images', () => {
    cy.intercept('GET', '/api/get-home-data', {
      statusCode: 200,
      body: {
        carouselImages: mockImages,
      },
    });
    cy.get('[data-testid="carouselImage"]').should('be.visible');
    cy.get('[data-testid="carouselImage"] img').should('have.length', mockImages.length);

    mockImages.forEach((image, index) => {
      cy.get(`[data-testid="carouselImage"] img`)
        .eq(index)
        .should('have.attr', 'src', image.src)
        .and('be.visible')
        .and('have.attr', 'alt', image.alt);
    });
  });

  it('should handle no images', () => {
    cy.intercept('GET', '/api/get-home-data', {
        statusCode: 200,
        body: {
          carouselImages: [],
        },
      });
    cy.get('[data-testid="carouselImage"]').should('not.exist');
  });
});