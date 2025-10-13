var arr=[]; //empty array that can be used later to capture the group names
var gr = new GlideRecord("sys_user_group"); 
gr.addActiveQuery();//active query to capture to query through all the active groups
gr.query();
while(gr.next()){
	var br= new GlideRecord("sys_user_grmember"); //querying grmember table to validate group's members
	br.addQuery("group",gr.sys_id.toString());
	br.query();
	if(!br.hasNext()){ // if no member then capture the group name in the array
		arr.push(gr.name.toString());
	}
}
gs.print(arr.join(",")); //printing the array with all the memberless group names