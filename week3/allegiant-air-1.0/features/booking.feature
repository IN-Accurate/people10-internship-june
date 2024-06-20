Feature: Booking flights on allegiant

  Scenario: Accept the cookies in the homepage
    Given the user is on homepage
    When the user is shown a cookie consent banner
    Then the user can accept and close the cookie consent banner

  Scenario: Close the merchandise offer overlay
    Given the user is still in the homepage
    When the user is shown a merchandise offer overlay
    Then the user can close the overlay

  Scenario: User searches a flight by providing trip type(one way or round trip), departure and destination airports, departure and return date(in round trip), number of travelers
    Given the user is still in the homepage
    When the user selects the <trip_type>
    Then the user can select <departure_city> and <destination_city> airports
    And the user can select the dates
    When the user provides <no_of_adults>, <no_of_children>, <no_of_infants_in_seat>, <no_of_infants_in_lap>
    Then the user clicks continue to proceed to the flights page

    Examples:
      | trip_type | departure_city      | destination_city                     | no_of_adults | no_of_children | no_of_infants_in_seat | no_of_infants_in_lap |
      | One way   | Las Vegas, NV (LAS) | Vancouver, BC / Bellingham, WA (BLI) |            2 |              1 |                     1 |                    1 |

  Scenario: User is on flights page and need to proceed to bundles page
    Given the user is on the flights page
    When the user changes the departure date
    Then the user is provided a calendar view and proceeds to bundles page


    Scenario: User is on bundles page and need to proceed to travelers page
        Given user is on the bundles page
        When user can select a <type_of_bundle>
        Then the user clicks continue to proceed to the travelers page
        Examples:
            | type_of_bundle |
            # |      total     |
            |      bonus     |  

    Scenario: User is on travelers page and need to proceed to seats page
        Given user is on the traverlers page 
        When the user inputs the required details
        Then the user clicks continue to proceed to the seats page
#     Scenario: User is on seats page and need to proceed to Bags page
#         Given user is on the seats page
#         When user selects a type of seats as <seat_type>
#         Then the user clicks continue to proceed to bags page
#         Examples:
#             | seat_type    |
#             | Economy      |
#     Scenario: User is on the bags page and need to proceed to Hotels page
#         Given user is on the bags page
#         When user selects <no_of_carry_on_bags> and <no_of_checked_bags>
#         And user selects the extras
#         Then the user clicks continue to proceed to the hotels page
#         Examples:
#             | carry_on | checked_in |
#             |        1 |          3 |
#     Scenario: User is on hotels page and need to proceed to cars page
#         Given user is on the hotels page
#         When user selects a hotel
#         Then the user clicks continue to proceed to the cars page
#     Scenario: User is on cars page and need to proceed to payments page
#         Given user is on the cars page
#         When user selects a car
#         Then the user clicks continue to proceed to the payments page
#     Scenario: User is on payments page, he can provide the details required and complete the booking
#         Given user is on the payments page
#         When the user enters required details
#         Then user can complete booking
# # //button[contains(@data-hook, "select-day-departing") and @aria-hidden="false"]
# # //button[.//span[contains(@data-hook,"select-legroom-plus-seat_front_1A"
# # //button[.//span[contains(@data-hook, "select-economy-seat_unrestricted")]]
# # //button[.//span[contains(@data-hook, "select-legroom-plus-seat_exit-row")]]
# # //button[.//span[contains(@data-hook, "select-legroom-plus-seat_unrestricted")]]
