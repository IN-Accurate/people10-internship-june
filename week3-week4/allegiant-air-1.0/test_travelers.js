const fs = require("fs");

const data = JSON.parse(fs.readFileSync("testdata.json", "utf8"));

const no_of_adults = parseInt(data.no_of_adults);
const no_of_children = parseInt(data.no_of_children);
const no_of_infants_in_seat = parseInt(data.no_of_infants_in_seat);
const no_of_infants_in_lap = parseInt(data.no_of_infants_in_lap);

const firstNames = [];
const lastNames = [];
const middleNames = [];
const suffixes = ["Sr", "Jr", "II", "III", "IV"];
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
const dobDays = [];
const dobYears = [];
const emails = [];
const phones = [];
const traveler_type = ["adults", "children", "infantsInSeat", "infantsInLap"];

class Travelers {
  firstName(traveler_type, i) {
    return $(
      `input[data-hook="travelers-form_${traveler_type}_${i}_first-name"]`
    );
  }
  lastName(i) {
    return $(
      `input[data-hook="travelers-form_${traveler_type}_${i}_last-name"]`
    );
  }

  middleName(i) {
    return $(
      `input[data-hook="travelers-form_${traveler_type}_${i}_middle-name"]`
    );
  }

  gender(traveler_type, i, gender) {
    return $(
      `label[data-hook="travelers-form_${traveler_type}_${i}_gender_${gender}"]`
    );
  }

  month(traveler_type, i) {
    return $(`div[data-hook="travelers-form_${traveler_type}_${i}_dob-month"]`);
  }

  setMonth(i, j) {
    return $(`//div[contains(text(),"${j[i]}")]`);
  }

  day(traveler_type, i) {
    return $(`div[data-hook="travelers-form_${traveler_type}_${i}_dob-day"]`);
  }

  setDay(i, j) {
    return $(`//div[contains(text(),"${j[i]}")]`);
  }
  year(traveler_type, i) {
    return $(
      `input[data-hook="travelers-form_${traveler_type}_${i}_dob-year"]`
    );
  }

  email(i) {
    return $(`input[data-hook="travelers-form_adults_${i}_email"]`);
  }

  phoneNumber(i) {
    return $(
      `input[data-hook="travelers-form_adults_${i}_primary-phone-number"]`
    );
  }

  suffix(i) {
    return $(`div[data-hook="travelers-form_${traveler_type}_${i}_suffix"]`);
  }

