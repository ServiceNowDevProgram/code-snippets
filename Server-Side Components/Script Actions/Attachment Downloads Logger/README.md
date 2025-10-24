# Attachment Downloads Logger

A ServiceNow utility that logs attachment download activities by adding comments to the work notes of the associated record, enhancing visibility and ensuring compliance.

## Challenge

Tracking attachment downloads in ServiceNow can be critical for maintaining data security and compliance. Without proper logging, it becomes difficult to identify who accessed sensitive information and when. This utility addresses this challenge by providing an automated solution to log attachment download activities directly in the work notes of the record.

This tool is particularly useful in scenarios where data access needs to be monitored for compliance purposes or to ensure accountability in data handling.

## Description

The Attachments Download Logger Script Action is designed to automatically add work note of a record whenever an attachment is downloaded. This ensures that all attachment access activities are logged, providing a clear audit trail for administrators and compliance officers.

## Functionality

The Attachments Download Logger Script Action provides the following capabilities:
- Automatically logs attachment download activities in the work notes of the associated record.
- Captures details such as the user who downloaded the attachment and the timestamp and what attachment was downloaded.
- Enhances visibility into data access activities for better compliance and accountability.
- Operates seamlessly in the background without requiring manual intervention.

## Usage Instructions


### Creating the Script Action

To create the Script Action for the Attachment Download Logger, follow these steps:

1. Navigate to **System Policy > Events > Script Actions** in your ServiceNow instance.
2. Click on the **New** button to create a new Script Action.
3. Fill in the following fields:

    - **Name**: `Add worknote for attachment download`
    - **Event Name**: `attachment.read`
    - **Active**: `true`
    - **Order**: `100` (or any appropriate order value based on your instance configuration)
    - **Script**:
      ```javascript
      //Add the attached script action code 
     
      ```

4. Click **Submit** to save the Script Action.

This Script Action will now automatically log attachment download activities in the work notes of the associated record.



### Customizations 

You can customize the script to include additional details, such as the IP address of the user or the reason for the download. Additionally, you can restrict the logging functionality to specific tables or user roles based on your requirements.

If you want to restrict the logging functionality to a specific table, you can use the `current.table_name` property in your script. For example, to apply the logging only to the `incident` table, you can add the condition in the **condition Script** field as below.

```javascript
current.table_name == 'incident'
```

This ensures that the logging functionality is executed only for records in the `incident` table.


## Category

Server-Side Components / Script Actions / Attachment Downloads Logger

## Screenshots
<img width="1256" height="132" alt="2025-10-23_22-57-59" src="https://github.com/user-attachments/assets/dbd95461-2b81-40d8-9425-f3c98e724dd1" />
