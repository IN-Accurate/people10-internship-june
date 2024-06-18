
const cookieCloseBtn =  $('button[id="onetrust-accept-btn-handler"]');
const popupCloseBtn = $('button[data-hook="overlay-merchandise_ice-pop_close"]');
const tripTypeChoice = $('label[data-hook="flight-search-trip-type_ONEWAY"]');
const departureCity = $('div[data-hook="flight-search-origin"]');
const departureCitySelection = $('//div[contains(text(),"Akron-Canton, OH (CAK)")]');
const arrivalCity = $('div[data-hook="flight-search-destination"]');
const arrivalCitySelection = $('//div[contains(text(),"Las Vegas, NV (LAS)")]');
const openCalendarBtn = $('button[data-hook="flight-search-date-picker_expand-start-date"]');
const travelerSelection = $('button[data-hook="flight-search-travelers-expando-button"]');
const adultsIncrementBtn = $('button[data-hook="flight-search-adults_increment"]');
class HomePage {
  departureDate =async()=>{

    let i=0;
    let currDate = new Date();
    console.log(currDate);
    let currDay=currDate.toISOString().slice(8,10); 
    let currDayInt=parseInt(currDay)+2;
    console.log(currDay);
    while(await  $('[data-hook="flight-search-date-picker_calendar-'+i+'_select-day-'+currDayInt+'"]').isEnabled()==false){
      currDayInt++;
     
        if(currDayInt>31){
          currDayInt=currDayInt%31;
          i++;
        }
    }

    console.log(currDayInt)
    return  $('[data-hook="flight-search-date-picker_calendar-'+i+'_select-day-'+currDayInt+'"]');
  }

  get searchButton(){
    return $('button[data-hook="flight-search-submit"]');
  }
  

  OpenHomePage = async () => {
    await browser.url("https://www.allegiantair.com/");
    

    await cookieCloseBtn.waitForExist();
    await cookieCloseBtn.waitForClickable();
    await cookieCloseBtn.click();

    await expect(popupCloseBtn).toBeDisplayed();
    await popupCloseBtn.click();
    
    await tripTypeChoice.click();

    await departureCity.click();
    await departureCitySelection.click();

    await arrivalCity.click();
    await arrivalCitySelection.click();

    await openCalendarBtn.waitForClickable();
    await openCalendarBtn.click();

    let departureBtn = await this.departureDate();
    await departureBtn.waitForClickable();
    await departureBtn.click();

    await travelerSelection.click();
    await adultsIncrementBtn.click()
    await travelerSelection.click();
    

  };
}

module.exports = new HomePage();
