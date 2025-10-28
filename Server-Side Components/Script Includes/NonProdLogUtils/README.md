To create a logging utility in a ServiceNow Script Include that only logs in non-production environments, you can follow these steps:


Create a new Script Include.
Define a utility class with a logging function.
Inside the function, get the instance name and use conditional logic to check if it matches the production instance name.
If the instance is non-production, execute the logging command.
Call this utility from other server-side scripts.


This method centralizes your logging logic, making it easy to manage.
Step 1: Create the Script Include
In the main navigation, type Script Includes and select it under System Definition.
Click New to create a new record.
Fill out the form with the following details:
Name: LoggingUtils
Accessible from: All application scopes (This allows you to call the function from anywhere).
Client callable: Unchecked (This is a server-side utility).




// Instantiate the Script Include
var logUtil = new LoggingUtils();

// Use the log() function to log a message
logUtil.log('Hackertoberfest', 'info');
