const cookieCloseBtn = $('button[id="onetrust-accept-btn-handler"]');
const popupCloseBtn = $(
  'button[data-hook="overlay-merchandise_ice-pop_close"]'
);
const departureCity = $('div[data-hook="flight-search-origin"]');

const arrivalCity = $('div[data-hook="flight-search-destination"]');
// const openStartCalendarBtn = $(
//   'button[data-hook="flight-search-date-picker_expand-start-date"]'
// );
// const travelerSelection = $(
//   'button[data-hook="flight-search-travelers-expando-button"]'
// );
// const adultsIncrementBtn = $(
//   'button[data-hook="flight-search-adults_increment"]'
// );
class HomePage {
  departureDate = async () => {
    let i = 0;
    let currDate = new Date();
    console.log(currDate);
    let currDay = currDate.toISOString().slice(8, 10);
    let currDayInt = parseInt(currDay) + 2;
    console.log(currDay);
    while (
      (await $(
        '[data-hook="flight-search-date-picker_calendar-' +
          i +
          "_select-day-" +
          currDayInt +
          '"]'
      ).isEnabled()) == false
    ) {
      currDayInt++;

      if (currDayInt > 31) {
        currDayInt = currDayInt % 31;
        i++;
      }
    }

    console.log(currDayInt);
    return $(
      '[data-hook="flight-search-date-picker_calendar-' +
        i +
        "_select-day-" +
        currDayInt +
        '"]'
    );
  };

  get searchButton() {
    return $('button[data-hook="flight-search-submit"]');
  }

  isCookiesDisplayed = async () => {
    await expect(cookieCloseBtn).toBeDisplayed();
  };
  closeCookies = async () => {
    await cookieCloseBtn.click();
  };

  isMerchandiseOverlayDisplayed = async () => {
    await expect(popupCloseBtn).toBeDisplayed();
  };
  closeMerchandiseOverlay = async () => {
    await popupCloseBtn.click();
  };

  selectTripType = async (trip_type) => {
    console.log(trip_type)
    const tripType = trip_type.split(" ").join("").toUpperCase();
    const tripTypeChoice = $(
      `label[data-hook="flight-search-trip-type_${tripType}"]`
    );
    await tripTypeChoice.waitForClickable();
    await tripTypeChoice.click();
  };

  selectAirports = async (departure_city, destination_city) => {
    await departureCity.click();
    const departureCitySelection = $(
      `//div[contains(text(),"${departure_city}")]`
    );

    await departureCitySelection.click();

    await arrivalCity.click();

    const arrivalCitySelection = $(
      `//div[contains(text(),"${destination_city}")]`
    );
    await arrivalCitySelection.click();
  };

  // selectTripDates = async (departure_month,return_month) => {
  //   console.log(departure_month,return_month);
  //   await openStartCalendarBtn.click();

  //   let departureBtn = await this.departureDate();
  //   await departureBtn.waitForClickable();
  //   await departureBtn.click();
  // };

  OpenHomePage = async () => {
    await browser.url("https://www.allegiantair.com/");

    

    // await travelerSelection.click();
    // await adultsIncrementBtn.click();
    // await travelerSelection.click();
  };
}

module.exports = new HomePage();
