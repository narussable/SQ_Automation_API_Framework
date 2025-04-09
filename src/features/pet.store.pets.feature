Feature: Retrieve sold pets

  Scenario: Retrieve sold pet, validate status code and tuples {id, name}
    Given a user retrieves sold pets
    Then the response status code should be 200
      And the list should contain just pet IDs and names

  Scenario: Retrieve sold pet, validate status code and count by name
    Given a user retrieves sold pets
    Then the response status code should be 200
      And the list should contain just pet IDs and names
      And print count by name
