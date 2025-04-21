describe('Carousel Component Visual Tests', () => {
  const mockCarouselData = [
    { id: 1, src: '/images/image1.jpg', alt: 'Image 1' },
    { id: 2, src: '/images/image2.jpg', alt: 'Image 2' },
    { id: 3, src: '/images/image3.jpg', alt: 'Image 3' },
  ];

  beforeEach(() => {
    cy.mount(
    <div>
      {mockCarouselData.map(item => (
        <div key={item.id} style={{ width: '100px', height: '100px', border: '1px solid black', margin: '10px' }}>
          <img src={item.src} alt={item.alt} style={{ width: '100%', height: '100%' }} />
        </div>
      ))}
    </div>
    );
  });

  it('renders all carousel items', () => {
    mockCarouselData.forEach((item, index) => {
        cy.get('img').eq(index).should('be.visible');
        cy.get('img').eq(index).should('have.attr', 'src', item.src);
        cy.get('img').eq(index).should('have.attr', 'alt', item.alt);
      });
  });

  it('renders carousel icons', () => {
    cy.get('img[src*="fs.png"]').should('be.visible');
    cy.get('img[src*="pause.png"]').should('be.visible');
    cy.get('img[src*="play.png"]').should('be.visible');
    cy.get('img[src*="restart.png"]').should('be.visible');
    cy.get('img[src*="thumb.png"]').should('be.visible');
  });
});