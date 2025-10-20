getLoggedUserCountryLocs Script Include

# HOW TO USE IT?

The **getLoggedUserCountryLocs** Script Include is a custom ServiceNow utility that retrieves all users who belong to the same **country** as the **currently logged-in user**.  

It performs this by:
1. Fetching the logged-in user's country (based on their location record).
2. Identifying all location records that belong to the same country.
3. Gathering all users assigned to those locations.
4. Returning a GlideRecord-encoded query string (`sys_idIN...`) that can be used to filter or query other records.
