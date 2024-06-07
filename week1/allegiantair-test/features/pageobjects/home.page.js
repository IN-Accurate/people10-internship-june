
const cookieCloseBtn =  $('button[id="onetrust-accept-btn-handler"]');
const popupCloseBtn = $('button[data-hook="overlay-merchandise_ice-pop_close"]');
const tripTypeChoice = $('label[data-hook="flight-search-trip-type_ONEWAY"]');
const departureCity = $('div[data-hook="flight-search-origin"]');
const departureCitySelection = $('//div[contains(text(),"Akron-Canton, OH (CAK)")]');
const arrivalCity = $('div[data-hook="flight-search-destination"]');
const arrivalCitySelection = $('//div[contains(text(),"Las Vegas, NV (LAS)")]');
const openCalendarBtn = $('button[data-hook="flight-search-date-picker_expand-start-date"]');
class HomePage {
  
  get cookieClose(){
    return cookieCloseBtn;
  }
  
  get popupClose() {
    return popupCloseBtn;
  }

  get tripType(){
    return tripTypeChoice;
  }

  get fromCity(){
    return departureCity;
  }
  
  get selectFromCity(){
    return departureCitySelection;
  }
  get toCity(){
    return arrivalCity;
  }
  
  get selectToCity(){
    return arrivalCitySelection;
  }

  get openCalendar(){
    return openCalendarBtn;
  }

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

  get openTravelerSelect(){
    return $('button[data-hook="flight-search-travelers-expando-button"]');
  }

  get adultsIncrement(){
    return $('button[data-hook="flight-search-adults_increment"]');
  }

  get searchButton(){
    return $('button[data-hook="flight-search-submit"]');
  }
  

  OpenHomePage = async () => {
    await browser.url("https://www.allegiantair.com/");
    

    let cookieClose = await this.cookieClose;
    await cookieClose.waitForExist();
    await cookieClose.waitForClickable();
    await cookieClose.click();

    let overlayClose = await this.popupClose;
    await expect(overlayClose).toBeDisplayed();
    await overlayClose.click();
    
    await this.tripType.click();

    await this.fromCity.click();
    await this.selectFromCity.click();

    await this.toCity.click();
    await this.selectToCity.click();

    await this.openCalendar.waitForClickable();
    await this.openCalendar.click();

    let departureBtn = await this.departureDate();
    await departureBtn.waitForClickable();
    await departureBtn.click();

    await this.openTravelerSelect.click();
    await this.adultsIncrement.click()
    await this.openTravelerSelect.click();
    

  };
}

module.exports = new HomePage();
