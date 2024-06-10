const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DownloadPage extends Page {
    /**
     * define selectors using getter methods
     */
    get emailField () {
        return $('//input[@id="Form_getForm_Email"]');
    }
    get submitBtn(){
        return $('input[value="Submit"]');
    }

    async downloadEbook(){

        await (await this.emailField).setValue('example@gmail.com')
        await browser.pause(14000);
        await (await this.submitBtn).waitForClickable();
        await (await this.submitBtn).click();
        await browser.pause(14000);

    }
}

module.exports = new DownloadPage();
