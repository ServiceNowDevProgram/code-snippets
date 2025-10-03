/** Client callable script include */
var GetServiceDetails = Class.create();
GetServiceDetails.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	type:'GetServiceDetails',
    getService: function() {
        var ciSysId = this.getParameter('sysparm_ci_sys_id');
        gs.log('GetServiceDetails called for CI: ' + ciSysId);

        var result = {
            businessService: ''
        };

        // Find Business Service via cmdb_rel_ci
        var rel = new GlideRecord('cmdb_rel_ci');
        rel.addQuery('child', ciSysId);
        rel.query();
        if (rel.next()) {
            var bs = new GlideRecord('cmdb_ci_service');
            if (bs.get(rel.parent.toString())) {
                result.businessServiceId = bs.getUniqueValue();
                result.businessServiceName = bs.getDisplayValue();

            } else {
            gs.log('No Business Service relationship found for CI: ' + ciSysId);
            result.businessService = 'No Business Service linked';
        }
            
        }

        return JSON.stringify(result);
    },
	
});


/**onChange Client Script on Change_Request form when CI changes */

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    var ga = new GlideAjax('GetServiceDetails');
    ga.addParam('sysparm_name', 'getService');
    ga.addParam('sysparm_ci_sys_id', newValue);
    ga.getXML(callScriptInclude);

	function callScriptInclude(response){
		var answer = response.responseXML.documentElement.getAttribute("answer");
        }
   
}
