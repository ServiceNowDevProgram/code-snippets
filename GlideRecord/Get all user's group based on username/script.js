var groups= [];

var Usergr = new GlideRecord("sys_user");
Usergr.addActiveQuery();
Usergr.addQuery("user_name","<user_id>");  //Add username
Usergr.query();
if (Usergr.next()) {
var usrid = Usergr.getUniqueValue(); 
}

var GroupRelationGR = new GlideRecord('sys_user_grmember');
GroupRelationGR.addEncodedQuery('user=' +usrid);
GroupRelationGR.query();
while(GroupRelationGR.next()){
groups.push(GroupRelationGR.getDisplayValue('group'));	
}

gs.info('User is part of this groups= ' + groups);

