const { $ } = require('@wdio/globals')
const Page = require('./page');

class DownloadPage extends Page {
    get emailField () {
        return $('//input[@id="Form_getForm_Email"]');
    }
    get submitBtn(){
        return $('input[value="Submit"]');
    }

    async downloadEbook(){

        await this.emailField.setValue('example@gmail.com')
        await this.submitBtn.waitForClickable();
        await this.submitBtn.click();

        await browser.pause(5000);

    }
}

module.exports = new DownloadPage();
