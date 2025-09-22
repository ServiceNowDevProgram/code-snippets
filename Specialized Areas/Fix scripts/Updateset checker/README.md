# Check all Work in Progress update-sets for Cross Application Scopes
If an update-set has more than one application scope it will cause issues when you are previewing the update-set in the target instance. Therefore, it is the best to check the update-sets before closing and retrieving them to the target instance. 

This sample script, checks all the WIP update-sets and find the update-sets that has more than one Application Scope in them. It will show which update-set and whose update is causing it.