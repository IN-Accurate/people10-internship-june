const { Given, When, Then } = require("@wdio/cucumber-framework");
const Home = require("../pageobjects/home.page.js");
const Flights = require("../pageobjects/flights.page.js");
const Bundles = require("../pageobjects/bundles.page.js");
const assert = require("assert");

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
});

When(
  /^the user provides (.*), (.*), (.*), (.*)$/,
  async (
    no_of_adults,
    no_of_children,
    no_of_infants_in_seat,
    no_of_infants_in_lap
  ) => {
    let adults = no_of_adults;
    let children = no_of_children;
    let infants_in_seat = no_of_infants_in_seat;
    let infants_in_lap = no_of_infants_in_lap;

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
});

Given(/^the user is on the flights page$/, async () => {
  await Flights.changeListDate();
});

When(/^the user changes the departure date$/, async () => {
  await Flights.selectCalendarView();
});

Then(
  /^the user is provided a calendar view and proceeds to bundles page$/,
  async () => {
    await Flights.changeCalendarDate();
    await Flights.continueToBundles();
  }
);

Given(/^user is on the bundles page$/, async () => {
  await Bundles.AssertPageReached();
});

When(/^user can select a (.*)$/, async (type_of_bundle) => {
  await Bundles.selectBundle(type_of_bundle);
});

Then(
  /^the user clicks continue to proceed to the travelers page$/,
  async () => {
    await Bundles.continueToTravelers();
  }
);

// Given(/^user is on the traverlers page$/, async () => {
// 	await browser.pause(100);
// });

// When(/^the user inputs the required details$/, async () => {
// 	await browser.pause(100);
// });

// Then(/^the user clicks continue to proceed to the seats page$/, async () => {
// 	await browser.pause(100);
// });

// Given(/^user is on the seats page$/, async () => {
// 	await browser.pause(100);
// });

// When(/^user selects a type of seats as (.*)$/, async (seat_type) => {
// 	await browser.pause(100);
// });

// Then(/^the user clicks continue to proceed to bags page$/, async () => {
// 	await browser.pause(100);
// });

// Given(/^user is on the bags page$/, async () => {
// 	await browser.pause(100);
// });

// When(
//   /^user selects (.*) and (.*)$/,
//   async (no_of_carry_on_bags,no_of_checked_bags) => {
// 	await browser.pause(100);
//   }
// );

// When(/^user selects the extras$/, async () => {
// 	await browser.pause(100);
// });

// Then(/^the user clicks continue to proceed to the hotels page$/, async () => {
// 	await browser.pause(100);
// });

// Given(/^user is on the hotels page$/, async () => {
// 	await browser.pause(100);
// });

// When(/^user selects a hotel$/, async () => {
// 	await browser.pause(100);
// });

// Then(/^the user clicks continue to proceed to the cars page$/, async () => {
// 	await browser.pause(100);
// });

// Given(/^user is on the cars page$/, async() => {
// 	await browser.pause(100);
// });

// When(/^user selects a car$/, async() => {
// 	await browser.pause(100);
// });

// Then(/^the user clicks continue to proceed to the payments page$/, async() => {
// 	await browser.pause(100);
// });

// Given(/^user is on the payments page$/, async () => {
// 	await browser.pause(100);
// });

// When(/^the user enters required details$/, async () => {
// 	await browser.pause(100);
// });

// Then(/^user can complete booking$/, async () => {
// 	await browser.pause(100);
// 	return true;
// });
