var regex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
var fieldValue = '919876543210'; // Replace with your field name
if (fieldValue && fieldValue.match(regex)) {
        gs.info('Mobile number is valid.');
    } else {
        gs.info('Invalid mobile number format.');
    }
