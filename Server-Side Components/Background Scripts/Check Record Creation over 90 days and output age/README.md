**Usecase**:
This piece of code can be used to check whether a record was created more than 90 days ago or not.
It returns an output of true/false as well as the actual age (in days) of the record.

**Type**: 
Background Script

**How it works**:
There is a pastDateString variable which can contain a date-time which you received by querying any particular record's sys_created_on field or any other relevant field. 
In the actual code I have hard-coded a value to be used as an example.
-There are two gliderecord objects to store the current date as well as past date
-GlideDateTime.subtract() is used to calculate the time difference as a GlideDuration object
-The time duration in milliseconds is converted to days by dividing with 86400000(milliseconds in a day)
-Comparison is done between the results
-The final age of the record and true/false result of the comparison is the output.
[Note: Output may vary according to timezones]

**Example**:
pastDateString = 2025-05-01 10:00:00
Output:

    Record Age (Days): 165
    Older than 90 days? true
