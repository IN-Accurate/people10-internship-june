const { Given, When, Then } = require("@wdio/cucumber-framework");
const Home = require("../pageobjects/home.page.js");
const Flights = require("../pageobjects/flights.page.js");
const Bundles = require("../pageobjects/bundles.page.js");
const Travelers = require("../pageobjects/travelers.page.js");
const Seats = require("../pageobjects/seats.page.js");
const Bags = require("../pageobjects/bags.page.js");
const Hotels = require("../pageobjects/hotels.page.js");
const Cars = require("../pageobjects/cars.page.js");

Given(/^I am on the homepage$/, async () => {
  await browser.maximizeWindow()
  await Home.OpenHomePage();
  await browser.pause(4000);
});

When(
  /^I enter departure and arrival cities, dates, and other flight details$/,
  async () => {
    let searchButton=await Home.searchButton;
    await searchButton.waitForExist();
    await searchButton.waitForClickable();
    await searchButton.click();
    await browser.pause(4000);
  }
);

When(/^I can select a flight on flights page$/, async() => {
   
  await browser.pause(4000);
  await Flights.continueToBundles();
});

Then(/^I can select a bundle$/, async() => {
   
  await browser.pause(4000);
  await Bundles.continueToTravelers();
});

Then(/^I can provide personal details of travelers$/, async() => {
   
  await browser.pause(8000);
  await Travelers.continueToSeatPage();
});

Then(/^I can select seats$/, async() => {
   
  await browser.pause(8000);
  await Seats.continueToBags();
});

Then(/^I can select any bags and extras needed$/, async() => {
   
  await Bags.continueToHotels();
});

Then(/^I can optionally select a hotel$/, async() => {
   
  await Hotels.continueToCars();
});

Then(/^I can optionally select a rental car$/, async() => {
   
  await Cars.continueToPayment();
});

Then(/^I can proceed to the payment section$/, () => {
  return true;
});
