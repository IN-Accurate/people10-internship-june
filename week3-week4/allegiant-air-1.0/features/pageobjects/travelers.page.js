const fs = require("fs");

const data = JSON.parse(fs.readFileSync("testdata.json", "utf8"));

const no_of_adults = parseInt(data.no_of_adults);
const no_of_children = parseInt(data.no_of_children);
const no_of_infants_in_seat = parseInt(data.no_of_infants_in_seat);
const no_of_infants_in_lap = parseInt(data.no_of_infants_in_lap);

const suffixes = ["Sr.", "Jr.", "II", "III", "IV"];
const dobMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

class Travelers {
  constructor() {
    this.firstNames = [];
    this.lastNames = [];
    this.middleNames = [];
    this.dobDays = [];
    this.dobMonths = [];
    this.dobYears = [];
    this.emails = [];
    this.phones = [];
    this.adultFullNames = [];
  }

  firstName(traveler_type, i) {
    return $(
      `//input[contains(@data-hook,"travelers-form_${traveler_type}_${i}_first-name")]`
    );
  }

  lastName(traveler_type, i) {
    return $(
      `//input[contains(@data-hook,"travelers-form_${traveler_type}_${i}_last-name")]`
    );
  }

  middleName(traveler_type, i) {
    return $(
      `//input[contains(@data-hook,"travelers-form_${traveler_type}_${i}_middle-name")]`
    );
  }

  gender(traveler_type, i, gender) {
    return $(
      `//label[contains(@data-hook,"travelers-form_${traveler_type}_${i}_gender_${gender}")]`
    );
  }

  async setMonth(travelerType, i) {
    const monthDropdown = $(
      `//div[contains(@data-hook,"travelers-form_${travelerType}_${i}_dob-month")]`
    );
    await monthDropdown.waitForClickable();
    await monthDropdown.click();

    const monthOption = $(
      `//div[contains(@data-hook,"travelers-form_${travelerType}_${i}_dob-month")]//*[text()="${
        dobMonths[this.dobMonths[i]]
      }"]`
    );
    await monthOption.waitForClickable();
    await monthOption.click();
  }

  async setDay(travelerType, i) {
    const dayDropdown = $(
      `//div[contains(@data-hook,"travelers-form_${travelerType}_${i}_dob-day")]`
    );
    await dayDropdown.waitForClickable();
    await dayDropdown.click();

    const dayOption = $(
      `//div[contains(@data-hook,"travelers-form_${travelerType}_${i}_dob-day")]//*[text()="${this.dobDays[i]}"]`
    );
    await dayOption.waitForClickable();
    await dayOption.click();
  }

  year(traveler_type, i) {
    return $(
      `//input[contains(@data-hook,"travelers-form_${traveler_type}_${i}_dob-year")]`
    );
  }

  email(i) {
    return $(
      `//input[contains(@data-hook,"travelers-form_adults_${i}_email")]`
    );
  }

  phoneNumber(i) {
    return $(
      `//input[contains(@data-hook,"travelers-form_adults_${i}_primary-phone-number")]`
    );
  }

  async setSuffix(traveler_type, i, suffix) {
    const suffixDropdown = $(`//div[contains(@data-hook,"travelers-form_${traveler_type}_${i}_suffix")]`);
    await suffixDropdown.scrollIntoView();
    await suffixDropdown.waitForClickable();
    await suffixDropdown.click();
  
    const suffixOption = $(`//div[contains(@data-hook,"travelers-form_${traveler_type}_${i}_suffix")]//*[text()="${suffix}"]`);
    await suffixOption.waitForClickable();
    await suffixOption.click();
  }
  async selectDesignatedSeat(i) {
    const designatedSeatDropdown = $(
      `//div[contains(@data-hook,"travelers-form_infantsInLap_${i}_designated-lap")]`
    );
    await designatedSeatDropdown.waitForClickable();
    await designatedSeatDropdown.click();
  
    const adultFullName = this.adultFullNames[Math.floor(Math.random() * this.adultFullNames.length)];
    const firstName = adultFullName.split(' ').slice(0, -1).join(' ');
    let suffix = adultFullName.split(' ').slice(-1)[0];
  
    if (suffix.endsWith('.')) {
      suffix = suffix.slice(0, -1).toUpperCase();
    } else {
      suffix = suffix.toUpperCase();
    }
    const optionXPath = `//div[contains(@data-hook,"travelers-form_infantsInLap_${i}_designated-lap")]//*[text()="${firstName} ${suffix}"]`;
  
    const designatedSeatOption = $(optionXPath);
    await designatedSeatOption.waitForClickable();
    await designatedSeatOption.click();
  }
  
  get continueBtn() {
    return $('//button[@data-hook="travelers-page_continue"]');
  }

  getRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  getRandomEmail() {
    const domains = ["example.com", "mail.com", "domain.com"];
    return (
      this.getRandomString(5) +
      "@" +
      domains[Math.floor(Math.random() * domains.length)]
    );
  }

