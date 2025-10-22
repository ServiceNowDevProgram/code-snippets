var ci_lifecycle_management_script_include = Class.create(); // script include class name 
ci_lifecycle_management_script_include.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    /* function to query the cmdb_ci table to update the status of configuration item */
    update_ci_info: function() {
      var ci_id = this.getParameter('sysparm_ci_id_or_name');
      var cistatus = this.getParameter('sysparm_ci_status');
      var gr = new GlideRecord('cmdb_ci');
      gr.addQuery('sys_id',ci_id);
      gr.query();
      if(gr.next()){
        gr.setValue('install_status', cistatus);
              gr.update();
        return JSON.stringify({
          "updated":true
        });
      }
	    },
    /* end of update_ci_info function */

    
    /* function to query the cmdb_ci table to fetch configuration item details according to ci sys_id*/
    get_ci_info:function(){
      var ciNameOrId = this.getParameter('sysparm_ci_name_or_id');
      var gr = new GlideRecord('cmdb_ci');
      if(gr.get(ciNameOrId)){
        var record = {
          success:true,
          name: gr.getValue('name'),
          serial_number: gr.getValue('serial_number'),
          ci_class : gr.getValue('sys_class_name'),
          ci_install_status : gr.getDisplayValue('install_status')
        };
        return JSON.stringify(record);

	    }
   },
   /* end of get_ci_info() */
    type: 'ci_lifecycle_management_script_include'
});
