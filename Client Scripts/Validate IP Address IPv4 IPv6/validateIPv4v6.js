// Function to check if the given string
// S is IPv4 or not
function checkIPv4(s) {
// Count the occurrence of '.' in the given string
let cnt = s.split('.').length - 1;

// Not a valid IP address
if (cnt !== 3) {
	return false;
}

// Split the string into tokens
let tokens = s.split('.');

if (tokens.length !== 4) {
	return false;
}

// Check if all the tokenized strings
// lie in the range [0, 255]
for (let token of tokens) {
	// Base Case
	if (token === "0") {
	continue;
	}

	if (token.length === 0) {
	return false;
	}

	// Check if the tokenized string is a number
	if (!/^\d+$/.test(token)) {
	return false;
	}

	// Range check for the number
	if (parseInt(token) > 255 || parseInt(token) < 0) {
	return false;
	}
}

return true;
}

// Function to check if the string
// represents a hexadecimal number
function checkHex(s) {
// Check if the string is a valid hexadecimal number
return /^[0-9a-fA-F]+$/.test(s);
}

// Function to check if the given
// string S is IPv6 or not
function checkIPv6(s) {
// Count the occurrence of ':' in the given string
let cnt = s.split(':').length - 1;

// Not a valid IP Address
if (cnt !== 7) {
	return false;
}

// Split the string into tokens
let tokens = s.split(':');

if (tokens.length !== 8) {
	return false;
}

// Check if all the tokenized strings
// are in hexadecimal format
for (let token of tokens) {
	// Check if the tokenized string is a valid hexadecimal number
	if (!checkHex(token) || token.length > 4 || token.length < 1) {
	return false;
	}
}

return true;
}

// Function to check if the string
// S is IPv4 or IPv6 or Invalid
function checkIPAddress(s) {
// Check if the string is IPv4
if (checkIPv4(s)) {
	console.log("String is IPv4");
}

// Check if the string is IPv6
else if (checkIPv6(s)) {
	console.log("String is IPv6");
}

// Otherwise, log "Invalid"
else {
	console.log("String is Invalid");
}
}

// Example IPv4 string
let S = "192.168.0.1";
checkIPAddress(S);
