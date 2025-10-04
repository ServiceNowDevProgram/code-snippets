A script include to generate payload for testing SCIM-based integration.

The script covers as specific case where user is added/removed to user groups based on the values in the 'entitlements' object of the SCIM payload.

The main function accepts 3 parameters:

groupsToRemove - will check all groups of which the user is currently member and will randomly remove the membership of groups equal to the number passed to the parameter
groupsToAdd - will check all groups to which the is not currently a member and will randomly create membershis for groups equal to the number passed to the parameter
newGroupsToCreate - will create new groups and add the user to them. Group names are concatenation of a prefix and randomly generated string.
The end result of the function is a JSON object that can be directly passed as a payload while testing via REST API explorer or Postman.

Usage: var groupsToRemove = 2; var groupsToAdd = 1; var newGroupsToCreate = 3;

var generator = new GenerateSCIMPayload(); var scimPayload = generator.generateEntitlements(jamesVittoloSysID, groupsToRemove, groupsToAdd, newGroupsToCreate); gs.info(JSON.stringify(scimPayload));
