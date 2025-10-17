Calculate Incident Duration and Validation.

Script Type : Business Rule Trigger: before update Table: incident Condition: Resolved Changes or Opened Changes

Goal : To calculate the duration of a particular record and how much time has been spent on a particular ticket.

Walk through of code :
So when the Resolved Changes or Opened Changes in a particular record to calculate the duration will this Business rule will pull those values
And then check whether the Opened Data/Time is lesser than the Resolved Date/Time the will calculate the duration 
Else it will throw the Error Message and then Abort that action and won't save the record and will clear the values.

