Over time, your code spreads across dozens of artifact types and it becomes very difficult to keep track of it all. 

The whole thing is made more difficult by the fact that JavaScript code is not always contained in pure script fields but also, for example, in conditions or even in JSON payloads. 

Fortunately, there is a code search - for example in the ServiceNow Studio, via the UI page "CodeSearchExampleUse" or with the help of the browser extension "SN Utils".

However in a baseline instance the code search in your covers about 31 tables and their fields only. If you want to search all available tables and script-related fields, you can execute my script `add_more_tables_to_code_search`. It determines in the dictionary all potential candidates that could hold JavaScript code and add them to the code search base.
