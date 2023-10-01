//Remember to run this in the global scope

var getBasicAuthGR = new GlideRecord('basic_auth_credentials');
getBasicAuthGR.get('INSERT_SYS_ID');
 
var Encrypter = new GlideEncrypter();  

var decryptedPassword= Encrypter.decrypt(getBasicAuthGR.password);

gs.info("password is: " + decryptedPassword);//Remember this also ends up in the logfile.
