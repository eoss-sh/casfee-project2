describe("Delete Score", () => {
  it("login and Delete the only score added by the add Score test", () => {
    cy.login("testuser@birdiebook.app", "test1234");
    cy.visit("http://localhost:3000/scores");
    cy.get('[data-test="get-single-score"]').click();
    cy.get('[data-test="edit-score-0"]').click();
    cy.get("#formGridScore").clear().type("10");
    cy.get('[data-test="confirm-update"]').click();
    cy.get('[data-test="score-0"]').should("contain", "10");
  });
});
