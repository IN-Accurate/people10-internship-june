const sectionElements = $$('.Section-noco0i-4.klPGap');
let firstAvailableSeat;
for (const sectionElement of sectionElements) {
    const seatElements = sectionElement.$$('.Seat-sc-1oa4g20-4');
    for (const seatElement of seatElements) {
        const buttonElement = seatElement.$('button');
        if (buttonElement) {
            firstAvailableSeat = seatElement;
            break;
        }
    }
    if (firstAvailableSeat) {
        break;
    }
}
if (firstAvailableSeat) {
    firstAvailableSeat.click();
} else {
    console.log('No available seats with buttons found.');
}



const fs = require("fs");

const data = JSON.parse(fs.readFileSync("testdata.json", "utf8"));

const no_of_adults = parseInt(data.no_of_adults);
const no_of_children = parseInt(data.no_of_children);
const no_of_infants_in_seat = parseInt(data.no_of_infants_in_seat);
const no_of_infants_in_lap = parseInt(data.no_of_infants_in_lap);

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

class Travelers {
  firstName(traveler_type, i) {
    return $(
      `input[data-hook="travelers-form_${traveler_type}_${i}_first-name"]`
    );
  }
  
  lastName(traveler_type, i) {
    return $(
      `input[data-hook="travelers-form_${traveler_type}_${i}_last-name"]`
    );
  }

  middleName(traveler_type, i) {
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

  setMonth(i, months) {
    return $(`//div[contains(text(),"${months[i]}")]`);
  }

  day(traveler_type, i) {
    return $(`div[data-hook="travelers-form_${traveler_type}_${i}_dob-day"]`);
  }

  setDay(i, days) {
    return $(`//div[contains(text(),"${days[i]}")]`);
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

  suffix(traveler_type, i) {
    return $(`div[data-hook="travelers-form_${traveler_type}_${i}_suffix"]`);
  }

  setSuffix(suffix) {
    return $(`//div[contains(text(),"${suffix}")]`);
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

  async fillDetails(travelerType, count) {
    const firstNames = [];
    const lastNames = [];
    const middleNames = [];
    const dobDays = [];
    const dobYears = [];
    const emails = [];
    const phones = [];

    for (let i = 0; i < count; i++) {
      firstNames.push(this.getRandomString(5));
      lastNames.push(this.getRandomString(5));
      middleNames.push(this.getRandomString(3));
      dobDays.push(Math.floor(Math.random() * 28) + 1);
      dobYears.push(Math.floor(Math.random() * (2005 - 1970 + 1)) + 1970);
      emails.push(this.getRandomEmail());
      phones.push(this.getRandomPhoneNumber());
    }

    for (let i = 0; i < count; i++) {
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const gender = ["male", "female"][Math.floor(Math.random() * 2)];
      
      await this.firstName(travelerType, i).setValue(firstNames[i]);
      await this.middleName(travelerType, i).setValue(middleNames[i]);
      await this.lastName(travelerType, i).setValue(lastNames[i]);
      await this.suffix(travelerType, i).click();
      await this.setSuffix(suffix).click();
      await this.gender(travelerType, i, gender).click();
      await this.month(travelerType, i).click();
      await this.setMonth(i, dobMonths).click();
      await this.day(travelerType, i).click();
      await this.setDay(i, dobDays).click();
      await this.year(travelerType, i).setValue(dobYears[i]);
      if (travelerType === "adults") {
        await this.email(i).setValue(emails[i]);
        await this.phoneNumber(i).setValue(phones[i]);
      }
    }
  }

  async fillDetails_Adults() {
    await this.fillDetails("adults", no_of_adults);
  }

  async fillDetails_Children() {
    await this.fillDetails("children", no_of_children);
  }

  async fillDetails_Infant_In_Seat() {
    await this.fillDetails("infantsInSeat", no_of_infants_in_seat);
  }

  async fillDetails_Infant_In_Lap() {
    await this.fillDetails("infantsInLap", no_of_infants_in_lap);
    
    await browser.pause(3000);
  }
}

module.exports = new Travelers();
