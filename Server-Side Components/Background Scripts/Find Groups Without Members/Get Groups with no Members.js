var myGroups = [];
var grGroup = new GlideRecord("sys_user_group");
grGroup.addActiveQuery();
grGroup.query();
while (grGroup.next()) {
var gaGroupMember = new GlideAggregate("sys_user_grmember");
gaGroupMember.addQuery("group",grGroup.sys_id.toString());
gaGroupMember.addAggregate('COUNT');
gaGroupMember.query();
var gm = 0;
if (gaGroupMember.next()) {
gm = gaGroupMember.getAggregate('COUNT');
if (gm == 0) 
      myGroups.push(grGroup.name.toString());
}
}
gs.print(myGroups);
