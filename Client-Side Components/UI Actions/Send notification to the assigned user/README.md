Please note - Users should endeavor to use Flow, Notifications, etc., but UI Action option is also available.
-------------------------------------------------------------------------------------------------------------------------------------------
A UI Action in ServiceNow is a script that defines an action or button within the platform's user interface. It enables users to perform specific operations on forms and lists, such as creating, updating, or deleting records, or executing custom scripts. UI Actions enhance the user experience by providing functional buttons, links, or context menus.

In this case, the UI Action contains a server-side script that creates a record in the sys_email table, including the email body, subject, and recipient details.
When the button on the incident form is clicked, an email notification will be sent to the user to whom the incident is assigned.

-> If the incident is not assigned to any user, a message will be shown, and no email will be sent.
-> If the assigned user's email address is missing, the email will not be sent, and an appropriate message will be displayed.
-> However, if the incident is assigned to a user with a valid email address, the UI Action will successfully send the email to the assigned user.
