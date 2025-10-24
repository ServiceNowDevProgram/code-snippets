/*
This BG script will be helpful to fetch the subscription key for any API to view key value if forget, store and update if required for doc purpose

This will use GlideEncrypter and Decrypter API
*/
var gr = new GlideRecord('api_key_credentials');
        gr.addQuery('name', ' <ENter your Key Name for ex MSFT subscription Key>'); // Replace with your credential name
        gr.query();
        if (gr.next()) {
            var encryptedApiKey = gr.api_key; // Assuming 'api_key' is the field name
            var decryptedApiKey = new GlideEncrypter().decrypt(encryptedApiKey);
            gs.info("Decrypted API Key: " + decryptedApiKey);
        }
