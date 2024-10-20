This script will create a dynamic HTML table in a ServiceNow email notification by scripting within the email notification's template. 

If you want to send a notification that includes a table of related incidents for a specific problem record and the he table should include the incident number, short description, and state. 
1. Navigate to System Notification > Email > Notification and create or edit an existing notification.
2. In the **What it will contain** tab, use the following script in the Message HTML section:

html
<html>
<body>
  <p>Hello ${current.opened_by.name},</p>
  <p>The following incidents are related to Problem ${current.number}:</p>

  <table border="1" style="width:100%; border-collapse: collapse;">
    <tr>
      <th>Incident Number</th>
      <th>Short Description</th>
      <th>State</th>
    </tr>
    ${mail_script:incidentTable}

    <p>Best regards,<br/>Your IT Team</p>
  </table>
</body>
</html>

Now, for the Javascript code,refer the mailScript.js file

