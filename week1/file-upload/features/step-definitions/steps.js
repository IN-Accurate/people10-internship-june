const {Given, When, Then} = require('@wdio/cucumber-framework');
const {expect,$} = require('@wdio/globals');

const UploadPage = require('../pageobjects/upload.page.js');
const ResultPage = require('../pageobjects/result.page.js');

const pages={
    upload:UploadPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I upload a file and click submit file.$/, async() => {
    await UploadPage.upload();
});

Then(/^I can see a confimation message in the results page$/, async() => {
    await expect(ResultPage.flashAlert).toBeExisting;
    await expect(ResultPage.flashAlert).toHaveText('File Uploaded!');
});


Then(/^I should be able to take a screenshot$/, async() => {
	await ResultPage.takeScreenShot();
});



