// cypress/e2e/About.cy.js
describe('About Component Visual Tests', () => {
  const mockedServiceThumbnails = [
    { url: 'https://via.placeholder.com/150', tags: ['Service 1', 'pin1'] },
    { url: 'https://via.placeholder.com/150', tags: ['Service 2', 'pin2'] },
    { url: 'https://via.placeholder.com/150', tags: ['Service 3', 'pin3'] },
    { url: 'https://via.placeholder.com/150', tags: ['Service 4', 'pin4'] },
    { url: 'https://via.placeholder.com/150', tags: ['Service 5', 'pin5'] },
    { url: 'https://via.placeholder.com/150', tags: ['Service 6', 'pin6'] },
    { url: 'https://via.placeholder.com/150', tags: ['Service 7', 'pin7'] },
    { url: 'https://via.placeholder.com/150', tags: ['Service 8', 'pin8'] },
  ];

  beforeEach(() => {
    cy.mount(
        <div style={{ width: '100%', height: '100vh' }}>
          <About servicethumbnails={mockedServiceThumbnails} />
        </div>
    );
  });

  it('should render all texts correctly', () => {
    cy.contains('Capturing moments').should('be.visible');
    cy.contains('We understand the importance of preserving memories').should('be.visible');
  });

  it('should render all images in the carousel', () => {
    mockedServiceThumbnails.forEach((service) => {
      cy.get(`[style*="url('${service.url}')"]`).should('be.visible');
    });
  });

  it('should navigate to service page when clicking on a tile', () => {
    const firstService = mockedServiceThumbnails[0];
    cy.get(`[style*="url('${firstService.url}')"]`).parent().click();
    cy.window().then((win) => {
      expect(win.location.href).to.include(`/services/${firstService.tags[1].toLowerCase()}`);
    });
    
  });
  it('should display the correct title on each tile', () => {
      mockedServiceThumbnails.forEach((service) => {
          cy.get(`[style*="url('${service.url}')"]`)
              .parent()
              .find('div div')
              .should('contain', service.tags[0]);
      });
  });
  it('should render multiple tiles in the carousel', () => {
    cy.get('.tileContainer').should('have.length.greaterThan', 0);
    cy.get('[style*="url(\'https://via.placeholder.com/150\')"]').should('have.length.greaterThan', 0);
  });
});