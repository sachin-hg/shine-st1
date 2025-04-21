describe('AlbumsInput Component Visual Tests', () => {
  const mockData = {
    text: 'Test Albums Input',
    imageUrl: '/path/to/mock/image.jpg', // Replace with a valid image path or URL for testing
  };

  it('should render the text correctly', () => {
    cy.mount(
      <div>
      </div>
    );
    cy.get('.albumsInput').should('exist');
    cy.get('.albumsInput > div').should('contain', mockData.text);

  });

  it('should render the image correctly', () => {
    cy.mount(
      <div>
        <div style={{ width: '100px', height: '100px', backgroundColor:'gray'}}></div>
      </div>
    );

    cy.get('.albumsInput > img').should('be.visible');
    cy.get('.albumsInput img').should('have.attr', 'src', mockData.imageUrl);
  });
});