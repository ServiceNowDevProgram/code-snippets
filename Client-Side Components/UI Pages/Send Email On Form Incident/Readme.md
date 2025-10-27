Send Email On Form for every Record

Script Type: UI Action, Table: incident, Form button: True, Client: True, Show update: True, OnClick: functionName()

Script Type: UI Page Category: General

Script Type: Email Script 

Event Registry : Table: incident, Fired by: UI Page, Event Name: SendEmailInForm
 
Notification : Table: incident, Type: EMAIL, Category: Uncategorized, 

Goal: To Send Email on Form Directly by population some field and then customize the body and trigger it.

Walk through of code: So to send the Email directly on each and every record there will be a UI Action which will help to populate the UI Page which we use some field to be populate in the UI Page directly to the particulat HTML content and these are the fields will be populate (Caller Email as the To and then Short Description as the Subjet of the Email) and othe field will be CC and Body which the user want to decide what data can be filled out and then send.

UI Page - This will have 5 components
1. To Caller 
2. CC
3. Subject
4. Body
5. Send button

Once the Send button has been triggered this will call the Processing Script where the event will trigger once this will call the Event Registry event("SendEmailInForm") which we use for this problem statment.Where the Notification will trigger when the Event is fried and then for the email content we uset the Email Script which dynamic content will be populated which we got from the UI page as the event parm2 and then will send the email to the respective caller.

