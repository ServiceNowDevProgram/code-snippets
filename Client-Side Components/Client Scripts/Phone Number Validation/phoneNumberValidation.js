function onSubmit() {
 
var phone=g_form.getValue('phone_number_field');//09898989
var pregex=/(0|91)?[6-9][0-9]{9}/;
if(!pregex.test(phone)){
    alert("Enter correct phone number");
    return false;
}
