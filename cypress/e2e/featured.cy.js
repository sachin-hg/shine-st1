describe('Featured Component Visual Tests', () => {
  const mockFeaturedData = [
    {
      img: '/images/featured/ifp.png',
      alt: 'IFP Award',
    },
    {
      img: '/images/featured/junebug.png',
      alt: 'Junebug Weddings',
    },
    {
      img: '/images/featured/llf.png',
      alt: 'Love Is For Life',
    },
    {
      img: '/images/featured/risingStar.png',
      alt: 'Rising Star',
    },
    {
      img: '/images/featured/tnl.png',
      alt: 'The Knot Lux',
    },
    {
      img: '/images/featured/wedmegood.webp',
      alt: 'Wedmegood',
    },
  ];

  beforeEach(() => {
    cy.mount(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Featured featured={mockFeaturedData} />
      </div>
    );
  });

  it('should render all images', () => {
    mockFeaturedData.forEach((item, index) => {
      cy.get(`img[alt="${item.alt}"]`).should('be.visible');
    });
  });

  it('should have the correct number of images', () => {
    cy.get('img').should('have.length', mockFeaturedData.length);
  });
});
import React from 'react';
import Featured from '../../components/Featured';