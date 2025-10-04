var emptyGroupMembers=[];
var grSysUserGroup = new GlideRecord('sys_user_group');
grSysUserGroup.addEncodedQuery("active=true");
grSysUserGroup.orderBy('name');
//grSysUserGroup.setLimit(1500);
grSysUserGroup.query();
while (grSysUserGroup.next()) {
        var groupid=grSysUserGroup.getValue('sys_id');
        var groupname=grSysUserGroup.getValue('name');
    var grSysUserGrmember = new GlideAggregate('sys_user_grmember');
grSysUserGrmember.addEncodedQuery("group.active=true^group="+groupid);
grSysUserGrmember.addAggregate('COUNT');
var gcount=0;
grSysUserGrmember.query();
while (grSysUserGrmember.next()) {
     gcount=grSysUserGrmember.getAggregate('COUNT');
if(gcount<1)
{
 
    emptyGroupMembers.push(groupname); // push Group name to array
    //emptyGroupMembers.push(groupid); // pushes groups sys ids

}
}
}


gs.print(emptyGroupMembers +  "zero group count leangth" + "\n");


//gs.print(grSysUserGroup.getRowCount() + " total query group count" + "\n");

//gs.print(emptyGroupMembers +  "zero group count leangth" + "\n");
//gs.print(grSysUserGroup.getValue('name'));
