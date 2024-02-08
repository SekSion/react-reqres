/// <reference types="cypress" />
describe('Rendering Dashboard', () => {
    beforeEach(() => {
      cy.window().its('localStorage').invoke('setItem', 'authData', JSON.stringify({ email: 'eve.holt@reqres.in', token: 'QpwL5tke4Pnpja7X4', first_name: 'Eve' }));
    });
  
    it('should visit and redirect to /dashboard because it contains the authData', () => {
      cy.visit('/');
      cy.url().should('include', '/dashboard');
    });

    it('should logout', () => {
        cy.visit('/dashboard');
        cy.get('.logout-btn').click();
        cy.url().should('include', '/sign-in');
      
        cy.window().its('localStorage').invoke('getItem', 'authData').should('be.null');
      });

      it('Should switch to dark mode', () => {
        cy.visit('/');
        cy.get('.themeswitcher').click();
        cy.get('html').should('have.class', 'dark');
        cy.window().its('localStorage').invoke('getItem', 'darkMode').should('eq', 'true');
      });

      it('check if table is rendered with 6 rows and buttons disableness are correct before and after selecting user', () => {
        cy.visit('/dashboard');
        cy.get('.create-btn').should('be.enabled');
        cy.get('.edit-btn').should('be.disabled');
        cy.get('.delete-btn').should('be.disabled');
        cy.get('.list-users').should('exist');
        cy.get('.list-user-row').should('have.length', 6);
        cy.get('.list-user-row').first().click();
        cy.get('.create-btn').should('be.enabled');
        cy.get('.edit-btn').should('be.enabled');
        cy.get('.delete-btn').should('be.enabled');
      });

      it.only('open Create Modal and fill and check if table now has 7 rows', () => {
        cy.visit('/dashboard');
        cy.get('.list-users').should('exist');
        cy.get('.list-user-row').should('have.length', 6);
        cy.get('.list-user-row').first().click();
        cy.get('.create-btn').click();
        cy.get('#first_name').type("teste")
        cy.get('#last_name').type("teste")
        cy.get('#email').type("teste")
        cy.get('.relative > .text-sm').contains('Invalid email format');
        cy.get('.save-modal-btn').should("be.disabled");
        cy.get('#email').clear().type("teste@test.com");
        cy.get('.save-modal-btn').should("be.enabled");
        cy.get('.save-modal-btn').click();
        cy.wait(2000);
        cy.get('.list-user-row').should('have.length', 7);
      });
      
  });
  