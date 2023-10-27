
# Recently Viewed Items

This is a modification to the out-of-the-box Homepage Search widget that displays the users 3 most recently viewed items under the search bar.

![alt text](["https://github.com/captainbraddles/code-snippets/blob/Service Portal Widgets/Recently Viewed Items/Recently viewed widget.png?raw=true"](https://github.com/captainbraddles/code-snippets/blob/554df81b4d4ca9e73efd1e4368842b1d87acb425/Service%20Portal%20Widgets/Recently%20Viewed%20Items/Recently%20viewed%20widget.png))

## Description

This script can be added to a scheduled job to deactivate and reactivate catalog items and/or record producers. An example of a use case is where maintenance is being performed which will involve a system outage so certain forms that might rely on an integration with that system need to be disabled during the maintenance window.

## Getting Started

### Dependencies

* None

### Execution

1. Create a scheduled job that automatically runs a script of your choosing.
2. Configure the scheduled job to run at the relevant time (see image for example).
3. Copy the script from deactivate-reactivate-cat-item.js into the 'Run this script' field.
4. Modify the variables as required:
    * Add or remove variables to capture all of the catalog items that need to be deactivated/reactivated.
    * Ensure the sys_id of the catalog item is set as the variable value.
5. Update the array list on line 8 to include the variables you want to use.
6. Set the value of the active flag on line 11 to 'false' to deactivate the catalog item or 'true' to activate the catalog item.
7. Save the scheduled job and it will run once the trigger condition is met.

### Additional Information
If you are setting a deactivate scheduled job for a maintenance window, make sure you create a second scheduled job to reactivate the catalog items once the maintenance window is closed.

## Authors

Brad Warman

https://www.servicenow.com/community/user/viewprofilepage/user-id/80167

## Version History

* 0.1
    * Initial Release
