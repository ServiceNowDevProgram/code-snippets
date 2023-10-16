# Dynamic Visible UI Actions

This code snippet can be used to dynamically change the visibility of an UI action via a Client Script or UI Policy.
As this happens on the client, it happens without the need of saving/reloading the form like you'd have to do if controlled via the UI Action's condition field (server-side). 

As this uses DOM manipulation you might have to uncheck the "Isolate Script" field on the Client Script or UI Policy to make it work or make sure you have a system property "glide.script.block.client.globals" with a value of false if you're in a scoped application.

**Note**: DOM manipulation should be used with caution. 




