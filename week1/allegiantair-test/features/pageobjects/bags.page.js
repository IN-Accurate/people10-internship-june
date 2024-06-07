class Bags {
  incrementCheckedBag = async (i) => {
    return await $(
      `button[data-hook="ancillaries-page-traveler_${i}_checked-in_increment"]`
    );
  };


  get priorityBtn() {
    return $('button[data-hook="priority-boarding-card_add-to-cart"]');
  }

  get popUp(){
    return $('span[data-hook="extras-popup-flight-leg_checkbox-label"]')
  }

  get closePriorityPopUp(){
    return $('button[data-hook="priority-boarding-modal_add-to-cart"]');
  }
  get petBtn() {
    return $('button[data-hook="pet-in-cabin-card_add-to-cart"]');
  }

  get closePetPopUp(){
    return $('button[data-hook="pet-in-cabin-modal_add-to-cart"]')
  }

  get continueBtn() {
    return $('button[data-hook="ancillaries-page_continue"]');
  }
  continueToHotels = async () => {
    for (let i = 0; i < 2; i++) {
      let btn = await this.incrementCheckedBag(i);
      await btn.waitForClickable();
      await btn.click();
    }

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
    

    let continueBtn = await this.continueBtn;
    await continueBtn.waitForClickable();
    await continueBtn.click();
  };
}

module.exports = new Bags();
