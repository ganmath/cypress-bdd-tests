Feature: Customer API L2 Test

  Scenario: Create and fetch customers
    Given the API is up
    When I create a customer with name "Ganesh" and email "g@xyz.com"
    Then I should see the customer in the list