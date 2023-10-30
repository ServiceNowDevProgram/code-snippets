# Client scripts using getMessage() function without filling Messages field

**Problem scenario :**
Developers while writing a client script uses getMessage() function but there are no messages preloaded in the 'Messages' field in client script form

**Solution :**
Write an onSubmit client script to check the above scenario and prevent client script submission with an error message on top of the form.

Check the file `script.js` file for example.

Note : As a best practice for this scenario use 'Checks' in the'Instance scan' feature of serviceNow. If Instance scan is not configured in your instance yet or if you want to avoid the problem during development itself then use this client script.
