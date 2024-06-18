class Flights{


    get continueBtn(){
        return $('button[data-hook="flights-page_continue"');
    }


    continueToBundles=async()=>{

        
        let continueBtn = await this.continueBtn;

        await continueBtn.waitForClickable();
        await continueBtn.click();

    }


}

module.exports = new Flights();