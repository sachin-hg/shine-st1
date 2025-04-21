// cypress/e2e/scrollSeek.cy.js
describe('ScrollSeek Component Visual Tests', () => {
  const mockFrames = Array.from({ length: 94 }, (_, i) => ({
    src: `/mock-frames/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.png`,
    alt: `Frame ${i + 1}`,
  }));

  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Adjust URL if needed
  });

  it('renders all frames correctly', () => {
    cy.intercept('GET', '/mock-frames/*', { statusCode: 200, body: '' }); // Mock all images

    cy.window().then((win) => {
      win.mockScrollSeekFrames = mockFrames;
      win.eval(`
        const container = document.createElement('div');
        container.id = 'scroll-seek-container';
        document.body.appendChild(container);
        require('/components/ScrollSeek/index.js').then((module) => {
          const ScrollSeek = module.default;
          ReactDOM.render(React.createElement(ScrollSeek, {
            frames: window.mockScrollSeekFrames
          }), container);
        });
      `);
    });

    cy.get('#scroll-seek-container')
      .should('be.visible');

    mockFrames.forEach((frame, index) => {
      cy.get(`#scroll-seek-container img[alt="Frame ${index + 1}"]`)
      .should('be.visible')
    });
  });
});