const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page {
    get resourcesMenu () {
        return $('//a[text()="Resources"]');
    }

    get ebooksMenu () {
        return $('//a[text()="eBooks"]');
    }

    async home () {
        let resourcesMenuBtn = await this.resourcesMenu;
        (await resourcesMenuBtn).elementHover;
        let ebooksMenuBtn = await this.ebooksMenu;
        (await ebooksMenuBtn).click();
    }
    open () {
        return super.open('e-books');
    }
}

module.exports = new HomePage();
