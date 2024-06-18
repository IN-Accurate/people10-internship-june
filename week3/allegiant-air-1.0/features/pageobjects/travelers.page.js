const { config } = require('dotenv');
const { resolve } = require('path');

config({ path: resolve(__dirname, '.env') });

class Travelers{

     firstName(i){
        return $(`input[data-hook="travelers-form_adults_${i}_first-name"]`);
    }
     lastName(i){
        return $(`input[data-hook="travelers-form_adults_${i}_last-name"]`);
    }
    
    middleName(i){
        return $(`input[data-hook="travelers-form_adults_${i}_middle-name"]`)
    }
    
    gender(i){
        return $(`label[data-hook="travelers-form_adults_${i}_gender_MALE"]`);
    }
    
     month(i){
        return $(`div[data-hook="travelers-form_adults_${i}_dob-month"]`);
    }
    
    setMonth(i,j){
        return $(`//div[contains(text(),"${j[i]}")]`);
        
    }

     day(i){
        return $(`div[data-hook="travelers-form_adults_${i}_dob-day"]`);
    }

    setDay(i,j){
        
        return $(`//div[contains(text(),"${j[i]}")]`);
    }
     year(i){
        return $(`input[data-hook="travelers-form_adults_${i}_dob-year"]`)
    }

    email(i){
        return $(`input[data-hook="travelers-form_adults_${i}_email"]`);
    }

    phoneNumber(i){
        return $(`input[data-hook="travelers-form_adults_${i}_primary-phone-number"]`);
    }
    
    suffix(i){
        return $(`div[data-hook="travelers-form_adults_${i}_suffix"]`);
    }

    setSuffix(j){
        return $(`//div[contains(text(),"${j}")]`);
    }
    get continueBtn(){
        return $('button[data-hook="travelers-page_continue"]')
    }
    continueToSeatPage=async()=>{
      
        const firstNames = process.env.FIRSTNAMES.split(',');
        const lastNames = process.env.LASTNAMES.split(',');
        const middleNames = process.env.MIDDLENAMES.split(',');
        const suffixes = process.env.SUFFIXES.split(',');
        const dobMonths = process.env.DOB_MONTHS.split(',');
        const dobDays = process.env.DOB_DAYS.split(',');
        const dobYears = process.env.DOB_YEARS.split(',');
        const emails = process.env.EMAILS.split(',');
        const phones = process.env.PHONES.split(',');

        for(let i=0;i<firstNames.length;i++){
            await this.firstName(i).setValue(firstNames[i]);
            await this.middleName(i).setValue(middleNames[i]);
            await this.lastName(i).setValue(lastNames[i]);
            await this.suffix(i).click();
            await this.setSuffix(suffixes[i]).click();

            await this.gender(i).click();

            await this.month(i).click();
            await this.setMonth(i,dobMonths).click();
            await this.day(i).click();
            await this.setDay(i, dobDays).click();
            await this.year(i).setValue( dobYears[i]);
            await this.email(i).setValue(emails[i]);
            await this.phoneNumber(i).setValue(phones[i]);
    }
    await browser.pause(3000);
    await this.continueBtn.click();

    }

}

module.exports = new Travelers();