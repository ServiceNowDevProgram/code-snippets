//For Non-password fields Encryption syntax using Key Management Framework Cryptographic module

var password = "Hello World";
var encryptOp = new sn_kmf_ns.KMFCryptoOperation("global.vamsi_glideencrypter", "SYMMETRIC_ENCRYPTION")
 .withInputFormat("KMFNone");
var encryptedText = encryptOp.doOperation(password); //Encrypting Hello world
gs.info("After Encryption: " + encryptedText);


//For Non-password fields Decryption syntax using Key Management Framework Cryptographic module

var encryptOp = new sn_kmf_ns.KMFCryptoOperation("global.vamsi_glideencrypter", "SYMMETRIC_DECRYPTION")
 .withOutputFormat("KMFNone");
var clear_text = encryptOp.doOperation('   91ddbb5d47c012101b589d2f316d4380  1  2p3lgrR72vEQW5yLk-WXKQ==aGqxYzUXuyLt3HTqcW6-HA==  '); //Pass Cipher text of Hello World
gs.info("After decryption: " + clear_text);
