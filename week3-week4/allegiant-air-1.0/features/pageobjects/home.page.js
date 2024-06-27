const cookieCloseBtn = $('button[id="onetrust-accept-btn-handler"]');
const popupCloseBtn = $(
  'button[data-hook="overlay-merchandise_ice-pop_close"]'
);
const departureCity = $('div[data-hook="flight-search-origin"]');
const arrivalCity = $('div[data-hook="flight-search-destination"]');
const travelerSelection = $(
  'button[data-hook="flight-search-travelers-expando-button"]'
);
const startCalendarOpen = $(
  '//button[@data-hook="flight-search-date-picker_expand-start-date"]'
);
const adultsIncrementBtn = $(
  'button[data-hook="flight-search-adults_increment"]'
);
const childrenIncrementBtn = $(
  'button[data-hook="flight-search-children_increment"]'
);
const infantSeatIncrementBtn = $(
  'button[data-hook="flight-search-infants-seat_increment"]'
);
const infantLapIncrementBtn = $(
  'button[data-hook="flight-search-infants-lap_increment"]'
);
const searchButton = $('//button[@data-hook="flight-search-submit"]');

class HomePage {
  async OpenHomePage() {
    await browser.maximizeWindow();
    await browser.url("https://www.stg01.aws.allegiantair.com/");
  }

  async isCookiesDisplayed() {
    await expect(cookieCloseBtn).toBeDisplayed();
  }

  async closeCookies() {
    await cookieCloseBtn.click();
  }

  async isMerchandiseOverlayDisplayed() {
    await expect(popupCloseBtn).toBeDisplayed();
  }

  async closeMerchandiseOverlay() {
    await popupCloseBtn.click();
  }

  async selectTripType(trip_type) {
    try {
      const tripType = trip_type.split(" ").join("").toUpperCase();
      const tripTypeChoice = await $(
        `//label[@data-hook="flight-search-trip-type_${tripType}"]`
      );
      await tripTypeChoice.waitForClickable();
      await tripTypeChoice.click();
    } catch (error) {
      console.error(`Error selecting triptype: ${error.message}`);
      throw error;
    }
  }

  async selectAirports(departure_city, destination_city) {
    await departureCity.click();
    let departureCitySelection = await $(
      `//div[contains(text(),"${departure_city}")]`
    );
    await departureCitySelection.waitForClickable();
    await departureCitySelection.click();

    await arrivalCity.click();
    let arrivalCitySelection = await $(
      `//div[contains(text(),"${destination_city}")]`
    );
    await arrivalCitySelection.waitForClickable();
    await arrivalCitySelection.click();
  }

  async selectTripDates() {
    await startCalendarOpen.waitForClickable();
    await startCalendarOpen.click();

    const departureBtn = await this.departureDate();
    await departureBtn.waitForClickable();
    await departureBtn.click();
    await browser.pause(5000);
  }

  async provideTravelerDetails(
    no_of_adults,
    no_of_children,
    no_of_infants_in_seat,
    no_of_infants_in_lap
  ) {
    await travelerSelection.click();
    for (let i = 1; i < no_of_adults; i++) await adultsIncrementBtn.click();

    for (let i = 0; i < no_of_children; i++) await childrenIncrementBtn.click();
    for (let i = 0; i < no_of_infants_in_seat; i++)
      await infantSeatIncrementBtn.click();
    for (let i = 0; i < no_of_infants_in_lap; i++)
      await infantLapIncrementBtn.click();

    await browser.pause(3000);
  }

  async clickContinue() {
    await searchButton.click();
  }
  async departureDate() {
    let i = 1;
    let currDate = new Date();
    let currDay = currDate.getDate(); // Get current day of the month
    let currDayInt = 2; // Start checking from tomorrow's date
  
    // Loop until the button for the desired date is clickable
    while (!(await $(`[data-hook="flight-search-date-picker_calendar-${i}_select-day-${currDayInt}"]`).isClickable())) {
      currDayInt++;
  
      // Handle switching to the next month if current day exceeds 31
      if (currDayInt > 31) {
        currDayInt = 1; // Reset to 1 for the next month
        i++; // Move to the next calendar month
      }
    }
  
    // Return the clickable button element
    return $(`[data-hook="flight-search-date-picker_calendar-${i}_select-day-${currDayInt}"]`);
  }
  
}

module.exports = new HomePage();
