const newHcpFunc = () => Cypress._.random(0, 36).toString();
const newHcp = newHcpFunc();
describe("Update User", () => {
  it("login, navigates to profilepage and changes the hadnicap", () => {
    cy.login("testuser@birdiebook.app", "test1234");
    cy.visit("http://localhost:3000/profile");
    cy.get('[data-test="update-hcp"]').type(newHcp);
    cy.get('[data-test="update-hcp"]').should("have.value", newHcp);
  });
});
