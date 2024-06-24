class Bundles {
    constructor() {
        this.continueToTravelersBtn = $('button[data-hook="bundles-page_continue"]');
        this.validationText = $('//span[@data-hook="bundles-page_page-heading"]');
    }

    async AssertPageReached() {
        await this.validationText.waitForDisplayed({ timeout: 10000 });
        await expect(this.validationText).toHaveTextContaining("Select Your Bundle");
    }

    async selectBundle(type_of_bundle) {
        let bundleSuffix;
        switch (type_of_bundle) {
            case "bonus":
                bundleSuffix = "2";
                break;
            case "total":
                bundleSuffix = "3";
                break;
            default:
                throw new Error(`Invalid bundle type: ${type_of_bundle}`);
        }
        const bundleSelected = await $(`//button[contains(@data-hook,"select-tier-${bundleSuffix}")]`);
        await bundleSelected.waitForClickable({ timeout: 10000 });
        await bundleSelected.click();
    }

    async continueToTravelers() {

        await this.continueToTravelersBtn.waitForExist({ timeout: 10000 });
        await this.continueToTravelersBtn.waitForClickable({ timeout: 10000 });
        await this.continueToTravelersBtn.click();
    }
}

module.exports = new Bundles();
