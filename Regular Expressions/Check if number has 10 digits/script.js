//This will check if it has 10 digits
var has10Digits = (function(str) {
    //Update the number 10 based on the need
    return /^\d{10}$/.test(str);
})("123456789144");