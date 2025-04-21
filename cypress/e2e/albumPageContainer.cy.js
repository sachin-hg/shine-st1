describe('AlbumPageContainer', () => {
  const mockAlbumData = {
    title: 'Mock Album Title',
    content: [
      { type: 'text', value: 'Mock Text Content 1' },
      { type: 'image', url: 'mock-image-url-1' },
      { type: 'text', value: 'Mock Text Content 2' },
      { type: 'image', url: 'mock-image-url-2' },
    ],
  };

  beforeEach(() => {
    cy.intercept('GET', '/api/get-album-data', { body: mockAlbumData }).as('getAlbumData');
    cy.visit('/test'); 
  });

  it('should render the album title', () => {
    cy.wait('@getAlbumData');
    cy.contains(mockAlbumData.title).should('be.visible');
  });

  it('should render text content', () => {
    cy.wait('@getAlbumData');
    mockAlbumData.content.forEach((item) => {
      if (item.type === 'text') {
        cy.contains(item.value).should('be.visible');
      }
    });
  });

  it('should render images', () => {
    cy.wait('@getAlbumData');
    mockAlbumData.content.forEach((item) => {
      if (item.type === 'image') {
        cy.get(`img[src="${item.url}"]`).should('be.visible');
      }
    });
  });
});