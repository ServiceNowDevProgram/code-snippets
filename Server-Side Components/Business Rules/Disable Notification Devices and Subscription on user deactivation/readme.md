This onAfter business rule script checks for the inactivated user and then disables the notification devices and Notification 
subscriptions of that particular user.

This help us to keep the data aligned, prevent any unnecessary notifications or triggers and enhances data management. It will
also eliminate the manual efforts.


Business Rule Setup:
1. Name: Manage Inactive user Notif Devices [Amend it as suitable]
2. Table: [sys_user]
3. When to run: 'After'  'Update'
4. Condition: 'Active'  'Changes to'  'False'


<img width="1619" height="517" alt="image" src="https://github.com/user-attachments/assets/428b706e-0aee-4b08-9028-58d309bb8c90" />


5. In 'Advanced' section: Paste the script of [disableNotifDevices.js]

<img width="859" height="682" alt="image" src="https://github.com/user-attachments/assets/98ad7122-56ad-48d8-8f1a-43a4727d0ead" />
