describe('ServicePagePreview Component Visual Tests', () => {
  const mockData = {
    title: 'Mock Service',
    description: 'This is a mock description for the service.',
    imageUrl: 'https://via.placeholder.com/150',
  };

  it('renders the component with correct title, description, and image', () => {
    cy.mount(
      `<div style="width: 500px;">
            <div class="preview_previewContainer__T2wV6">
                <div class="preview_imageContainer__lXoJq">
                    <img alt="${mockData.title}" src="${mockData.imageUrl}" class="preview_image__eF9iZ" />
                </div>
                <div class="preview_titleContainer__B3Xy7">
                    <div>
                        <div class="preview_title__pM04G">${mockData.title}</div>
                        <div class="preview_description__L5v6W">${mockData.description}</div>
                    </div>
                </div>
            </div>
        </div>`
    );

    cy.get('.preview_previewContainer__T2wV6').should('be.visible');
    cy.get('.preview_image__eF9iZ')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    cy.get('.preview_title__pM04G').should('be.visible').and('contain.text', mockData.title);
    cy.get('.preview_description__L5v6W').should('be.visible').and('contain.text', mockData.description);
    cy.matchImageSnapshot();
  });

  it('renders correctly with empty data', () => {
    cy.mount(`<div style="width: 500px;"><div class="preview_previewContainer__T2wV6"></div></div>`);

    cy.get('.preview_previewContainer__T2wV6').should('be.visible');
    cy.matchImageSnapshot();
  });

  it('renders correctly without image', () => {
    cy.mount(
      `<div style="width: 500px;">
            <div class="preview_previewContainer__T2wV6">
                <div class="preview_titleContainer__B3Xy7">
                    <div>
                        <div class="preview_title__pM04G">${mockData.title}</div>
                        <div class="preview_description__L5v6W">${mockData.description}</div>
                    </div>
                </div>
            </div>
        </div>`
    );
    cy.get('.preview_title__pM04G').should('be.visible').and('contain.text', mockData.title);
    cy.get('.preview_description__L5v6W').should('be.visible').and('contain.text', mockData.description);
    cy.matchImageSnapshot();
  });

  it('renders correctly without title', () => {
    cy.mount(
      `<div style="width: 500px;">
            <div class="preview_previewContainer__T2wV6">
                <div class="preview_imageContainer__lXoJq">
                    <img alt="${mockData.title}" src="${mockData.imageUrl}" class="preview_image__eF9iZ" />
                </div>
                <div class="preview_titleContainer__B3Xy7">
                    <div>
                        <div class="preview_description__L5v6W">${mockData.description}</div>
                    </div>
                </div>
            </div>
        </div>`
    );
    cy.get('.preview_image__eF9iZ')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    cy.get('.preview_description__L5v6W').should('be.visible').and('contain.text', mockData.description);
    cy.matchImageSnapshot();
  });

  it('renders correctly without description', () => {
    cy.mount(
      `<div style="width: 500px;">
            <div class="preview_previewContainer__T2wV6">
                <div class="preview_imageContainer__lXoJq">
                    <img alt="${mockData.title}" src="${mockData.imageUrl}" class="preview_image__eF9iZ" />
                </div>
                <div class="preview_titleContainer__B3Xy7">
                    <div>
                        <div class="preview_title__pM04G">${mockData.title}</div>
                    </div>
                </div>
            </div>
        </div>`
    );
    cy.get('.preview_image__eF9iZ')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    cy.get('.preview_title__pM04G').should('be.visible').and('contain.text', mockData.title);
    cy.matchImageSnapshot();
  });
});