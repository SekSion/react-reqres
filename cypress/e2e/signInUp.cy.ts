/// <reference types="cypress" />
describe('Rendering HomePage', () => {
  it('should visit and redirect to /sign-up', () => {
    cy.visit('/');
    
    cy.url().should('include', '/sign-up');
  });
});

describe('Testing Fallback url', () => {
  it('should visit and redirect to /sign-up', () => {
    cy.visit('/testing-wrong-url');
    
    cy.url().should('include', '/sign-up');
  });
});

describe('Test Dark Mode Switch', () => {
  it('Should switch to dark mode', () => {
    cy.visit('/');
    cy.get('.themeswitcher').click();
    cy.get('html').should('have.class', 'dark');
    cy.window().its('localStorage').invoke('getItem', 'darkMode').should('eq', 'true');
  });
});

describe('Test Dark Mode Persistence', () => {
  beforeEach(() => {
    cy.window().its('localStorage').invoke('setItem', 'darkMode', 'true');
  });

  it('Should stay dark after reloading the page', () => {
    cy.visit('/');
    cy.get('html').should('have.class', 'dark');
    cy.window().its('localStorage').invoke('getItem', 'darkMode').should('eq', 'true');
    cy.get('.themeswitcher').click();
    cy.window().its('localStorage').invoke('getItem', 'darkMode').should('eq', 'false');

  });
});

describe('Test Dark Mode To Light Mode', () => {
  beforeEach(() => {
    cy.window().its('localStorage').invoke('setItem', 'darkMode', 'true');
  });

  it('Should stay dark after reloading the page', () => {
    cy.visit('/');

    cy.get('.themeswitcher').click();
    cy.window().its('localStorage').invoke('getItem', 'darkMode').should('eq', 'false');

  });
});

describe('Test page switch', () => {
  it('Should change between signup and signin page', () => {
    cy.visit('/');
    cy.url().should('include', '/sign-up');
    cy.get('.sign-in-link').click()
    cy.url().should('include', '/sign-in');
    cy.get('#repeatPassword').should('not.exist');
    cy.get('.sign-up-link').click()
    cy.url().should('include', '/sign-up');
    cy.get('#repeatPassword').should('exist');
  });
});

describe('Form Validation Sign up', () => {
  it('should only enable the button when the form is valid', () => {
    cy.visit('/sign-up');
    cy.url().should('include', '/sign-up');
    cy.get('.sign-up-btn').should('be.disabled');
    // --
    cy.get('#email').type('invalidemail');
    cy.get('#password').type('password');
    cy.get('#repeatPassword').type('password');
    cy.get('.sign-up-btn').should('be.disabled');
     // --
    cy.get('#email').clear().type('valid@email.com');
    cy.get('#password').clear();
    cy.get('.sign-up-btn').should('be.disabled');
    // --
    cy.get('.password-error-message').contains('Password is required');    
    cy.get('#password').type('password');
    cy.get('#repeatPassword').clear();
    cy.get('.repeat-password-error-message').contains('Repeat Password is required');
    cy.get('.sign-up-btn').should('be.disabled');
    // --
    cy.get('#repeatPassword').type("wrongpassword");
    cy.get('.repeat-password-error-message').contains('Passwords do not match');
    cy.get('.sign-up-btn').should('be.disabled');
    cy.get('#repeatPassword').clear();
    cy.get('#repeatPassword').type("password");
    cy.get('.sign-up-btn').should('not.be.disabled');
    cy.get('.sign-up-btn').click()
  });
});

describe('Sign Up', () => {
  it('Sign Up Form', () => {
    cy.visit('/sign-up');
    cy.url().should('include', '/sign-up');
    cy.get('.sign-up-btn').should('be.disabled');
    cy.get('#email').type('eve.holt@reqres.in');
    cy.get('#password').type('password');
    cy.get('#repeatPassword').type('password');
    cy.get('.sign-up-btn').should('not.be.disabled');
    cy.get('.sign-up-btn').click();
    cy.wait(2000); 
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'authDataRegister')
      .then((authDataRegister: string | null) => {
        if (authDataRegister) {
          const authData = JSON.parse(authDataRegister);
          expect(authData).to.have.property('id');
          expect(authData).to.have.property('token');
          expect(authData.id).to.exist;
          expect(authData.token).to.exist;
          cy.url().should('include', '/sign-in');
        } else {
          throw new Error('authDataRegister is null or undefined');
        }
      });
  });
});

describe('Form Validation Sign in Should Faild', () => {
  it('should only enable the button when the form is valid', () => {
    cy.visit('/sign-in');
    cy.url().should('include', '/sign-in');
    cy.get('.sign-in-btn').should('be.disabled');
    // --
    cy.get('#email').type('invalidemail');
    cy.get('#password').type('password');
    cy.get('.sign-in-btn').should('be.disabled');
     // --
    cy.get('#email').clear().type('valid@email.com');
    cy.get('#password').clear();
    cy.get('.sign-in-btn').should('be.disabled');
    // --
    cy.get('.password-error-message').contains('Password is required');    
    cy.get('#password').type('password');
    cy.get('.sign-in-btn').should('not.be.disabled');
    cy.get('.sign-in-btn').click()
    cy.wait(2000); 
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'authData')
      .then((authDataRegister: string | null) => {
        if (authDataRegister) {
          const authData = JSON.parse(authDataRegister);
          expect(authData).to.have.property('id');
          expect(authData).to.have.property('token');
          expect(authData.id).to.exist;
          expect(authData.token).to.exist;
          cy.url().should('include', '/dashboard');
        } else {
         expect(authDataRegister).to.not.exist;
        }
      });
  });
});

describe('Form Validation Sign in Should Pass', () => {
  it('Sign In should proceed', () => {
    cy.visit('/sign-in');
    cy.url().should('include', '/sign-in');
    cy.get('.sign-in-btn').should('be.disabled');
    // --
    cy.get('#email').type('invalidemail');
    cy.get('#password').type('password');
    cy.get('.sign-in-btn').should('be.disabled');
     // --
    cy.get('#email').clear().type('eve.holt@reqres.in');
    cy.get('#password').clear();
    cy.get('.sign-in-btn').should('be.disabled');
    // --
    cy.get('.password-error-message').contains('Password is required');    
    cy.get('#password').type('password');
    cy.get('.sign-in-btn').should('not.be.disabled');
    cy.get('.sign-in-btn').click()
    cy.wait(2000); 
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'authData')
      .then((authDataRegister: string | null) => {
        if (authDataRegister) {
          const authData = JSON.parse(authDataRegister);
          expect(authData).to.have.property('email');
          expect(authData).to.have.property('first_name');
          expect(authData).to.have.property('token');
          expect(authData.email).to.exist;
          expect(authData.first_name).to.exist;
          expect(authData.token).to.exist;
          cy.url().should('include', '/dashboard');
        } else {
         expect(authDataRegister).to.not.exist;
        }
      });
  });
});







