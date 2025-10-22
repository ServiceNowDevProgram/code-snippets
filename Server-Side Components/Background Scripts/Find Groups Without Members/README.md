**Initialize an Array:**
var myGroups = [];

**Create a GlideRecord Object for User Groups:**
var grGroup = new GlideRecord("sys_user_group");

**Add a Query for Active Groups:**
grGroup.addActiveQuery();

**Execute the Query:**
grGroup.query();

**Iterate Through Active Groups:**
while (grGroup.next()) {

**Count Group Members:**
var gaGroupMember = new GlideAggregate("sys_user_grmember");
gaGroupMember.addQuery("group", grGroup.sys_id.toString());
gaGroupMember.addAggregate('COUNT');
gaGroupMember.query();

**Check Member Count:**
var gm = 0;
if (gaGroupMember.next()) {
    gm = gaGroupMember.getAggregate('COUNT');
    if (gm == 0) 
        myGroups.push(grGroup.name.toString());
}

**Print the Results:**
gs.print(myGroups);
