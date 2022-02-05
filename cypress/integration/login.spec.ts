describe("Login", () => {
  it("logs test user in and redirects to statistics page", () => {
    cy.login("testuser@birdiebook.app", "test1234");
  });
});
