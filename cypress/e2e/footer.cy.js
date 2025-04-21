describe('Footer Component Visual Tests', () => {
  const mockFooterData = {
    copyright: '© 2023 Your Company Name',
    socialLinks: [
      { href: 'https://www.youtube.com/', alt: 'YouTube', src: '/yt.png' },
      // Add more social links as needed
    ],
  };

  beforeEach(() => {
    cy.visit('/components/Footer'); // Adjust the path as needed to access the component in isolation
    cy.intercept('/api/get-home-data', {
      body: mockFooterData,
    }).as('getHomeData');
  });

  it('renders all texts correctly', () => {
    cy.wait('@getHomeData');
    cy.get('[data-cy="footer-copyright"]').should('be.visible').and('contain', mockFooterData.copyright);
  });

  it('renders all social media images', () => {
    cy.wait('@getHomeData');
    mockFooterData.socialLinks.forEach((link) => {
      cy.get(`[data-cy="footer-social-link"][href="${link.href}"] img`)
        .should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });

  it('renders all social media links', () => {
    cy.wait('@getHomeData');
    mockFooterData.socialLinks.forEach((link) => {
      cy.get(`[data-cy="footer-social-link"][href="${link.href}"]`)
        .should('be.visible')
        .and(($a) => {
        });
    });
  });

  it('takes a snapshot of the footer', () => {
    cy.wait('@getHomeData');
    cy.get('[data-cy="footer"]').matchImageSnapshot();
  });
});