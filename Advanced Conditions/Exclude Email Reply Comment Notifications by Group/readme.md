# Exclude Email Replies from Comment Notifications based on Group Membership

### This is an advanced condition script for new comment notifications that will exclude new comments that are email replies for specific groups.  

Step 1.
Specify the user field such as assigned_to, caller_id, or opened_by, etc in the line of code below:

```js 
var groupMember = current.getValue('assigned_to'); //get value of the desired field
```

Step 2.
Specify the group name such as Service Desk, Network Team, or CAB Approvers etc in the line of code below:

```js
if (groupMember.isMemberOf('Special Group')) { //check if membership is true
```
