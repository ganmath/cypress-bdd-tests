Feature: Delete Customer

Feature: Delete Customer by customerId

  Scenario: Delete a customer using customerId
    Given a customer exists with name "DeleteByCustomerId", email "deletebycid@example.com", phone "1112223333" and address "To Be Deleted"
    When I delete the customer by customerId
    Then the customer should not be present in the list

  Scenario: Delete all customers
    Given multiple customers exist
    When I delete all customers
    Then the customer list should be empty