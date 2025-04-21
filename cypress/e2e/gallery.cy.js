// cypress/e2e/gallery.cy.js
describe('Gallery Component Visual Tests', () => {
  const mockGalleryData = [
    { src: 'https://via.placeholder.com/150', alt: 'Mock Image 1', title: 'Image 1' },
    { src: 'https://via.placeholder.com/200', alt: 'Mock Image 2', title: 'Image 2' },
    { src: 'https://via.placeholder.com/250', alt: 'Mock Image 3', title: 'Image 3' },
  ];

  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('should render all images in the gallery', () => {
    cy.window().then((win) => {
        win.mockGalleryData = mockGalleryData
    });
    cy.mount(
        <div style={{padding: "100px"}}>
        <div id="root"></div>
        </div>
    );
    cy.get('div').then(el => {
      el.append('<script>'+`
        const galleryData = window.mockGalleryData;
        import React from \'react\';
        import { createRoot } from 'react-dom/client';
        import Gallery from '../../components/Gallery';

        const root = createRoot(document.getElementById('root'));
        root.render(<Gallery data={galleryData} />);
      `+'</script>')
    })
    cy.get('[data-testid="gallery-image"]').should('have.length', mockGalleryData.length);
    cy.get('[data-testid="gallery-image"]').each(($img, index) => {
      cy.wrap($img).should('be.visible');
      cy.wrap($img).should('have.attr', 'src', mockGalleryData[index].src);
      cy.wrap($img).should('have.attr', 'alt', mockGalleryData[index].alt);
    });
  });

  it('should render all text associated with each image', () => {
    cy.window().then((win) => {
        win.mockGalleryData = mockGalleryData
    });
    cy.mount(
        <div style={{padding: "100px"}}>
        <div id="root"></div>
        </div>
    );
    cy.get('div').then(el => {
      el.append('<script>'+`
        const galleryData = window.mockGalleryData;
        import React from \'react\';
        import { createRoot } from 'react-dom/client';
        import Gallery from '../../components/Gallery';

        const root = createRoot(document.getElementById('root'));
        root.render(<Gallery data={galleryData} />);
      `+'</script>')
    })
    cy.get('[data-testid="gallery-text"]').should('have.length', mockGalleryData.length);
    cy.get('[data-testid="gallery-text"]').each(($text, index) => {
      cy.wrap($text).should('be.visible');
      cy.wrap($text).should('contain', mockGalleryData[index].title);
    });
  });

  it('should handle empty gallery data', () => {
    cy.window().then((win) => {
        win.mockGalleryData = []
    });
    cy.mount(
        <div style={{padding: "100px"}}>
        <div id="root"></div>
        </div>
    );
    cy.get('div').then(el => {
      el.append('<script>'+`
        const galleryData = window.mockGalleryData;
        import React from \'react\';
        import { createRoot } from 'react-dom/client';
        import Gallery from '../../components/Gallery';

        const root = createRoot(document.getElementById('root'));
        root.render(<Gallery data={galleryData} />);
      `+'</script>')
    })
    cy.get('[data-testid="gallery-image"]').should('not.exist');
    cy.get('[data-testid="gallery-text"]').should('not.exist');
  });
});