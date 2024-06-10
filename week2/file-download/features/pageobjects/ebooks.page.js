const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EbookPage extends Page {
    /**
     * define selectors using getter methods
     */
    get bookToDownload () {
        return $('(//div[@class="ebook-img"])[2]');
    }

    async selectEbook(){

        let bookToBeClicked = await this.bookToDownload;
        await bookToBeClicked.waitForClickable();
        await bookToBeClicked.click();

    }
}

module.exports = new EbookPage();
