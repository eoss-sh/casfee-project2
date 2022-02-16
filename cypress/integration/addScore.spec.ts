describe("Add Score", () => {
  it("login and add a new score for Golfplatz Schönenberg", () => {
    cy.login("testuser@birdiebook.app", "test1234");
    cy.visit("http://localhost:3000/add-score");
    cy.get('[data-test="score-1"]').type("4");
    cy.get('[data-test="putts-1"]').type("2");
    cy.get('[data-test="score-2"]').type("5");
    cy.get('[data-test="putts-2"]').type("2");
    cy.get('[data-test="add-score-submit"]').click();
    cy.get('[data-test="confirm"]').click();
    cy.get("h1").should("contain", "Scores");
  });
});
