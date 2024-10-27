var arr=[]; 

var gm = new GlideAggregate('sys_user_grmember');
gm.addAggregate('COUNT','group');
gm.query();
while(gm.next())
{
var gn=gm.getValue('group');
arr.push(gn);     // get the groups with one or more members 
}

var str=arr.join(',');
var grp = new GlideRecord('sys_user_group');
grp.addActiveQuery();
grp.addQuery('sys_id','NOT IN',str);     // skip the groups that have members 
grp.query();
while(grp.next())
{
gs.print(grp.getDisplayValue('name'));  // prints out the groups that have no members
}
