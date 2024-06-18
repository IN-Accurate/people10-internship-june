// Legroom + Exit Rows - rows have a classname - Row-sc-83lwzk-0 ktEtbi
//Economy rows have a classname - Row-sc-83lwzk-0 hrswgB

//when taken - select-legroom-plus-seat_front_taken_3E
// for available seats there is a button, while for unavailable seats there is a div with an svg

class Seats {
  // Section__Seats-noco0i-2 jRWEBs

  availableSeat = async () => {
    let seatRows = await $$("ul.Section__Seats-noco0i-2.jRWEBs");
    let travelerCount = 0;

    for (let row of seatRows) {
      let seatList = await row.$$("li");

      for (let li of seatList) {
        if (travelerCount == 2) break;

        let button = await li.$("button");
        if (button) {
          let isButtonAvailable = await button.isClickable();
          if (isButtonAvailable) {
            let span = await button.$("span");
            if (span) {
              let dataHook = await span.getAttribute("data-hook");
              if (dataHook && !dataHook.includes("taken")) {
                travelerCount++;
                console.log(travelerCount);
                await button.click();
              }
            }
          }
        }
        if (travelerCount == 2) break;
      }

      if (travelerCount == 2) break;
    }
    if (travelerCount == 2) return true;
  };

  get continueToBagsBtn() {
    return $('button[data-hook="seats-page_continue"]');
  }
  continueToBags = async () => {
    if ((await this.availableSeat()) == true) {
      let continueToBagsBtn = await this.continueToBagsBtn;
      await continueToBagsBtn.waitForClickable();
      await continueToBagsBtn.click();
    }
  };
}

module.exports = new Seats();
