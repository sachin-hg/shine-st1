describe('Modal Component Visual Tests', () => {
  const mockModalData = {
    title: 'Test Modal',
    content: 'This is a test modal content.',
  };

  beforeEach(() => {
    cy.mount(
      <div id="modal-root">
          </div>
    );
  });

  it('renders the modal with correct content', () => {
    cy.window().then((win) => {
      win.document.body.innerHTML += `
        <div id="modal-root"></div>
      `;
    });

    cy.mount(
      <div id="modal-container">
          <Modal
              title={mockModalData.title}
              isOpen={true}
              content={mockModalData.content}
              onClose={() => {}}
          />
      </div>,
    );
    
    cy.get('[data-testid="modal-container"]').should('be.visible');
    cy.get('[data-testid="modal-title"]').should('contain.text', mockModalData.title);
    cy.get('[data-testid="modal-content"]').should('contain.text', mockModalData.content);
    cy.get('[data-testid="modal-close-button"]').should('be.visible');
  });

  it('closes the modal when the close button is clicked', () => {
    let onCloseCalled = false;

    cy.mount(
      <div id="modal-container">
          <Modal
              title={mockModalData.title}
              isOpen={true}
              content={mockModalData.content}
              onClose={() => {
                  onCloseCalled = true;
              }}
          />
      </div>
    );

    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="modal-container"]').should('not.exist');
    
  });
});