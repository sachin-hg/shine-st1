describe('AlbumCarousel2 Component', () => {
  const mockData = [
    { src: '/images/image1.jpg', alt: 'Image 1' },
    { src: '/images/image2.jpg', alt: 'Image 2' },
    { src: '/images/image3.jpg', alt: 'Image 3' },
  ];

  beforeEach(() => {
    cy.visit('/path/to/your/page/containing/AlbumCarousel2'); 
  });

  it('renders all images', () => {
    cy.get('[data-testid="album-carousel-2-container"]').should('be.visible');

    mockData.forEach((item, index) => {
      cy.get(`[data-testid="album-carousel-2-image-${index}"]`)
        .should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });

  it('renders all icons', () => {
    cy.get('[data-testid="play-icon"]').should('be.visible');
    cy.get('[data-testid="pause-icon"]').should('be.visible');
    cy.get('[data-testid="restart-icon"]').should('be.visible');
    cy.get('[data-testid="fullscreen-icon"]').should('be.visible');
  });

  it('carousel plays and pauses correctly', () => {
    cy.get('[data-testid="play-icon"]').click();
    cy.wait(2000); 

    cy.get('[data-testid="pause-icon"]').click();
    cy.wait(1000);
    cy.get('[data-testid="album-carousel-2-image-0"]').should('be.visible');
  });

    it('carousel restarts correctly', () => {
    cy.get('[data-testid="play-icon"]').click();
    cy.wait(2000); 

    cy.get('[data-testid="restart-icon"]').click();
    cy.get('[data-testid="album-carousel-2-image-0"]').should('be.visible');
  });

  it('matches the snapshot', () => {
    cy.get('[data-testid="album-carousel-2-container"]').matchImageSnapshot('album-carousel2-snapshot');
  });
});