  getRandomPhoneNumber() {
    const digits = "0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return (
      result.slice(0, 3) + "-" + result.slice(3, 6) + "-" + result.slice(6)
    );
  }

  async continueToSeatPage() {
    await browser.pause(3000);
    await this.continueBtn.click();
  }

  generateRandomYear(travelerType) {
    let minYear, maxYear;
  
    switch (travelerType) {
      case "adults":
        minYear = 1950;
        maxYear = currentYear - 16;
        break;
      case "children":
        minYear = currentYear - 14;
        maxYear = currentYear-3;
        break;
      default:
        minYear = currentYear - 2;
        maxYear = currentYear;
        break;
    }
  
    return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  }
  
  generateRandomDay(month, year) {
    if (month === 1) {
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      return isLeapYear ? Math.floor(Math.random() * 29) + 1 : Math.floor(Math.random() * 28) + 1;
    } else if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
      return Math.floor(Math.random() * 31) + 1;
    } else {
      return Math.floor(Math.random() * 30) + 1;
    }
  }

  async fillDetails(travelerType, count) {
    this.firstNames.length = 0;
    this.lastNames.length = 0;
    this.middleNames.length = 0;
    this.dobDays.length = 0;
    this.dobMonths.length = 0;
    this.dobYears.length = 0;
    this.emails.length = 0;
    this.phones.length = 0;

    for (let i = 0; i < count; i++) {
      this.firstNames.push(this.getRandomString(5));
      this.lastNames.push(this.getRandomString(5));
      this.middleNames.push(this.getRandomString(3));

      let dobYear;
      let dobMonth;
      let dobDay;
  
      if (travelerType === "adults" || travelerType === "children") {
        dobYear = this.generateRandomYear(travelerType);
        dobMonth = Math.floor(Math.random() * 12);
        dobDay = this.generateRandomDay(dobMonth, dobYear);
      } else if (travelerType === "infantsInSeat" || travelerType === "infantsInLap") {
        dobYear = this.generateRandomYear("infants");
        dobMonth = Math.floor(Math.random() * 12);
        dobDay = this.generateRandomDay(dobMonth, dobYear);

        const infantDateOfBirth = new Date(dobYear, dobMonth, dobDay);
        const maxAllowedDate = new Date();
        maxAllowedDate.setFullYear(currentYear - 2); 
        
        if (infantDateOfBirth < maxAllowedDate) {
          dobYear = currentYear -1;
          while(dobMonth = Math.floor(Math.random() * 12)==currentMonth);
        
          dobDay = this.generateRandomDay(dobMonth, dobYear);   
        
          if (dobDay > currentDay) {
            dobDay = currentDay-20;
          }
        }
      }

      if (dobYear === currentYear && dobMonth === currentMonth && dobDay > currentDay) {
        dobDay = currentDay-2;
      } else if (dobYear === currentYear && dobMonth > currentMonth) {
        dobMonth = currentMonth;
        dobDay = currentDay;
      } else if (dobYear > currentYear) {
        dobYear = currentYear - 1;
        dobMonth = currentMonth;
        dobDay = currentDay;
      }
  
      this.dobYears.push(dobYear);
      this.dobMonths.push(dobMonth);
      this.dobDays.push(dobDay);
  
      if (travelerType === "adults") {
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const fullName = `${this.firstNames[i]} ${this.lastNames[i]} ${suffix}`;
        this.adultFullNames.push(fullName);
        await this.setSuffix(travelerType, i, suffix);
        await this.email(i).setValue(this.getRandomEmail());
        await this.phoneNumber(i).setValue(this.getRandomPhoneNumber());
      }

      if (travelerType === "infantsInLap") {
        await this.selectDesignatedSeat(i);
      }
    }

    for (let i = 0; i < count; i++) {
      const gender = ["MALE", "FEMALE"][Math.floor(Math.random() * 2)];
      await this.firstName(travelerType, i).setValue(this.firstNames[i]);
      await this.middleName(travelerType, i).setValue(this.middleNames[i]);
      await this.lastName(travelerType, i).setValue(this.lastNames[i]);
      await this.gender(travelerType, i, gender).click();
      await this.setMonth(travelerType, i);
      await this.setDay(travelerType, i);
      await this.year(travelerType, i).setValue(this.dobYears[i]);
    }
  }

  async fillDetails_Adults() {
    await this.fillDetails("adults", no_of_adults);
    await browser.pause(2000);
  }

  async fillDetails_Children() {
    await this.fillDetails("children", no_of_children);
    await browser.pause(2000);
  }

  async fillDetails_Infant_In_Seat() {
    await this.fillDetails("infantsInSeat", no_of_infants_in_seat);
    await browser.pause(2000);
  }

  async fillDetails_Infant_In_Lap() {
    await this.fillDetails("infantsInLap", no_of_infants_in_lap);
    await browser.pause(2000);
  }

  async continueToSeatPage() {
    await browser.pause(3000);
    await this.continueBtn.click();
  }
}

module.exports = new Travelers();
