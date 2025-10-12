**Description:**
This Script Include converts a Base64-encoded Active Directory (AD) Object GUID into its corresponding hexadecimal format.
When importing AD objects from an on-premises directory using LDAP, the object GUIDs are typically stored in Base64 format.
However, in OOB integrations such as the AD V2 Spoke, the GUID must be provided in hexadecimal format. 
This Script Include bridges that gap by decoding the Base64 string and converting it into the required hex representation.

**Usage:**
Can be used in the LDAP Transofrm scripts to convert the base64 code to HEX code

**Sample:**

var base64Code ='ayn8QMpHEGezHQDdAQZi2g==';
gs.print(new global.LDAP_AD_Utils().base64ToHex(base64Code));

**Output:**
40fc296b-47ca-6710-b31d-00dd010662da
