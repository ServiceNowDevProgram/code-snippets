//Remember to run this in the global scope

//Get the record that has the password2 field.
var getBasicAuthGR = new GlideRecord('basic_auth_credentials');
getBasicAuthGR.get('INSERT_SYS_ID');

//Decrypt the password and show it.
var Encrypter = new GlideEncrypter();  
var decryptedPassword= Encrypter.decrypt(getBasicAuthGR.password);

gs.info("password is: " + decryptedPassword);//Remember this also ends up in the logfile.
