
// Format Phone Number in standard format 4-3-3 example if phone is  1234567891  then output will be 1234 567 891


function normalize(phone) {
  //normalize string and remove all unnecessary characters
  phone = phone.replace(/[^\d]/g, "");
  //check if number length equals to 10
  if (phone.length == 10) {
      //reformat and return phone number
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  return null;
}

//Example for Background scripts
var k = '1234567891';
k = k.substring(0, 10);
var phone = normalize(k);
gs.info(phone)
