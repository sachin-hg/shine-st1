// cypress/e2e/loader.cy.js
describe('Loader Component Visual Tests', () => {
  it('should render the loader', () => {
    cy.mount(
        <div>
            <div style={{ width: '100px', height: '100px'}}></div>
            <div style={{ width: '100px', height: '100px'}} className='loader'></div>
            <div style={{ width: '100px', height: '100px'}}></div>
        </div>
    );

    cy.get('.loader').should('be.visible');
  });
});