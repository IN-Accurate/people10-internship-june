const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ResultPage extends Page {
    /**
     * define selectors using getter methods
     */
    get flashAlert () {
        return $('h1');
    }

    async takeScreenShot () {
        await browser.saveScreenshot('./result.png');
    }
}

module.exports = new ResultPage();
