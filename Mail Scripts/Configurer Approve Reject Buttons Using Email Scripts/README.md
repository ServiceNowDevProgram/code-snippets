Use Case: Set up Approve and Reject buttons using Email script to Approve/Reject through Email (Use thisv email script on the sysapproval_approver Table Notifications)

1)Upload below images to DB tables in ServiceNow (System UI> Images)and use them in email scripts

Approve Button Image : ![image](https://github.com/user-attachments/assets/a7113ce8-7acf-4c78-af29-dde41a816332)

Reject Button Image: ![image](https://github.com/user-attachments/assets/9b01e1c8-b8f2-4a14-8274-a7d4d4fdbf73)


2)Go to Email Scripts > Click new
3)Add Scripts (Refer Email script file)
4)Call this in email in your Notification by using below syntax below
${mail_script:"name of the email script"}
5)Preview the email verify results

Output: ![image](https://github.com/user-attachments/assets/6c65a977-de11-4abd-918f-a4edeab4b2ce)
