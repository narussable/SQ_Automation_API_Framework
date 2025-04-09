Feature: User feature

#   Scenario: Create a new dummy user
#     Given a user uses dummy data
#     Then the response status code should be 200

#   Scenario: Create dummy users from dummy list
#     Given a user uses dummy list
#     Then the response status code should be 200

  Scenario: Create a user and retrieves its data
    Given a user uses valid data
    Then the response status code should be 200
    When the user retrieves the user information
    Then the response status code should be 200
