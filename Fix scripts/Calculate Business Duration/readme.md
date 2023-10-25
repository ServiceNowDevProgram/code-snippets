# Calculate Business Duration

Use this script to update the business duration field for records.

## Description

Updates the business duration field for tables such as incident and sc_req_item. The business duration can be determined by using a schedule if required.

## Getting Started

### Dependencies

* This script will only work in the Global scope.

### Execution

* Copy the script from calculate-business-duration.js to either a background script or a fix script.
* If using a schedule, add the sys_id of the required schedule to the selectedSchedule variable.
* Set the table using the table variable.
* Set the encoded query to obtain the records you would like to update. The preconfigured query includes records from January 1, 2022 where the state is either closed or cancelled.
* Run the script.

## Author

Brad Warman

https://www.servicenow.com/community/user/viewprofilepage/user-id/80167

## Version History

* 0.1
    * Initial Release
