Feature: The orangehrm website

  Scenario Outline: As a user, I can download an e-book

    Given I am on the e-books page
    When I click on a book
    Then fill the email, fullname and country to download the e-book
