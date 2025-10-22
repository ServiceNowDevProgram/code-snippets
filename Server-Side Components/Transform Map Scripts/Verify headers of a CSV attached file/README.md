# Checking we have the right headers in a CSV file we want to transform

Making sure we're dealing with the right headers in a CSV file we want to import can be handy, especially in an automated CSV file transform process.

This snippet takes a Data Source, read the attachments (assumed being CSV here) and make sure the first line contains the right headers (passed as a variable). It can also make sure no headers are missing. Being sure we have the right headers can make the Transform Map scripts a lot easier to develop.

There is an example of CSV file with this code snippet (example.csv). To test this code snippet, attach the file to any data source record, get its sys_id and update the script accordingly.

Output should be like this:
```
*** Script: [DEBUG] File example.csv:
*** Script: [DEBUG] The following columns are unknown: "Middle Name", "Age", "City"
*** Script: [DEBUG] The following columns are missing: "Country"
```