# Save Email Text as Attachment

### Steps:

Navigate to System Definition \ Script Includes and click New.
Set the following values:<br />
**Name:** emailAsAttachmentUtil<br />
**Accessible from:** All application Scopes = this will allow it to be called by all applications<br />
**Active:** checked<br />
**Description:** You may want to set the description to something like the following to document what this script includes does and how to call it<br />

* [Click here for Script include script](script.js)

**Example of calling a script include from the Inbound action**
```js
//This utility script will take contents from an inbound email and create an attachment on the created record from the inbound email action.  To utilize this script, add the following lines at the end of the inbound email action script:
var emailAsAttachment = new global.emailAsAttachmentUtil();
emailAsAttachment.createAttachment(email, current);
```


