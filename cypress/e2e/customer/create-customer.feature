Feature: Customer API L2 Test

  Scenario: Create and fetch customers
    Given the API is up
    When I create a customer with name "Anjali", email "anjani@xyz.com", phone "9920512107" and address "Glade , Vasant Lawns"
    Then I should see the customer in the list

  Scenario: Try to create a customer with missing name
    When I create a customer with email "test@example.com", phone "1234567890" and address "No Name Street" but no name
    Then the API should respond with an error

  Scenario: Create a customer and check customerId format
    When I create a customer with name "Test User", email "testuser@example.com", phone "1234567890" and address "Test Address"
    Then the customerId should start with today's date in CUST-YYYYMMDD format