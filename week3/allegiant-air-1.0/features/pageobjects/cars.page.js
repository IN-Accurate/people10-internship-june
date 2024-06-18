class Cars{
    get selectFirstCar() {
        return $$('//button[contains(., "$")]')[4];
    }
    
    // get continueToPayment(){
    //     return $('button[data-hook="cars-page_continue"]');
    // }

    continueToPayment=async()=>{

        let selectFirstCarBtn = await this.selectFirstCar;
        await selectFirstCarBtn.waitForClickable();

        await selectFirstCarBtn.click();
        // let continueToPaymentBtn = await this.continueToPayment;
        // await continueToPaymentBtn.click();
    }

}

module.exports=new Cars();