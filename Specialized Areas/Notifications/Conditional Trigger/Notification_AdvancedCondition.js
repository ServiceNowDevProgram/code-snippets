var ritmis=new GlideRecord('sc_req_item');
ritmis.addQuery('request',current.sys_id);
ritmis.addQuery('cat_item.name','<catalog item name here>');
ritmis.query();
if(ritmis.next())
	{
		if(ritmis.variables.variable_name=='ABCD')//replace variable_name with appropriate variable name and ABCD with correct value
			{
				answer=true; //trigger
			}
		else
			{
				answer=false; //do not trigger
			}
	}
