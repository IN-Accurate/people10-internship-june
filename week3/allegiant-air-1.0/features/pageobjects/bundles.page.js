class Bundles{

    constructor(){
        this.continueToTravelersBtn = $('button[data-hook="bundles-page_continue"]');
        this.validationText =  $('//span[@data-hook="bundles-page_page-heading"]');
    }

    get tierTwoSelector(){
        return $('button[data-hook="select-tier-2"]');  
    }

    AssertPageReached = async()=>{
        await expect(this.validationText).toHaveTextContaining("Select Your Bundle");
    }

    selectBundle = async(type_of_bundle)=>{

        let bundleSuffix;
        switch(type_of_bundle){

            case "bonus":
                    bundleSuffix = "2";
                    break;
            case "total":
                    bundleSuffix = "3";
                        break;
        }
        let bundleSelected = await $(`//button[contains(@data-hook,"select-tier-${bundleSuffix}")]`);
        await bundleSelected.click();
    }

    continueToTravelers=async()=>{

        let tierTwoButton = await this.tierTwoSelector;
        await tierTwoButton.waitForExist();
        await tierTwoButton.waitForClickable();
        await tierTwoButton.click();

        
        await this.continueToTravelersBtn.waitForExist();
        await this.continueToTravelersBtn.waitForClickable();
        await this.continueToTravelersBtn.click();

    }


}

module.exports=new Bundles();