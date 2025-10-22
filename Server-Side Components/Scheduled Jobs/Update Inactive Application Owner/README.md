This code snippet will update the owner of application records in the cmdb_ci_appl table where the current owner is inactive. It specifically sets the owner to the manager of that inactive owner, ensuring that each application has an active owner assigned.

**GlideRecord Initialization:**
var grApp = new GlideRecord("cmdb_ci_appl");

**Query for Inactive Owners:**
grApp.addEncodedQuery("owned_by.active=false");

**Executing the Query:**
grApp.query();

**Iterating Through Records:**
while(grApp.next()){

**Getting the Manager’s Sys ID:**
var managerSysId = grApp.owned_by.manager.toString();

**Updating the Owner:**
if (managerSysId) {
    grApp.owned_by = managerSysId;
    grApp.update();
}
