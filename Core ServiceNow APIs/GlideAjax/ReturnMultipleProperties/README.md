## Use values from returned object in Ajax call
- With this code snippet, make the ajax call from a client script.
- Replace `HM_Task_Details` with script include name of your choosing.
- Replace `sysparm_tableName` & `sysparm_recordID` with variable names from script include function. (can add as many as needed).
- Replace second argument (next to `sysparm_name`) with name of funtion from script include you would like to call. 
- In callback function use obj to access the property values of that object as shown in snippet.