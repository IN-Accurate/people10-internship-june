const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get resourcesMenu () {
        return $('//a[text()="Resources"]');
    }

    get ebooksMenu () {
        return $('//a[text()="eBooks"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async home () {
        let resourcesMenuBtn = await this.resourcesMenu;
        (await resourcesMenuBtn).elementHover;
        let ebooksMenuBtn = await this.ebooksMenu;
        (await ebooksMenuBtn).click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('e-books');
    }
}

module.exports = new HomePage();
