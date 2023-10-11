Usage : Executes a business rule to find duplicate execution orders in ATF.
Executes on table sys_atf_test

The business rule consists of two main parts:

executeRule Function:
  Executes the business rule logic when a specific event occurs.
  It checks for duplicate execution orders within ATF and generates an error message if duplicates are found.

testDuplicateTestStepExectionOrder Function:
  A helper function responsible for identifying duplicate execution orders.
  Returns an array of active tests that contain at least two active test steps with the same execution order.
