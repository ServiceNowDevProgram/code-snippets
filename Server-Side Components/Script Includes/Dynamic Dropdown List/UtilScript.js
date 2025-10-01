var DynamicListAjax = Class.create();
DynamicListAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	
	getList : function(sysparm_table,sysparm_dependent,sysparm_element){
		var list={};
    		var table_name = this.getParameter('sysparm_table');
		var dependent_value = this.getParameter('sysparm_dependent');
		var element = this.getParameter('sysparm_element');
		var sys_choice_gr = new GlideRecord('sys_choice');
		sys_choice_gr.addQuery('name',table_name);
		sys_choice_gr.addQuery('dependent_value', dependent_value);
		sys_choice_gr.addQuery('element', element);
		sys_choice_gr.addQuery('inactive',false);
		sys_choice_gr.orderByDesc('sequence');
		sys_choice_gr.query();
		if(sys_choice_gr.hasNext())
			{
				while(sys_choice_gr.next())
					{
						list[sys_choice_gr.label] = sys_choice_gr.value;
					}
			}
		return JSON.stringify(list);
		
	},
  
    type: 'DynamicListAjax'
});
