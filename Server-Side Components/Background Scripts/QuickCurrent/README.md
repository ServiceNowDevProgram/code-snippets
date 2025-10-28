# QuickCurrent

I use this all the time to test out workflow or business rule script logic without having to go through end-to-end testing of a catalog item workflow or fill out mandatory fields or approvals multiple times just to make sure a complex script has the desired output.

By having a quick snippet to create a "current" variable, there is no need to modify the script that may be retrieving or setting values on "current" in the workflow or business rule.

## Use

1. Create the desired record and ensure all needed values are filled in.
2. Enter the table name in the **table** variable (sc_req_item is default)
3. Copy and paste the sys_id from the test record into the **sid** variable
4. Paste script below the comment and run to see if it works as expected
