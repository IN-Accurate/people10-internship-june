const fs = require("fs");

const data = JSON.parse(fs.readFileSync("testdata.json", "utf8"));

class Bags {
  incrementCheckedBag = async (i) => {
    return await $(
      `//button[@data-hook="ancillaries-page-traveler_${i}_checked-in_increment"]`
    );
  };


  get priorityBtn() {
    return $('//button[@data-hook="priority-boarding-card_add-to-cart"]');
  }

  get popUp(){
    return $('//span[@data-hook="extras-popup-flight-leg_checkbox-label"]')
  }

  get closePriorityPopUp(){
    return $('//button[@data-hook="priority-boarding-modal_add-to-cart"]');
  }
  get petBtn() {
    return $('//button[@data-hook="pet-in-cabin-card_add-to-cart"]');
  }

  get closePetPopUp(){
    return $('//button[@data-hook="pet-in-cabin-modal_add-to-cart"]')
  }

  get continueBtn() {
    return $('//button[@data-hook="ancillaries-page_continue"]');
  }

  selectBag=async(no_of_checked_bags)=>{

    
let no_of_adults = parseInt(data.no_of_adults);
let children = parseInt(data.no_of_children);
let infantsInSeat = parseInt(data.no_of_infants_in_seat);
let bagsRequired = no_of_adults + children + infantsInSeat;
    for(let j=0;j<bagsRequired;j++)
    for (let i = 0; i < no_of_checked_bags; i++) {
      let checkedBagButton = await this.incrementCheckedBag(j);
      await checkedBagButton.waitForExist();
      await checkedBagButton.waitForClickable();
      await checkedBagButton.click();
    }

  }

  selectExtras=async()=>{
    
    let priorityBtn=await this.priorityBtn;
    await priorityBtn.waitForClickable();
    await priorityBtn.click();
    let priorityPopUp=await this.popUp;
    await priorityPopUp.waitForClickable();
    await priorityPopUp.click();
    let closePriorityPopUp=await this.closePriorityPopUp;
    await closePriorityPopUp.waitForClickable();
    await closePriorityPopUp.click();
    
    let petBtn=await this.petBtn;
    await petBtn.waitForClickable();
    await petBtn.click();
    let petPopUp=await this.popUp;
    await petPopUp.waitForClickable();
    await petPopUp.click();
    let closePetPopUp=await this.closePetPopUp;
    await closePetPopUp.waitForClickable();
    await closePetPopUp.click();
  }

  continueToHotels = async () => {

    let continueBtn = await this.continueBtn;
    await continueBtn.waitForClickable();
    await continueBtn.click();
    await browser.pause(3000);
  };
}

module.exports = new Bags();
