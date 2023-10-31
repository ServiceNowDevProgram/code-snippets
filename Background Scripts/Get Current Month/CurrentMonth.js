var currentDate = new GlideDate();
var monthNumber = currentDate.getMonth();
var monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "OCT", "Nov", "Dec"
];

var monthName = monthNames[monthNumber - 1]; 
gs.log(monthName);
