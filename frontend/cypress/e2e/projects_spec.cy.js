describe('Project Management Page', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'fakeToken');
      cy.setCookie('role', 'CSM');
      cy.intercept('GET', '/projects/', { fixture: 'projects.json' }).as('getProjectRequests');
    //   cy.intercept('DELETE', '/projects/*', {}).as('deleteProjectRequest');
      cy.visit('http://localhost:5173/user/projects'); // Adjust URL as needed
    });
  
    it('displays project requests correctly', () => {
      cy.wait('@getProjectRequests');
      cy.get('[data-cy=project-requests-list]').should('be.visible');
      cy.get('[data-cy=project-request-item]').should('be.visible');
    });
  });
  