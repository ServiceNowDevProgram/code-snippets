This is a script include to handle custom mapping, covering a specific case where the SCIM client is using the entitlement attribute to store the user-group-memberships. 

Usage: the script must be invoked from the "SCIM User" ETL definition (installed with the SCIM v2 plugin). 

The main function accepts an array with group names and a user sys_id:

var handler = new SCIMCustomMappingHandler(true);

var ctx = sn_auth.SCIM2Util.getScimProviderCustomizationContext();

var entitlements = ctx.scimResource.entitlements;

var entitlementsList = [];
for (entitlement in entitlements){
entitlementsList.push(entitlements[entitlement].value);
}

handler.handleGroupMemberships(entitlementsList, source.id);
