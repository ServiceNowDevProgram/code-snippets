var Encrypter = new GlideEncrypter();  
var encrypted = glideRecordVar.getValue('password'); // current.<<your field name>>   
var decrypted = Encrypter.decrypt(encrypted);  
gs.info("decrypted..   " + decrypted);