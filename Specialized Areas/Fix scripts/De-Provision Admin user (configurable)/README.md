Objective:

The purpose of this standalone fix script is to routinize the common sysadmin task of stripping admin access from an account. The de-provisioning process is going to be different for every organization, but it is often useful to have a repeatable, predictable technical solution for literally stripping an account of its rights in the event of an organizational change or security incident.

Note that fix scripts are typically intended to be associated with things that need to be done after an application is installed or upgraded, and it might not be considered 'best practice' to use a fix script for a one-time administrative task such as this, particularly one that is not really very difficult to perform by way of form action. Again, the goal for storing a script object like this on the instance is to have a repeatable, easily examined technical solution for completing the task, but if that is a desired thing to have it might be better to migrate this code into a UI Action associated with the Users table. Having it as a fix script is simply a convenient, low-impact solution.

Usage:

As written the script is designed to be updated once for each use. Modify the variables at the top of the script to meet the needs of the current de-provisioning event. Clicking on the 'Proceed' choice when running this has a fix script will provide some informative output.

'target' is the user ID the Users table account record to be de-provisioned

'admin_roles' lists all of the roles to be considered in scope for the script. If the deprovision_level variable is set to 2 (as described below) these will be the only roles stripped from the account.

'deprov_level' sets the depth of the de-provisioning activity, and the comments describe valid value. This variable is included in order to make the script flexible enough to be used for a range of sysadmin tasks, from simply reviewing what level of access the account has to completing stripping it of all roles and groups. Note that this script is not designed to delete an account record.

'deprov_result_msg' includes the text that will be written to the system log (and outputted when running the fix script interactively)

