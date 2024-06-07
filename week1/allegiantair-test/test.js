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
