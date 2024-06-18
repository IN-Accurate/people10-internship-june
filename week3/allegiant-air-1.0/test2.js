let currentDate=new Date();
console.log(currentDate,"\n");
let currDay = currentDate.toISOString();
console.log(currDay,"\n");
let day = currDay.slice(8,10);
console.log(day,"\n");