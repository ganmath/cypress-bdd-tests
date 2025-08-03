import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the API is up", () => {
  cy.request("GET", "http://localhost:8080/api/customers").its("status").should("eq", 200);
});

When("I create a customer with name {string} and email {string}", (name, email) => {
  cy.request("POST", "http://localhost:8080/api/customers", {
    name,
    email
  }).its("status").should("eq", 200);
});

Then("I should see the customer in the list", () => {
  cy.request("GET", "http://localhost:8080/api/customers").then((response) => {
    expect(response.body.length).to.be.greaterThan(0);
  });
});