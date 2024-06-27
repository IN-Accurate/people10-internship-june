const fs = require("fs");

const data = JSON.parse(fs.readFileSync("testdata.json", "utf8"));

class Seats {
  async continueToBagsPage() {
    let continueBtn = await $('button[data-hook="seats-page_continue"]');
    await continueBtn.click();
  }

  async findSeatAvailable(data_hook) {
    let seatsAvailable = [];
    try {
      switch (data_hook) {
        case "select-economy-seat_unrestricted":
          for (let j = 18; j < 31; j++) {
            for (let i = 'A'; i <= 'F'; i = String.fromCharCode(i.charCodeAt(0) + 1)) {
              let button_selector = data_hook + "_" + j.toString() + i;
              let seatButton = await $(
                `//button//span[contains(@data-hook,'${button_selector}')]`
              );
              if (await seatButton.isExisting() && await seatButton.isClickable()) {
                seatsAvailable.push(button_selector);
              }
            }
          }
          break;
        case "select-legroom-plus-seat_unrestricted":
          break;
        case "select-legroom-plus-seat_exit-row":
          break;
        case "select-legroom-plus-seat_front":
          break;
        default:
          console.log("INVALID OPTION!");
      }
    } catch (error) {
      console.error("Error finding seat buttons:", error);
    }
    return seatsAvailable;
  }

  async selectSeats(seatsAvailable) {
    let adults = parseInt(data.no_of_adults);
    let children = parseInt(data.no_of_children);
    let infantsInSeat = parseInt(data.no_of_infants_in_seat);
    let requiredSeats = adults + children + infantsInSeat;
    let selectedSeats = [];

    let cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    let adultIndex = 0;

    for (let k = 0; k < cols.length && adultIndex < adults; k++) {
      for (let j = 18; j < 31 && adultIndex < adults; j++) {
        let col = cols[k];
        let seat = `select-economy-seat_unrestricted_${j}${col}`;
        if (seatsAvailable.includes(seat)) {
          selectedSeats.push(seat);
          seatsAvailable.splice(seatsAvailable.indexOf(seat), 1);
          adultIndex++;
        }
      }
    }

    let childIndex = 0;
    let infantIndex = 0;
    for (let seat of selectedSeats) {
      if (childIndex < children) {
        let childSeat = this.findAdjacentSeat(seatsAvailable, seat);
        if (childSeat) {
          selectedSeats.push(childSeat);
          seatsAvailable.splice(seatsAvailable.indexOf(childSeat), 1);
          childIndex++;
        }
      }
      if (infantIndex < infantsInSeat) {
        let infantSeat = this.findAdjacentSeat(seatsAvailable, seat);
        if (infantSeat) {
          selectedSeats.push(infantSeat);
          seatsAvailable.splice(seatsAvailable.indexOf(infantSeat), 1);
          infantIndex++;
        }
      }
    }

    if (selectedSeats.length === requiredSeats) {
      console.log("\nSELECTED SEATS:\n--------------------------");
      for (let seat of selectedSeats) {
        console.log("\n" + seat);
        let seatButton = await $(
          `//button//span[contains(@data-hook,'${seat}')]`
        );
        if (await seatButton.isExisting() && await seatButton.isClickable()) {
          await seatButton.click();
        }
      }
      return;
    }
    console.log("Not enough seats available to meet the requirements.");
  }

  findAdjacentSeat(seatsAvailable, seat) {
    let row = parseInt(seat.match(/\d+/)[0]);
    let col = seat.match(/[A-Z]/)[0];
    let adjacentCols = this.getAdjacentCols(col);
    for (let adjacentCol of adjacentCols) {
      let adjacentSeat = `select-economy-seat_unrestricted_${row}${adjacentCol}`;
      if (seatsAvailable.includes(adjacentSeat)) {
        return adjacentSeat;
      }
    }
    return null;
  }

  getAdjacentCols(col) {
    let cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    let colIndex = cols.indexOf(col);
    let adjacentCols = [];
    if (colIndex > 0) adjacentCols.push(cols[colIndex - 1]);
    if (colIndex < cols.length - 1) adjacentCols.push(cols[colIndex + 1]);
    return adjacentCols;
  }

  async selectSeat(seat_type) {
    let data_hook = "";
    if (seat_type === "Economy") data_hook = "select-economy-seat_unrestricted";
    else if (seat_type === "Legroom_plus")
      data_hook = "select-legroom-plus-seat_unrestricted";
    else if (seat_type === "Legroom_plus_exit")
      data_hook = "select-legroom-plus-seat_exit-row";
    else if (seat_type === "Front_row")
      data_hook = "select-legroom-plus-seat_front";

    console.log("DATA HOOK ------------------------------------- ", data_hook);
    let seatsAvailable = await this.findSeatAvailable(data_hook);
    await this.selectSeats(seatsAvailable);
  }
}

module.exports = new Seats();
