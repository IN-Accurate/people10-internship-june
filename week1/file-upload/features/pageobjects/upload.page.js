const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class UploadPage extends Page {
   
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    get uploadFileInput(){
        return $('input[data-testid="file-input"]');
    }

    get uploadFileButton(){
            return $('button[data-testid="file-submit"]');
        }
    async upload () {
        
        let uploadInput = await this.uploadFileInput;
        await uploadInput.waitForExist();
        await uploadInput.addValue('C:/Users/P10/Downloads/test-plan-template.docx')
        await browser.pause(4000)

        let uploadButton = await this.uploadFileButton;
        await uploadButton.waitForExist();
        await uploadButton.click();

    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('upload');
    }
}

module.exports = new UploadPage();
