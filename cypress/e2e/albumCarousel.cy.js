describe('AlbumCarousel Component Visual Tests', () => {
  const mockData = [
    { url: 'https://via.placeholder.com/150', title: 'Image 1' },
    { url: 'https://via.placeholder.com/150', title: 'Image 2' },
    { url: 'https://via.placeholder.com/150', title: 'Image 3' },
    { url: 'https://via.placeholder.com/150', title: 'Image 4' },
  ];

  beforeEach(() => {
    cy.visit('http://localhost:3000/test'); // Assuming you have a route to render this component
  });

  it('should render all images', () => {
    cy.mount(
        <div style={{ width: '800px', height: '600px' }}>
        <AlbumCarousel images={mockData} />
        </div>
    );
    cy.get('[data-testid="album-carousel-container"]').should('be.visible');
    mockData.forEach((_, index) => {
      cy.get(`[data-testid="album-carousel-image-${index}"]`).should('be.visible');
    });
  });

  it('should render all icons', () => {
    cy.mount(
        <div style={{ width: '800px', height: '600px' }}>
        <AlbumCarousel images={mockData} />
        </div>
    );
    cy.get('[data-testid="play-icon"]').should('be.visible');
    cy.get('[data-testid="pause-icon"]').should('be.visible');
    cy.get('[data-testid="restart-icon"]').should('be.visible');
  });

  it('should play and pause the carousel', () => {
    cy.mount(
        <div style={{ width: '800px', height: '600px' }}>
        <AlbumCarousel images={mockData} />
        </div>
    );
    cy.get('[data-testid="play-icon"]').click();
    cy.wait(2000);
    cy.get('[data-testid="pause-icon"]').click();
  });

  it('should restart the carousel', () => {
    cy.mount(
        <div style={{ width: '800px', height: '600px' }}>
        <AlbumCarousel images={mockData} />
        </div>
    );
    cy.get('[data-testid="play-icon"]').click();
    cy.wait(3000);
    cy.get('[data-testid="restart-icon"]').click();
    cy.wait(1000);
  });
});