// cypress/e2e/searchInput.cy.js
import React from 'react';
import SearchInput from '../../components/SearchInput';
import { mount } from 'cypress/react';

const mockSearchInputData = {
  placeholder: 'Search for albums...',
};

describe('SearchInput Component - Visual Tests', () => {
  it('should render correctly with mocked data', () => {
    mount(<SearchInput {...mockSearchInputData} />);

    cy.get('[data-cy="search-input"]').should('be.visible');
    cy.get('[data-cy="search-input"]').should('have.attr', 'placeholder', mockSearchInputData.placeholder);
    cy.get('[data-cy="search-animation"]').should('be.visible');
    cy.get('input').should('be.visible');
    cy.get('[data-cy="search-container"]').should('be.visible');
    
    cy.contains(mockSearchInputData.placeholder).should('be.visible')

    cy.matchImageSnapshot();
  });

  it('should render correctly the music animation', () => {
    mount(<SearchInput {...mockSearchInputData} />);
    cy.get('[data-cy="search-animation"]').should('be.visible');
    cy.get('[data-cy="search-animation"]').should('have.attr', 'src').and('include', 'music_animation.gif');
  });

  it('should render correctly the text', () => {
    mount(<SearchInput {...mockSearchInputData} />);
    cy.get('[data-cy="search-input"]').should('have.attr', 'placeholder', mockSearchInputData.placeholder);
  });
});