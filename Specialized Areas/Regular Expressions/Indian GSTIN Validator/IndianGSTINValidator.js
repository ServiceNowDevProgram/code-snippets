
function isValidGSTNo(str) {
    // Regex to check valid GST CODE
    var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    // GST CODE is empty return false
    if (str == null) {
        return "false";
    }

    // Return true if the GST_CODE matched the ReGex
    if (regex.test(str) == true) {
        return "true";
    }
    else {
        return "false";
    }
}

// Test Case 1:
var str1 = "33AAACH1645P2ZH";
gs.print(str1 +' isValidGSTNo '+isValidGSTNo(str1));

// Test Case 2:
var str2 = "06BZAF67";
gs.print(str2 +' isValidGSTNo '+isValidGSTNo(str2));

// Test Case 3:
var str3 = "AZBZAHM6385P6Z2";
gs.print(str3 +' isValidGSTNo '+isValidGSTNo(str3));

// Test Case 4:
var str4 = "36AAICG1508J1ZN";
gs.print(str4 +' isValidGSTNo '+isValidGSTNo(str4));

// Test Case 5:
var str5 = "27AAUCS0795B1Z0";
gs.print(str5 +' isValidGSTNo '+isValidGSTNo(str5));


/*
When you run this code, it will output:
*** Script: 33AAACH1645P2ZH isValidGSTNo true
*** Script: 06BZAF67 isValidGSTNo false
*** Script: AZBZAHM6385P6Z2 isValidGSTNo false
*** Script: 36AAICG1508J1ZN isValidGSTNo true
*** Script: 27AAUCS0795B1Z0 isValidGSTNo true
*/
