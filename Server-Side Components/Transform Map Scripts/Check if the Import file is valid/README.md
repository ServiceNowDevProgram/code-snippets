**Example use Case:**

Vendor data is periodically imported into ServiceNow via a scheduled data load (import set) sourced from an external application. These files contain only valid vendor records. After the import, any existing vendor records in ServiceNow that are not present in the latest file should be marked as inactive.

**Risk:**

If the incoming file is empty due to an issue in the source application, all existing vendor records in ServiceNow could be incorrectly marked as inactive, resulting in data loss or disruption.

**Solution:**

To prevent this, implement an "onStart" transform script that checks whether the import set contains any data before proceeding with the transformation. If it is found to be empty, the script should:

1. Abort the transformation process.
2. Automatically raise a ticket to the responsible team for investigation.(Optional)


   
This ensures that the existing vendor data in ServiceNow remains unchanged until the issue is resolved.
