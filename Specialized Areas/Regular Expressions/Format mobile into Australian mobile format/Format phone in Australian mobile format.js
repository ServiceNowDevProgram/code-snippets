/*
    We have a phone number in +61433394881 and we want to format it in
    0433 394 881 style
*/

var phone = "61433394881"; // Mobile number with country code

// Split the number by country code
var splits = phone.split("61");

var mobileNumberOnly = splits[1];

var mobile = '';

// Remove space etc
var cleaned = ('' + mobileNumberOnly).replace(/\D/g, '');

// Check if the input is of correct length
var match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);

if (match) {
	// Format the mobile phone in XXXX XXX XXX format
	mobile = ( "0" + match[1] + ' ' + match[2] + ' ' + match[3]);
}else {
    throw new Error("Phone number cannot be formatted as XXXX XXX XXX.");
}


gs.log("Mobile phone: " + mobile);

