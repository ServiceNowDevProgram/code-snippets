**Script Include** 

Script for anonymising data in specified table and chosen fields. You can pass an additional query to limit records which will be cleared. It can be used for example to remove GDPR data from development instances or anonymise old records. It can be used for example in fix script or scheduled job for long-term cleaning. 

**How to execute**

```javascript
//Table name which should be cleared
var table = 'sys_user';

//List of fields from table specified before
var fieldList = ['first_name', 'last_name'];

//Additional query
var query = 'user_nameSTARTSWITHTEST';

var anonymise = new AnonymiseData();
anonymise.anonymiseTable(table, fieldList, query, true);
```

You need to pass 4 parameters to function anonymiseTable

1. tablename - Name of table to be cleared ex. 'sys_user'
2. fieldList - Array of fields name, which should be cleared ex. ['first_name', 'last_name']
3. additionalQuery - Additional encoded query to limit list of records (if you would like to clear whole table just pass empty string)
4. logging - True/False value to determine if logging should be performed during execution

Example of Fix script execution:
 ![Coniguration](ScreenShot_2.PNG)

**Example configuration of Script Include** 

 ![Coniguration](ScreenShot_1.PNG)
 
**Execution logs**

 ![Coniguration](ScreenShot_3.PNG)

**Effect of execution**

 ![Coniguration](ScreenShot_4.PNG)
