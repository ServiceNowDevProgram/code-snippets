/* Translate messages according to the logged in user's preferred language in client script using getMessage() method.
   Note: Make sure to add an entry under [sys_ui_message] table and add the key in your client script Message fied (Not available in form by default) for preventing an extra round trip to server for fetching the message.

 Code :- */

var msg = getMessage('message_key'); //message_key defined in [sys_ui_message] table and added to the Message field of the client script. Fetching and storing the translated message to msg variable.
g_form.addInfoMessage(msg); // Showing the translated message as an info message.
