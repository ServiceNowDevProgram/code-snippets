Created a background script to prevent unnecessary notifications from being sent out. 
It helps in managing the volume of emails being sent so that we do not send the notifications even by mistake. 
This script is mostly used in dev or uat to avoid any notifications being sent from lower instances.

We are querying the sys_email table to find all the emails with below queries:
--> emails with state as "ready"
--> emails that were created on today (optional query, if not added all the mails with state as "ready" will be considered for getting ignored.) 

Post query we are setting as below:
--> state of the email to "ignored"
--> type of the email to "send-ignored"

After setting the fields we are updating the records.

Please be cautious while using the script in Production environment.
