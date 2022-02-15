describe("Register", () => {
  it("Cant register existing user", () => {
    cy.visit("http://localhost:3000/register");
    cy.get('[data-test="register-email"]').type("testuser@birdiebook.app");
    cy.get('[data-test="register-pw"]').type("test1234");
    cy.get(".btn-secondary__register").click();
    cy.get('[data-test="register-alert"]').should(
      "contain",
      "Die eingegebene Email-Adresse wird bereits verwendet."
    );
  });
  it("Cant register with weak password", () => {
    cy.visit("http://localhost:3000/register");
    cy.get('[data-test="register-email"]').type("testuser@birdiebook.app");
    cy.get('[data-test="register-pw"]').type("11");
    cy.get(".btn-secondary__register").click();
    cy.get('[data-test="register-alert"]').should(
      "contain",
      "Bitte verwenden Sie ein strengeres Passwort."
    );
  });
});
