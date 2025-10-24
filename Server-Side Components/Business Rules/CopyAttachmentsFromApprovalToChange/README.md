Copy attahements from Approval Record to corresponding change record.

This BR utilizes GlideSysAttachment API to copy all the attachments at a time. And there is no duplicate prevention enabled as Approval record is generally either approved or rejected one time.

To utilize this script, create an Advanced - After - Insert/Update Business Rule with conditions 
  state :: changes to :: Approved
  state :: changes to :: Rejected

