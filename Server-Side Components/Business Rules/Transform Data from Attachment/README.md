Loading data into ServiceNow without needing admin privileges

This BR script enables any user to process data from an excel file by attaching that file to a record.

Pre-requisites:
A sys admin needs to create the following objects in SN first. The easiest way to do this is to load sample data using an excel file in the same format as the one that will be used by the user:
1. Importset table
2. Transform Map
3. Data Source
4. A table to house all the files that will be loaded

All the other explanations on the use of the code is in the script itself
