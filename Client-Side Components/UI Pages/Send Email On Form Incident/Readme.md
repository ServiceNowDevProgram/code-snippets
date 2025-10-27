Send Email On Form for every Record

Script Type: UI Action, Table: incident, Form button: True, Client: True, Show update: True, OnClick: functionName()

Script Type: UI Page Category: General

Script Type: Email Script 

Event Registry : Table: incident, Fired by: UI Page, Event Name: SendEmailInForm
 
Notification : Table: incident, Type: EMAIL, Category: Uncategorized, 

Goal: To Send Email on Form Directly by population some field and then customize the body and trigger it.

Walk through of code: So to send the Email directly on each and every record there will be a UI Action which will help to populate the UI Page which we use some field to be populate in the UI Page directly to the particulat HTML content and these are the fields will be populate (Caller Email as the To and then Short Description as the Subjet of the Email) and othe field will be CC and Body which the user want to decide what data can be filled out and then send.

<img width="1908" height="417" alt="UIAction_INC_fomr" src="https://github.com/user-attachments/assets/0ec5afb2-8375-41b8-a346-4fe5ee55913f" />


UI Page - This will have 5 components
1. To Caller 
2. CC
3. Subject
4. Body
5. Send button
   
<img width="804" height="434" alt="UI Page Email template" src="https://github.com/user-attachments/assets/1d1ff563-7430-4ec3-b391-9f55912ad4e1" />



Once the Send button has been triggered this will call the Processing Script where the event will trigger once this will call the Event Registry event("SendEmailInForm") which we use for this problem statment.Where the Notification will trigger when the Event is fried and then for the email content we uset the Email Script which dynamic content will be populated which we got from the UI page as the event parm2 and then will send the email to the respective caller.

<img width="1477" height="759" alt="Notification_Contains" src="https://github.com/user-attachments/assets/ddc91bbf-aeba-4de2-8db4-2fba9d823fba" />
<img width="1522" height="377" alt="Notification_Receive" src="https://github.com/user-attachments/assets/b2934470-6c90-4b52-be6d-7f2397b8609a" />
<img width="1705" height="952" alt="Notification1" src="https://github.com/user-attachments/assets/d74cfe59-dd3e-42b7-b95a-b0134169b679" />



<img width="808" height="278" alt="Email Preview" src="https://github.com/user-attachments/assets/75d4c1ca-36e8-4e01-8d37-6f1fad0ecfc1" />
