describe('AlbumPage Component Visual Tests', () => {
  const mockAlbumData = {
    title: 'Mock Album Title',
    content: [
      { text: 'Mock Content 1' },
      { text: 'Mock Content 2' },
    ],
    images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
    ]
  };

  beforeEach(() => {
    cy.mount(
        <div style={{width: '100vw'}}>
        <div style={{width: '100vw', height: '100vh', backgroundColor: 'white'}}>
        <div id={'root'} style={{width: '100vw', height: '100vh'}}></div>
        </div>
        </div>
        ,
        {
            stylesheets: ['components/AlbumPage/AlbumPage.module.css', 'app/globals.css'],
            component:  require('../../components/AlbumPage/index').default,
            props: {
                data: mockAlbumData,
            },
            mountOptions: {
                onBeforeMount: () => {
                    cy.stub(require('../../components/AlbumPage/index'), 'default').callsFake(() => {
                        return <div id="root"><div>Album Page</div></div>;
                    });
                },
            },
        })

  });

  it('should render the album title', () => {
    cy.contains(mockAlbumData.title).should('be.visible');
  });

  it('should render all album content', () => {
    mockAlbumData.content.forEach((item) => {
      cy.contains(item.text).should('be.visible');
    });
  });

  it('should render all album images', () => {
    mockAlbumData.images.forEach((imageUrl) => {
      cy.get(`img[src="${imageUrl}"]`).should('be.visible');
    });
  });
    it('should render "Album Page"', () => {
        cy.get('#root').contains('Album Page').should('be.visible');
    });
});