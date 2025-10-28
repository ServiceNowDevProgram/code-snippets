Use the script provided in script_include.js and script.js to set fetch multiple values from server to client side by passing an
object from server to the client side and setting values on your form. This can be used to pass multiple parameters from server to
client side.

Use Case:
Consider you have a reference field on your form referring to "sn_si_incident" and you need to set Severity, state and assigned to
onChange of the reference field.

Solution:
Create a client callable script include as mentioned in script_include.js and pass the required values to your client script.
Then use the onChange client script in script.js to set values on the form.
