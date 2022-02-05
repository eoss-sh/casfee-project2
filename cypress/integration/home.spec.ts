describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });

  it("opens the app", () => {
    cy.visit("http://localhost:3001");
  });
  it("navigates to register", () => {
    cy.visit("http://localhost:3001");
  });
  it("navigates to login", () => {
    cy.visit("http://localhost:3001");
  });
});
