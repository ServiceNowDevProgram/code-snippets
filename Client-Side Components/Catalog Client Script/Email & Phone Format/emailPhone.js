//onSubmit catalog client script Form restriction
function onSubmit(){
var phone = g_form.getValue('preffered_phone');
var mail = g_form.getValue('email_details');
var phnPattern = /^\d{3}-\d{3}-\d{4}/; 
var mailPattern = /^[a-zA-Z0-9._%+1]+@(gmail\.com)$/;

if( phone && !phone.match(phnPattern))
{

alert("Phone number format is not correct");
return false;
}
else if(mail && !mail.match(mailPattern))
  {
alert("Email format is not correct");
return false;
  }
else
{
  return true;
}

}
