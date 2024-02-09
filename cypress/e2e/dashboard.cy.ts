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
        cy.intercept('GET', '/api/users?page=1').as('getUsers');
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
        cy.wait('@getUsers').then(interception => {
            expect(interception?.response?.statusCode).to.equal(200);
        });
      });

      it('open Create Modal and fill and check if table now has 7 rows', () => {
        cy.intercept('POST', '/api/users').as('createUser');
        cy.visit('/dashboard');
        cy.get('.list-users').should('exist');
        cy.get('.list-user-row').should('have.length', 6);
        cy.get('.list-user-row').first().click();
        cy.get('.create-btn').click();
        cy.get('#first_name').type('teste');
        cy.get('#last_name').type('teste');
        cy.get('#email').type('teste');
        cy.get('.relative > .text-sm').contains('Invalid email format');
        cy.get('.save-modal-btn').should('be.disabled');
        cy.get('#email').clear().type('teste@test.com');
        cy.get('.save-modal-btn').should('be.enabled');
        cy.intercept('POST', '/api/users').as('createUser');
        cy.get('.save-modal-btn').click();
        cy.wait('@createUser').then(interception => {
            expect(interception?.response?.statusCode).to.equal(201);
        });
        cy.get('.list-user-row').should('have.length', 7);
    });

      it('open Edit Modal and fill and check if table now has the changed data', () => {
        cy.intercept('PUT', '/api/users/1').as('updateUser');
        cy.visit('/dashboard');
        cy.wait(2000);
        cy.get('.list-user-row').first().click();
        cy.get('.edit-btn').should('be.enabled');
        cy.get('.edit-btn').click();
        cy.get('#first_name').clear().type("teste")
        cy.get('#last_name').clear().type("teste")
        cy.get('#email').clear().type("teste@email.com")
        cy.get('.save-modal-btn').should("be.enabled");
        cy.get('.save-modal-btn').click();
        cy.wait('@updateUser').then(interception => {
            expect(interception?.response?.statusCode).to.equal(200);
        });
        cy.get(':nth-child(1) > .user-first-name').should("contain", "teste");
        cy.get(':nth-child(1) > .user-last-name').should("contain", "teste");
        cy.get(':nth-child(1) > .user-email').should("contain", "teste@email.com");
      });

      it('open Delete Modal', () => {
        cy.intercept('DELETE', '/api/users/1').as('deleteUser');
        cy.visit('/dashboard');
        cy.wait(2000);
        cy.get('.list-user-row').first().click();
        cy.get('.delete-btn').should('be.enabled');
        cy.get('.delete-btn').click();
        cy.get('.delete-modal-btn').should("be.enabled");
        cy.get('.delete-modal-btn').click();
        cy.wait('@deleteUser').then(interception => {
            expect(interception?.response?.statusCode).to.equal(204);
        });
        cy.get('.list-user-row').should('have.length', 5);
      });

      it('pagination', () => {
        cy.intercept('GET', '/api/users?page=2').as('getPageSecond');
        cy.intercept('GET', '/api/users?page=1').as('getPageFirst');
        cy.visit('/dashboard');
        cy.get('.page-number-2').click();
       
        cy.wait('@getPageSecond').then(interception => {
            expect(interception?.response?.statusCode).to.equal(200);
        });
        cy.get('.list-users').should('exist');
        cy.get('.list-user-row').should('have.length', 6);
        cy.get('.page-number-1').click();
       
        cy.wait('@getPageFirst').then(interception => {
            expect(interception?.response?.statusCode).to.equal(200);
        });
        cy.get('.list-users').should('exist');
        cy.get('.list-user-row').should('have.length', 6);
      });
  });
  