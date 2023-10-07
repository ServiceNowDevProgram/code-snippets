We have a ServiceNow api to parse Excel file(GlideExcelParser) however it wouldn't work for parse CSV as a file (not a CSV string using "sn_impex.CSVParser()")
there is a alternate way read csv logic.js logic parse the CSV as file and can read all the rows/columns
this can be used in any server side scripting , just need to pass the attachment sys_id
This comes very handy when your receving a CSV as email to serviceNow and need to update records based on incoming CSV file vales
Ex:input CSV:![image](https://github.com/gowdah/code-snippets/assets/42912180/8771760e-babe-4a98-82b7-b13b9a0631aa)

ex:output:XYZ,abc,Hemanth
