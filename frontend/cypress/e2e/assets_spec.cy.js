  describe('Assets Management Page', () => {
      beforeEach(() => {
        cy.setCookie('accessToken', 'fakeToken'); // if authentication is required
        cy.setCookie('role', 'CSM');
        cy.intercept('GET', '/assets/', { fixture: 'assetsData.json' }).as('getAssets');
          // cy.intercept('POST', '/assets/', {}).as('addAsset');
          // cy.intercept('PUT', '/assets/*', {}).as('updateAsset');
          // cy.intercept('DELETE', '/assets/*', {}).as('deleteAsset');
        cy.visit('http://localhost:5173/user/assets'); // Adjust URL as needed
      });
    
      it('displays assets correctly', () => {
        cy.wait('@getAssets');
        cy.get('[data-cy=assets-list]').should('be.visible');
        cy.get('[data-cy=asset-item]').should('have.length', /* expected number of assets */);
      });
    
      // it('allows adding an asset', () => {
      //   cy.get('[data-cy=add-asset-btn]').click();
      //   // Fill in the form fields and submit
      //   cy.get('[data-cy=asset-form]').submit(); // Make sure to add appropriate data-cy attributes in your React components
      //   // Assert that a new asset appears in the list
      // });
    
    
    });
    