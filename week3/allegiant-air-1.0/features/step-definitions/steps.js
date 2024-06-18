const { Given, When, Then } = require("@wdio/cucumber-framework");
const Home = require("../pageobjects/home.page.js");
const Flights = require("../pageobjects/flights.page.js");
const Bundles = require("../pageobjects/bundles.page.js");
const Travelers = require("../pageobjects/travelers.page.js");
const Seats = require("../pageobjects/seats.page.js");
const Bags = require("../pageobjects/bags.page.js");
const Hotels = require("../pageobjects/hotels.page.js");
const Cars = require("../pageobjects/cars.page.js");

Given(/^the user is on homepage$/, () => {
	return true;
});

When(/^the user is shown a cookie consent banner$/, () => {
	return true;
});

Then(/^the user can accept and close the cookie consent banner$/, () => {
	return true;
});

Given(/^the user is still in the homepage$/, () => {
	return true;
});

When(/^the user is shown a merchandise offer overlay$/, () => {
	return true;
});

Then(/^the user can close the overlay$/, () => {
	return true;
});

Given(/^the user is still in the homepage$/, () => {
	return true;
});

When(/^the user selects the <trip_type>$/, () => {
	return true;
});

Then(/^the user can select <departure_city> and <destination_city> airports$/, () => {
	return true;
});

Then(/^the user can select <departure_month> and <return_month>$/, () => {
	return true;
});

Then(/^the user can provide <no_of_adults>, <no_of_children>, <no_of_infants_in_seat>, <no_of_infants_in_lap>$/, () => {
	return true;
});

Then(/^the user clicks continue to proceed to the flights page$/, () => {
	return true;
});

Given(/^the user is on the flights page$/, () => {
	return true;
});

When(/^the user changes the departure date$/, () => {
	return true;
});

Then(/^the user is provided a calendar view$/, () => {
	return true;
});

Then(/^the user changes the departure date$/, () => {
	return true;
});

Then(/^the user clicks continue to proceed to the bundles page$/, () => {
	return true;
});

Given(/^user is on the bundles page$/, () => {
	return true;
});

When(/^different bundle type options are shown$/, () => {
	return true;
});

Then(/^user can select a <type_of_bundle>$/, () => {
	return true;
});

Then(/^the user clicks continue to proceed to the travelers page$/, () => {
	return true;
});

Given(/^user is on the traverlers page$/, () => {
	return true;
});

When(/^the user inputs the required details$/, () => {
	return true;
});

Then(/^the user clicks continue to proceed to the seats page$/, () => {
	return true;
});

Given(/^user is on the seats page$/, () => {
	return true;
});

When(/^user selects a type of seats as <seat_type>$/, () => {
	return true;
});

Then(/^the user clicks continue to proceed to bags page$/, () => {
	return true;
});

Given(/^user is on the bags page$/, () => {
	return true;
});

When(/^user selects <no_of_carry_on_bags> and <no_of_checked_bags>$/, () => {
	return true;
});

When(/^user selects the extras$/, () => {
	return true;
});

Then(/^the user clicks continue to proceed to the hotels page$/, () => {
	return true;
});

Given(/^user is on the hotels page$/, () => {
	return true;
});

When(/^user selects a hotel$/, () => {
	return true;
});

Then(/^the user clicks continue to proceed to the cars page$/, () => {
	return true;
});

Given(/^user is on the cars page$/, () => {
	return true;
});

When(/^user selects a car$/, () => {
	return true;
});

Then(/^user is redirected to payments page$/, () => {
	return true;
});

Given(/^user is on the payments page$/, () => {
	return true;
});

When(/^the user enters required details$/, () => {
	return true;
});

Then(/^user can complete booking$/, () => {
	return true;
});
