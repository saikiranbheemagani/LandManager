describe('User Dashboard', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'fakeToken');
    cy.setCookie('role', 'CSM');
    cy.intercept('GET', '/projects/', { fixture: 'projects.json' }).as('getProjects');
    cy.intercept('GET', '/assets/', { fixture: 'assets.json' }).as('getassets');
    cy.visit('http://localhost:5173/user/dashboard');
  });
  
  it('displays project requests', () => {
    cy.wait('@getProjects').then((interception) => {
      console.log('Projects Request:', interception);
    });
    cy.get('[data-cy=project-requests]').should('be.visible');
    // Further assertions
  });
  
  it('displays assets', () => {
    cy.wait('@getAssets').then((interception) => {
      console.log('Assets Request:', interception);
    });
    cy.get('[data-cy=assets]').should('be.visible');
    // Further assertions
  });
});
