// cypress/e2e/underConstruction.cy.js
describe('UnderConstruction Component Visual Tests', () => {
  const mockData = {
    title: 'Under Construction',
    description: 'We are currently working on this page. Please check back later.',
    imageAlt: 'Under Construction Image',
    imageUrl: '/components/UnderConstruction/bg.webp', 
  };

  beforeEach(() => {
    cy.visit('/under-construction', {
        onBeforeLoad(win) {
            win.mockData = mockData;
        }
    }); 
  });

  it('should display the correct title', () => {
    cy.contains(mockData.title).should('be.visible');
  });

  it('should display the correct description', () => {
    cy.contains(mockData.description).should('be.visible');
  });

  it('should display the correct image', () => {
    cy.get(`img[alt="${mockData.imageAlt}"]`)
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('should have the correct image source', () => {
      cy.get(`img[alt="${mockData.imageAlt}"]`).should('have.attr', 'src', mockData.imageUrl);
  });
});