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
    this.currentListSelector =
      '//button[contains(@data-hook,"day-tab_departing")]';
    this.targetListDate = new Date("2024-06-28");
    this.targetCalendarDate = new Date("2024-06-30");
    this.currentCalendarSelector =
      '//button[contains(@data-hook,"select-day-departing")]';
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

  async changeCalendarDate() {
    try {
      let currentDates = await $$(this.currentCalendarSelector);
      while (true) {
        let availableDates = [];
        for (const element of currentDates) {
          const isEnabled = await element.isEnabled();
          const dateDataHook = await element.getAttribute("data-hook");
          const parts = dateDataHook.split("_");
          console.log("Split parts:", parts); 
          const dateString = parts[1];
          console.log("Date string:", dateString); 
          console.log("IS ENABLED : ",isEnabled)
          const date = new Date(dateString);

          if (isEnabled && date >= this.targetCalendarDate) {
            availableDates.push(element);
          }
        }

        if (availableDates.length > 0) {
          await availableDates[0].click();
          break;
        }
        await this.nextList.waitForExist();
        await this.nextList.waitForClickable();
        await this.nextList.click();
        currentDates = await $$(this.currentCalendarSelector);
      }
      
    } catch (error) {
      console.error("Error in changeCalendarDate():", error);
      throw error;
    }
  }

  async changeListDate() {
    try {
      let currentDates = await $$(this.currentListSelector);
      while (true) {
        let availableDates = [];
        for (const element of currentDates) {
          const isEnabled = await element.isEnabled();
          const dateDataHook = await element.getAttribute("data-hook");
          const dateString = dateDataHook.split("_")[2];
          const date = new Date(dateString);

          if (isEnabled && date >= this.targetListDate) {
            availableDates.push(element);
          }
        }

        if (availableDates.length > 0) {
          await availableDates[0].click();
          break;
        }


        await this.nextList.waitForExist();
        await this.nextList.waitForClickable();
        await this.nextList.click();
        currentDates = await $$(this.currentListSelector);
      }
    } catch (error) {
      console.error("Error in changeListDate():", error);
      throw error;
    }
  }
}

module.exports = new Flights();
