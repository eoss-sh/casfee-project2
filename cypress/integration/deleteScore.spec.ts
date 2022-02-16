describe("Delete Score", () => {
  it("login and Delete the only score added by the add Score test", () => {
    cy.login("testuser@birdiebook.app", "test1234");
    cy.visit("http://localhost:3000/scores");
    cy.get('[data-test="delete-score-0"]').click();
    cy.get('[data-test="confirm"]').click();
    cy.get(".empty-title").should("contain", "Hier sieht es ziemlich leer aus");
  });
});
