var refQualUtils = Class.create();
refQualUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
   
   	setSysProp: function(){
		var propertyName = this.getParameter('sysparm_sys_prop_name');
		var propertyValue =  this.getParameter('sysparm_sys_prop_value');
		var property = gs.getProperty(propertyName);
		gs.setProperty(propertyName, propertyValue);
		return;
	},
		
    type: 'refQualUtils'
});
