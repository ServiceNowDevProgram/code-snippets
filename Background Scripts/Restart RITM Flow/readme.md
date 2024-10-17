# Restart RITM Flow

Restarts a Flow Designer flow for an individual RITM.

## Description

Restart a Flow Designer flow by running restart-ritm-flow.js as a background or fix script. Use the ritmSysId variable to store the sys_id of the RITM for which you want the flow to be restarted. Output is logged to the sys_log table.

## Getting Started

### Dependencies

* Must be in the Global scope.

### Execution

* Copy the script from restart-ritm-flow.js to either a background script or a fix script.
* Set the sys_id of the target RITM in the ritmSysId variable.
* Run the script and the flow will be restarted.

## Authors

Brad Warman 

https://www.servicenow.com/community/user/viewprofilepage/user-id/80167

## Version History

* 0.1
    * Initial Release
