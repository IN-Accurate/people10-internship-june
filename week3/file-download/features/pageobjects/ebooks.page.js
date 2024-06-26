const { $ } = require('@wdio/globals')
const Page = require('./page');

class EbookPage extends Page {
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
