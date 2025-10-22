There are use cases where it has been requested to setup an "auto reply" type process within ServiceNow

To accomplish this, you'll need to do 3 steps:
1) Create an event - https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/platform-events/task/t_CreateYourOwnEvent.html
2) Create a notification - https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/notification/task/t_CreateANotification.html:
- Click the "Advanced view" related link on the notification form
- Select the table associated to this process
- Set the "When to send" condition to send when "Event is fired"
- Select your event you created from step 1 within the "Event name" field
- Within the "Who will receive" tab, set the "Event parm 1 contains recipient" checkbox to true
- Within the "What it will contain" tab, set your subject/message, etc.
3) Create or edit an inbound action record to house the script within the code.js file from this code-snippet folder

Additional things to keep in mind is that this setup is recommended for an already established process/inbound action, so you can simply take the script from code.js and add it to your current script at the point where you'd like the email sent. If this is for a new inbound action, select the table that matches the table you set on the notification. You'll want to ensure that the "Execution order" field within the inbound action is set low enough number that this process will not be blocked by other inbound action that was evaluated before it and has its "Stop processing" checkbox set to true. For the inbound action you've created, also ensure the "Stop processing" checkbox is not checked if you require additional inbound actions to evaluate the inbound email and complete other actions.
