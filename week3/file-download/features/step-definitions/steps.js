const { Given, When, Then } = require('@wdio/cucumber-framework');

const HomePage = require('../pageobjects/home.page');
const EbookPage = require('../pageobjects/ebooks.page');
const DownloadPage = require('../pageobjects/download.page');

const pages = {
    "e-books": HomePage
}


Given(/^I am on the (.+) page$/, async (page) => {
    await pages[page].open()
});


When(/^I click on a book$/, async() => {
    await EbookPage.selectEbook();
});

Then(/^fill the email, fullname and country to download the e-book$/, async () => {
	await DownloadPage.downloadEbook();
});