  setSuffix(j) {
    return $(`//div[contains(text(),"${j}")]`);
  }
  get continueBtn() {
    return $('button[data-hook="travelers-page_continue"]');
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
      getRandomString(5) +
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

  continueToSeatPage = async () => {
    await browser.pause(3000);
    await this.continueBtn.click();
  };

  fillDetails_Adults = async () => {
    for (let i = 0; i < no_of_adults; i++) {
      firstNames.push(getRandomString(5));
      lastNames.push(getRandomString(5));
      middleNames.push(getRandomString(3));
      dobDays.push(Math.floor(Math.random() * 28) + 1);
      dobYears.push(Math.floor(Math.random() * (2005 - 1970 + 1)) + 1970);
      emails.push(getRandomEmail());
      phones.push(getRandomPhoneNumber());
    }

    for (let i = 0; i < no_of_adults; i++) {
      await this.firstName(traveler_type[0], i).setValue(firstNames[i]);
      await this.middleName(traveler_type[0], i).setValue(middleNames[i]);
      await this.lastName(traveler_type[0], i).setValue(lastNames[i]);
      await this.suffix(traveler_type[0], i).click();
      await this.setSuffix(suffixes[i]).click();
      await this.gender(traveler_type[0], i, gender).click();
      await this.month(traveler_type[0], i).click();
      await this.setMonth(i, dobMonths).click();
      await this.day(traveler_type[0], i).click();
      await this.setDay(i, dobDays).click();
      await this.year(traveler_type[0], i).setValue(dobYears[i]);
      await this.email(i).setValue(emails[i]);
      await this.phoneNumber(i).setValue(phones[i]);
    }
  };

  fillDetails_Children = async () => {
    firstNames = [];
    lastNames = [];
    middleNames = [];
    dobDays = [];
    dobYears = [];

    for (let i = 0; i < no_of_children; i++) {
      firstNames.push(getRandomString(5));
      lastNames.push(getRandomString(5));
      middleNames.push(getRandomString(3));
      dobDays.push(Math.floor(Math.random() * 28) + 1);
      dobYears.push(Math.floor(Math.random() * (2005 - 1970 + 1)) + 1970);
      emails.push(getRandomEmail());
      phones.push(getRandomPhoneNumber());
    }

    for (let i = 0; i < no_of_children; i++) {
      await this.firstName(traveler_type[1], i).setValue(firstNames[i]);
      await this.middleName(traveler_type[1], i).setValue(middleNames[i]);
      await this.lastName(traveler_type[1], i).setValue(lastNames[i]);
      await this.suffix(traveler_type[1], i).click();
      await this.setSuffix(suffixes[i]).click();
      await this.gender(traveler_type[1], i, gender).click();
      await this.month(traveler_type[1], i).click();
      await this.setMonth(i, dobMonths).click();
      await this.day(traveler_type[1], i).click();
      await this.setDay(i, dobDays).click();
      await this.year(traveler_type[1], i).setValue(dobYears[i]);
    }
  };

  fillDetails_Infant_In_Seat = async () => {
    firstNames = [];
    lastNames = [];
    middleNames = [];
    dobDays = [];
    dobYears = [];
    for (let i = 0; i < no_of_infants_in_seat; i++) {
      firstNames.push(getRandomString(5));
      lastNames.push(getRandomString(5));
      middleNames.push(getRandomString(3));
      dobDays.push(Math.floor(Math.random() * 28) + 1);
      dobYears.push(Math.floor(Math.random() * (2005 - 1970 + 1)) + 1970);
      emails.push(getRandomEmail());
      phones.push(getRandomPhoneNumber());
    }

    for (let i = 0; i < no_of_infants_in_seat; i++) {
      await this.firstName(traveler_type[2], i).setValue(firstNames[i]);
      await this.middleName(traveler_type[2], i).setValue(middleNames[i]);
      await this.lastName(traveler_type[2], i).setValue(lastNames[i]);
      await this.suffix(traveler_type[2], i).click();
      await this.setSuffix(suffixes[i]).click();
      await this.gender(traveler_type[2], i, gender).click();
      await this.month(traveler_type[2], i).click();
      await this.setMonth(i, dobMonths).click();
      await this.day(traveler_type[2], i).click();
      await this.setDay(i, dobDays).click();
      await this.year(traveler_type[2], i).setValue(dobYears[i]);
    }
  };

  fillDetails_Infant_In_Lap = async () => {
    firstNames = [];
    lastNames = [];
    middleNames = [];
    dobDays = [];
    dobYears = [];
    for (let i = 0; i < no_of_adults; i++) {
      firstNames.push(getRandomString(5));
      lastNames.push(getRandomString(5));
      middleNames.push(getRandomString(3));
      dobDays.push(Math.floor(Math.random() * 28) + 1);
      dobYears.push(Math.floor(Math.random() * (2005 - 1970 + 1)) + 1970);
      emails.push(getRandomEmail());
      phones.push(getRandomPhoneNumber());
    }

    for (let i = 0; i < adultno_of_adultss; i++) {
      await this.firstName(traveler_type[3], i).setValue(firstNames[i]);
      await this.middleName(traveler_type[3], i).setValue(middleNames[i]);
      await this.lastName(traveler_type[3], i).setValue(lastNames[i]);
      await this.suffix(traveler_type[3], i).click();
      await this.setSuffix(suffixes[i]).click();
      await this.gender(traveler_type[3], i, gender).click();
      await this.month(traveler_type[3], i).click();
      await this.setMonth(i, dobMonths).click();
      await this.day(traveler_type[3], i).click();
      await this.setDay(i, dobDays).click();
      await this.year(traveler_type[3], i).setValue(dobYears[i]);
    }
    await browser.pause(3000);
  };
}

module.exports = new Travelers();
