This is a UI Action that creates an Incident using the field values of the current Request and closes the Request as "Closed Skipped".
It also compliles all the worknotes and comments into a single worknote on the Incident.

This action has an OnClick function as well as a server-side function that runs using:

if (typeof current != 'undefined')

The OnClick function opens a confirmation window to protect against misclicks.

Setting up the UI Action:

![alt text](https://github.com/ezratkim/code-snippets/blob/main/UI%20Actions/Convert%20Request%20to%20Incident/UIActionScreenshot.png)
