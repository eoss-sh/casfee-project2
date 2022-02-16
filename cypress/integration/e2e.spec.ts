describe("e2e", () => {
  it("login, add, edit and delete score in one go", () => {
    cy.login("testuser@birdiebook.app", "test1234");
    cy.visit("http://localhost:3000/add-score");
    cy.get('[data-test="score-1"]').type("4");
    cy.get('[data-test="putts-1"]').type("2");
    cy.get('[data-test="score-2"]').type("5");
    cy.get('[data-test="putts-2"]').type("2");
    cy.get('[data-test="add-score-submit"]').click();
    cy.get('[data-test="confirm"]').click();
    cy.get("h1").should("contain", "Scores");
    cy.get('[data-test="get-single-score"]').click();
    cy.get('[data-test="edit-score-0"]').click();
    cy.get("#formGridScore").clear().type("10");
    cy.get('[data-test="confirm-update"]').click();
    cy.get('[data-test="score-0"]').should("contain", "10");
    cy.visit("http://localhost:3000/scores");
    cy.get('[data-test="delete-score-0"]').click();
    cy.get('[data-test="confirm"]').click();
    cy.get(".empty-title").should("contain", "Hier sieht es ziemlich leer aus");
  });
});
