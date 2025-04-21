describe('Header Component Visual Tests', () => {
  const mockHeaderData = {
    logoSrc: '/images/mock-logo.png',
    headerText: 'Mock Header Text',
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
    cy.intercept('/api/get-home-data', {
      statusCode: 200,
      body: {
        header: mockHeaderData,
      },
    }).as('getHomeData');

    cy.wait('@getHomeData'); 
  });

  it('should display the header text correctly', () => {
    cy.get('header').should('be.visible');
    cy.get('header').contains(mockHeaderData.headerText);
    cy.matchImageSnapshot('header-text-rendered')
  });

  it('should display the logo correctly', () => {
    cy.get('header img').should('be.visible');
    cy.get('header img').should('have.attr', 'src').and('include', mockHeaderData.logoSrc);
    cy.matchImageSnapshot('header-logo-rendered')
  });
});