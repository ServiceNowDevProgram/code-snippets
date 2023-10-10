Introduction :

We have two script includes in here. Main aim for this is to have a generic count function which can be called from all server side scripts and you don’t have to write GlideAggregate every time. It is scripted in such a way that you can pass table name and query dynamically and get the count.

Script Include Significance :
1)	Code.js – This is the generic script include used to return the count of the table passed as parameters.
2)	callingSI.js – This script include shows how to call the code.js script include and how to pass the parameters to get the count dynamically.

Parameters in script include to be passed:
•	Table Name.
•	Query.
•	Sys Id which is mentioned as id in callingSI.js

Output:
Count of records matching the query.
