// cypress/e2e/preview.cy.js
describe('Preview Component Visual Tests', () => {
  const mockPreviewData = {
    title: 'Mock Preview Title',
    subtitle: 'Mock Preview Subtitle',
    images: [
      { src: 'https://via.placeholder.com/150', alt: 'Mock Image 1' },
      { src: 'https://via.placeholder.com/150', alt: 'Mock Image 2' },
      { src: 'https://via.placeholder.com/150', alt: 'Mock Image 3' },
    ],
  };

  beforeEach(() => {
    cy.mount(
        <div>
            <link rel="stylesheet" href="components/Preview/preview.module.css" />
            <link rel="stylesheet" href="app/globals.css" />
            <script type="text/javascript" src="components/Preview/PreviewImages.js"></script>
            <script type="text/javascript" src="components/Preview/PreviewTitle.js"></script>
            <script type="text/javascript" src="components/Preview/index.js"></script>
            <script type="text/javascript" src="components/Carousel/index.js"></script>
            <script type="text/javascript" src="components/Carousel/carousel.module.css"></script>
        </div>
    )
  });

  it('should render PreviewTitle correctly', () => {
    cy.window().then((win) => {
        const PreviewTitle = win.PreviewTitle;
        cy.mount(<PreviewTitle title={mockPreviewData.title} subtitle={mockPreviewData.subtitle} />);
        cy.get('[data-cy="preview-title"]').should('be.visible').and('contain', mockPreviewData.title);
        cy.get('[data-cy="preview-subtitle"]').should('be.visible').and('contain', mockPreviewData.subtitle);
        cy.get('[data-cy="preview-title"]').snapshot();
    })
  });

  it('should render PreviewImages correctly', () => {
    cy.window().then((win) => {
        const PreviewImages = win.PreviewImages;
        cy.mount(<PreviewImages images={mockPreviewData.images} />);
        mockPreviewData.images.forEach((image, index) => {
            cy.get(`[data-cy="preview-image-${index}"]`).should('be.visible');
            cy.get(`[data-cy="preview-image-${index}"]`).invoke('attr', 'src').should('eq', image.src);
            cy.get(`[data-cy="preview-image-${index}"]`).invoke('attr', 'alt').should('eq', image.alt);
        });
        cy.get('[data-cy="preview-images-container"]').snapshot();
    })
  });

  it('should render the Preview component correctly', () => {
    cy.window().then((win) => {
        const Preview = win.Preview;
        cy.mount(<Preview title={mockPreviewData.title} subtitle={mockPreviewData.subtitle} images={mockPreviewData.images}/>);
        cy.get('[data-cy="preview-title"]').should('be.visible').and('contain', mockPreviewData.title);
        cy.get('[data-cy="preview-subtitle"]').should('be.visible').and('contain', mockPreviewData.subtitle);

        mockPreviewData.images.forEach((image, index) => {
            cy.get(`[data-cy="preview-image-${index}"]`).should('be.visible');
            cy.get(`[data-cy="preview-image-${index}"]`).invoke('attr', 'src').should('eq', image.src);
            cy.get(`[data-cy="preview-image-${index}"]`).invoke('attr', 'alt').should('eq', image.alt);
        });
        cy.get('[data-cy="preview-container"]').snapshot();
    })
  });
});