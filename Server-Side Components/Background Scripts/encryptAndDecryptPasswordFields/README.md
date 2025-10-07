Generally when you want to encrypt or decrypt any Non-password fields earlier we have Glide Encrypter API methods for encryption and decryption. 
The GlideEncrypter API uses 3DES encryption standard with NIST 800-131 A Rev2 has recommended against using to encrypt data after 2023. 
ServiceNow offers alternative cryptographic (Key Management Framwork) solutions to the GlideEncrypter API. 

Note: ServiceNow recommending to deprecate GlideEncrypter API with in the instances as soon as possible. The actual dead line is September 2025.

These are the sample scripts I ran in my PDI: For Non-password fields. I used AES 256 algorithm for Symmetric Data Encryption/Decryption.

To test the scripts you need to create Cryptographic module and generate the key. 

"global.vamsi_glideencrypter" is my cryptographic module name.