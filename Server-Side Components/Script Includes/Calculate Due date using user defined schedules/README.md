**Description:**
This  Script Include  calculates a future due date by adding a specified number of business days to a given start date, based on a defined schedule.
This can be used anywhere within the server side scripts like fix scripts, background scripts, UI Action (server script).

**Pre-requisite:**
A schedule record with valid schedule entries should be created in the cmn_schedule table

**Sample:**
var daysToAdd = 4; // No of days need to be added
var script = new CaclculateDueDate().calculateDueDate(new GlideDateTime(),daysToAdd); // Passing the current date and daysToAdd value to script include
gs.print(script);

**Output:**
*** Script: 2025-10-09 11:23:34
