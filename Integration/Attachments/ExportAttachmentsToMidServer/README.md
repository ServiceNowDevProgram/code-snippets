The snippet can be used to export all attachments within any record in ServiceNow to the mid server. You could specify a relative file path within the server's agent folder and it will copy them into it.

Sample Usage

exportAttachmentsToMid("66a4daff2f9ff810ba1b52492799b6f1", "\\Incident\\INC00293930", "Mid Server 01");
