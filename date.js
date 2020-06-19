
module.exports = getDate;

function getDate(){
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }
  let currentDay = today.toLocaleDateString("en-GB", options);

  return currentDay;
}