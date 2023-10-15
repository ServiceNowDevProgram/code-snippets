//Regex to match Poland nine-digit country code phone number
//Format +48XXXXXXXXX

//Regex expression to match Polish phone number
var regPL = /\+48\d{9}$/;

//Array with examples to test regex
var examples = ['123456789', '+48123456789', '+481234567890', '+48123456'];

//Testing different phone numbers to check if they are matching correct format
for (index in examples) {
    if (regPL.test(examples[index])) {
        gs.info('Number: ' + examples[index] + ' match regex.');
    } else {
        gs.info('Number: ' + examples[index] + ' not match regex.');
    }
}
