var digitLengthRegex = /^\d{10}$/;  // Matches exactly 10 digits

var elevenString = '01234567899'; // 11 digits
var tenString = '0123456789';     // 10 digits
var nineString = '012345678';     // 9 digits

gs.info(digitLengthRegex.test(elevenString)); // false
gs.info(digitLengthRegex.test(tenString));    // true
gs.info(digitLengthRegex.test(nineString));   // false
