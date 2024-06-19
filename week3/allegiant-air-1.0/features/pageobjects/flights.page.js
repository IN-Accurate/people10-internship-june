class Flights {
  constructor() {
    this.calendarViewBtn = $(
      '//button[@data-hook="flights-calendar-view-button_departing"]'
    );
    this.listViewBtn = $(
      '//button[@data-hook="flights-list-view-button_departing"]'
    );
    this.continueBtn = $('//button[@data-hook="flights-page_continue"]');
    this.nextList = $('//button[@data-hook="next-arrow_departing"]');
    this.currentList = $$('//button[contains(@data-hook,"day-tab_departing_")]')
  }

  async selectCalendarView() {
    await this.calendarViewBtn.waitForExist();
    await this.calendarViewBtn.waitForClickable();
    await this.calendarViewBtn.click();
  }

  async selectListView() {
    await this.listViewBtn.waitForExist();
    await this.listViewBtn.waitForClickable();
    await this.listViewBtn.click();
  }

  async continueToBundles() {
    await this.continueBtn.waitForExist();
    await this.continueBtn.waitForClickable();
    await this.continueBtn.click();
  }

  async changeListDate() { while (true) {
    let availableDates = await this.currentList;
    console.log(availableDates);
    for(const date of availableDates)
          if(date.isClickable()){
                  await date.click();
              break;
              }
    await this.nextList.waitForExist();
    await this.nextList.waitForClickable();
    await this.nextList.click();
  }
  }
}

module.exports = new Flights();
