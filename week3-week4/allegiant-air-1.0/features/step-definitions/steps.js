const { Given, When, Then } = require("@wdio/cucumber-framework");
const Home = require("../pageobjects/home.page.js");
const Flights = require("../pageobjects/flights.page.js");
const Bundles = require("../pageobjects/bundles.page.js");
const Travelers = require("../pageobjects/travelers.page.js");
const Seats = require("../pageobjects/seats.page.js");
const Bags = require("../pageobjects/bags.page.js");
const Hotels = require("../pageobjects/hotels.page.js");
const Cars = require("../pageobjects/cars.page.js");

Given(/^the user is on homepage$/, async () => {
  await Home.OpenHomePage();
  await browser.waitUntil(
    async () => {
      const title = await browser.getTitle();
      return title.includes(
        "Allegiant® | Cheap Flights, Airline Tickets, Vacation & Hotel Deals"
      );
    },
    {
      timeout: 10000,
      timeoutMsg: "Expected to be on the home page",
    }
  );
});

When(/^the user is shown a cookie consent banner$/, async () => {
  await Home.isCookiesDisplayed();
});

Then(/^the user can accept and close the cookie consent banner$/, async () => {
  await Home.closeCookies();
});

Given(/^the user is still in the homepage$/, async () => {
  await browser.waitUntil(
    async () => {
      const title = await browser.getTitle();
      return title.includes(
        "Allegiant® | Cheap Flights, Airline Tickets, Vacation & Hotel Deals"
      );
    },
    {
      timeout: 10000,
      timeoutMsg: "Expected to be on the home page",
    }
  );
});

When(/^the user is shown a merchandise offer overlay$/, async () => {
  await Home.isMerchandiseOverlayDisplayed();
});

Then(/^the user can close the overlay$/, async () => {
  await Home.closeMerchandiseOverlay();
});

When(/^the user selects the (.*)$/, async (trip_type) => {
  await Home.selectTripType(trip_type);
});

Then(
  /^the user can select (.*) and (.*) airports$/,
  async (departure_city, destination_city) => {
    await Home.selectAirports(departure_city, destination_city);
  }
);

When(/^the user can select the dates$/, async () => {
  await Home.selectTripDates();
  await browser.pause(1000);
});

When(
  /^the user provides (.*), (.*), (.*), (.*)$/,
  async (
    no_of_adults,
    no_of_children,
    no_of_infants_in_seat,
    no_of_infants_in_lap
  ) => {
    await Home.provideTravelerDetails(
      no_of_adults,
      no_of_children,
      no_of_infants_in_seat,
      no_of_infants_in_lap
    );
  }
);

Then(/^the user clicks continue to proceed to the flights page$/, async () => {
  await Home.clickContinue();
  await Flights.continueToBundles();
});

// Given(/^the user is on the flights page$/, async () => {
//   await Flights.changeListDate();
// });

// When(/^the user changes the departure date$/, async () => {
//   await Flights.selectCalendarView();
// });

// Then(
//   /^the user is provided a calendar view and proceeds to bundles page$/,
//   async () => {
//     await Flights.changeCalendarDate();
//     await Flights.continueToBundles();
//   }
// );

Given(/^user is on the bundles page$/, async () => {
  // await Bundles.AssertPageReached();
  console.log('hi');
});

When(/^user can select a (.*)$/, async (type_of_bundle) => {
  // await Bundles.selectBundle(type_of_bundle);
  console.log('hi')
});

Then(
  /^the user clicks continue to proceed to the travelers page$/,
  async () => {
    await Bundles.continueToTravelers();
  }
);
Given(/^user is on the traverlers page$/, async () => {
  await browser.waitUntil(
    async () => {
      const title = await browser.getTitle();
      return title.includes("Travelers");
    },
    {
      timeout: 10000,
      timeoutMsg: "Expected to be on the travelers page",
    }
  );
});

When(/^the user inputs the required details$/, async () => {
  await Travelers.fillDetails_Adults();
  await Travelers.fillDetails_Children();
  await Travelers.fillDetails_Infant_In_Seat();
  await Travelers.fillDetails_Infant_In_Lap();
});

Then(/^the user clicks continue to proceed to the seats page$/, async () => {
  await Travelers.continueToSeatPage();
});
Given(/^user is on the seats page$/, async () => {
  await browser.waitUntil(
    async () => {
      const title = await browser.getTitle();
      return title.includes("Seats");
    },
    {
      timeout: 999900,
      timeoutMsg: "Expected to be on the Seats page",
    }
  );
});

When(/^user selects a type of seats as (.*)$/, async (seat_type) => {
  await Seats.selectSeat(seat_type);
});

Then(/^the user clicks continue to proceed to bags page$/, async () => {
  await Seats.continueToBagsPage();
});

Given(/^user is on the bags page$/, async () => {
	await browser.pause(100);
});

When(
  /^user selects (.*) bags$/,
  async (no_of_checked_bags) => {
  await Bags.selectBag(no_of_checked_bags);
	await browser.pause(100);

  }
);

When(/^user selects the extras$/, async () => {
  await Bags.selectExtras();
});

Then(/^the user clicks continue to proceed to the hotels page$/, async () => {
  await Bags.continueToHotels();
});

Given(/^user is on the hotels page$/, async () => {
	await browser.pause(100);
});

When(/^user selects a hotel$/, async () => {
  await Hotels.selectHotel();
});

Then(/^the user clicks continue to proceed to the cars page$/, async () => {
  await Hotels.continueToCars();
});

Given(/^user is on the cars page$/, async() => {
	await browser.pause(100);
});

When(/^user selects a car$/, async() => {
  await Cars.selectCar();
});

Then(/^the user clicks continue to proceed to the payments page$/, async() => {
	await Cars.continueToPayment();
});

Given(/^user is on the payments page$/, async () => {
	await browser.pause(100);
});

When(/^the user enters required details$/, async () => {
	await browser.pause(100);
});

Then(/^user can complete booking$/, async () => {
	await browser.pause(100);
	return true;
});
