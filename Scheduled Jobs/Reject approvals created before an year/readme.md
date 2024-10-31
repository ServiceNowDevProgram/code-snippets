**Creating a GlideRecord Object:**
var grAppr = new GlideRecord("sysapproval_approver");

**Adding an Encoded Query:**
grAppr.addEncodedQuery("sys_created_on<javascript:gs.beginningOfLast12Months()^state=requested");

**Executing the Query:**
grAppr.query();

**Iterating Through the Results:**
while(grAppr.next()){

**Updating the State:**
grAppr.setValue('state', 'rejected');
grAppr.update();
