import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const apiUrl = "http://localhost:8080/customers";

let createdCustomer;

// Step 1: API availability
Given("the API is up", () => {
  cy.request("GET", apiUrl).its("status").should("eq", 200);
});

// Step 2: Valid customer creation (used in 2 scenarios)
When(
  "I create a customer with name {string}, email {string}, phone {string} and address {string}",
  (name, email, phone, address) => {
    cy.request("POST", apiUrl, { name, email, phone, address }).as("createdCustomer");
    cy.request("POST", apiUrl, { name, email, phone, address }).then((response) => {
      createdCustomer = response.body;
    });
  }
);

// Step 3: Verify customer exists
Then("I should see the customer in the list", () => {
  cy.get("@createdCustomer").then((response) => {
    const { name, email, phone, address } = response.body;
    cy.request("GET", apiUrl).then((res) => {
      expect(
        res.body.some(
          (c) =>
            c.name === name &&
            c.email === email &&
            c.phone === phone &&
            c.address === address
        )
      ).to.be.true;
    });
  });
});

// Step 6: Check formatted customer ID
Then("the customerId should start with today's date in CUST-YYYYMMDD format", () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const expectedPrefix = `CUST-${yyyy}${mm}${dd}-`;

  expect(createdCustomer.customerId.startsWith(expectedPrefix)).to.be.true;
});


// Step 4: Invalid creation (no name)
When(
  "I create a customer with email {string}, phone {string} and address {string} but no name",
  (email, phone, address) => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: { email, phone, address },
      failOnStatusCode: false
    }).as("missingNameResponse");
  }
);

// Step 5: Expect error for invalid request
Then("the API should respond with an error", () => {
  cy.get("@missingNameResponse").then((response) => {
    expect(response.status).to.not.eq(201);
    expect(response.status).to.be.oneOf([400, 422]);
    expect(response.body).to.have.property("error");
  });
});

