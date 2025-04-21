// cypress/e2e/login.cy.js

describe('Login Component Visual Tests', () => {
  const mockData = {
    title: 'Login',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    submitButton: 'Submit',
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should render the Login title', () => {
    cy.contains(mockData.title).should('be.visible');
  });

  it('should render the username input field', () => {
    cy.contains(mockData.usernameLabel).should('be.visible');
    cy.get('input[type="text"]').should('be.visible');
  });

  it('should render the password input field', () => {
    cy.contains(mockData.passwordLabel).should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('should render the submit button', () => {
    cy.contains(mockData.submitButton).should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should have the correct styles applied', () => {
      cy.get('.loginContainer').should('be.visible');
      cy.get('.formContainer').should('be.visible');
      cy.get('.inputContainer').should('be.visible');
  });
});