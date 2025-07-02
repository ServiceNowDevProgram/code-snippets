This action script will execute the scheduled import via a flow action.

Inputs are  - 'importSet'  - the sys_id of the scheduled import set  - mandatory

Outputs are - 'returnerror'- true if no import set found             - mandatory

We found this useful when triggering a data import from a catalog item. User attaches the import file to catalog item and submit, which triggers flow, which then
had this action to import the file using the right import set.
