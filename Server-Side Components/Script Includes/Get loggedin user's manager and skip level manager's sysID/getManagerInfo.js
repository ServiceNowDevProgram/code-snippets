var ManagerInfo = Class.create();
ManagerInfo.prototype = Object.extendsObject(AbstractAjaxProcessor, {

getManagerInfo: function(){
	var usr=this.getParameter("sysparm_user_sys_id"); //getting the logged in user's sysid from the client script
	var obj={}; //JSON object
	var gr= new GlideRecord("sys_user"); //gliding over user table
	gr.addQuery("sys_id",usr);
	gr.query();
	if(gr.next()){
		obj.managr1=gr.manager.toString(); //getting immediate manager's sys_id and storing in json object
		obj.managr2=gr.manager.manager.toString(); //getting skip level manager's sysid and storing in json object
	}

	return JSON.stringify(obj); //returning the object to client script for further usage
},
    type: 'ManagerInfo'
});
