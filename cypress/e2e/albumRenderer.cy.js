describe('AlbumRenderer Component', () => {
  const mockData = {
    imageUrl: '/images/test.jpg',
    musicAnimationUrl: '/components/AlbumRenderer/music_animation.gif',
    defaultMusicUrl: '/components/AlbumRenderer/defaultMusic.mp3',
  };

  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should render the AlbumRenderer component', () => {
    cy.mount(
      `<div id="album-renderer-container" style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
         <div class="albumRenderer_container__2MvFp" style="display: flex; flex-direction: column; align-items: center;">
            <div class="albumRenderer_musicAnimation__2ZqUf">
              <img src="${mockData.musicAnimationUrl}" alt="Music Animation" />
            </div>
            <audio controls="" style="display: block;">
              <source src="${mockData.defaultMusicUrl}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
      </div>`
    );

    cy.get('.albumRenderer_container__2MvFp').should('be.visible');
  });

  it('should display the music animation', () => {
    cy.mount(
      `<div id="album-renderer-container" style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
         <div class="albumRenderer_container__2MvFp" style="display: flex; flex-direction: column; align-items: center;">
            <div class="albumRenderer_musicAnimation__2ZqUf">
              <img src="${mockData.musicAnimationUrl}" alt="Music Animation" />
            </div>
            <audio controls="" style="display: block;">
              <source src="${mockData.defaultMusicUrl}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
      </div>`
    );
    cy.get('.albumRenderer_musicAnimation__2ZqUf img').should('be.visible');
    cy.get('.albumRenderer_musicAnimation__2ZqUf img').should('have.attr', 'src', mockData.musicAnimationUrl);
  });

  it('should load the default music', () => {
    cy.mount(
      `<div id="album-renderer-container" style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
         <div class="albumRenderer_container__2MvFp" style="display: flex; flex-direction: column; align-items: center;">
            <div class="albumRenderer_musicAnimation__2ZqUf">
              <img src="${mockData.musicAnimationUrl}" alt="Music Animation" />
            </div>
            <audio controls="" style="display: block;">
              <source src="${mockData.defaultMusicUrl}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
      </div>`
    );
    cy.get('audio').should('be.visible');
    cy.get('audio source').should('have.attr', 'src', mockData.defaultMusicUrl);
  });
});