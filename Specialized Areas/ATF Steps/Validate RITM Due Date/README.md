## Description:
This script will calculate a due date for a RITM based off of the delivery date of the Catalog Item and validate it matches the actual due date.

## Usage Instructions/Examples:
You can use this in a "Run Server Side Script" ATF test step. This is specfic for RITM's and Catalog Item's with Delivery Times

## Prerequisites/Dependencies:
1) In your ATF Test Case, you need to create a ATF Test Step that does a Record Query for the RITM record before running this script. The sys id of that Record Query Step is used in the scipt to obtain a GlideRecord of the RITM.
2) You need a system property called "glide.sc.item.delivery_schedule" that contains the sys id of a record on the cmn_schedule table that will be used for the due date calculation
