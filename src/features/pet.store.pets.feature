Feature: Retrieve sold pets

  Scenario: Retrieve sold pet names and validate status code
    Given a user retrieves sold pets
    Then the response status code should be 200
    # And the list should contain pet IDs and names
