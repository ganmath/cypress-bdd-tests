import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const apiUrl = "http://localhost:8080/customers";
let createdCustomerId = null;

Given(
  "a customer exists with name {string}, email {string}, phone {string} and address {string}",
  (name, email, phone, address) => {
    cy.request("POST", apiUrl, { name, email, phone, address }).then(
      (response) => {
        createdCustomerId = response.body.customerId;
      }
    );
  }
);

When("I delete the customer by customerId", () => {
  cy.request("DELETE", `${apiUrl}/by-customerId/${createdCustomerId}`);
});

Then("the customer should not be present in the list", () => {
  cy.request("GET", apiUrl).then((res) => {
    const exists = res.body.some((c) => c.customerId === createdCustomerId);
    expect(exists).to.be.false;
  });
});

Given("multiple customers exist", () => {
  cy.request("POST", apiUrl, {
    name: "User1",
    email: "user1@example.com",
    phone: "1234567890",
    address: "Addr1",
  });
  cy.request("POST", apiUrl, {
    name: "User2",
    email: "user2@example.com",
    phone: "0987654321",
    address: "Addr2",
  });
});

When("I delete all customers", () => {
  cy.request("DELETE", apiUrl);
});

Then("the customer list should be empty", () => {
  cy.request("GET", apiUrl).then((res) => {
    expect(res.body).to.have.length(0);
  });
});