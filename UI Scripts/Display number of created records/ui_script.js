var SampleUIScript=Class.create();
SampleUIScript.prototype={
	initialize: function()
	{

	},

	callFromClientScript: function(TableName)
	{
		var count=0;
		var gr= new GlideRecord(TableName);   
		gr.addQuery('sys_created_by',g_user.userName);
		gr.query();
		while(gr.next())
			{
				count++;
			}
		g_form.addInfoMessage("Total Number of "+TableName+" Records Created by you are : "+count);  //you can update info message as required

	},


};
