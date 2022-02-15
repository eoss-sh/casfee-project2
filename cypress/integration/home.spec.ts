describe("Cypress", () => {
  it("opens the app", () => {
    cy.visit("http://localhost:3000");
  });
  it("navigates to register", () => {
    cy.visit("http://localhost:3000/register");
  });
  it("navigates to login", () => {
    cy.visit("http://localhost:3000/login");
  });
});
