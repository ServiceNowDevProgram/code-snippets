/** Client callable script include named getServiceDetails*/

var getServiceDetails = Class.create();
getServiceDetails.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /**creating a script include function named getService */

    getService: function() {
        
        /**getting the sysid of CI from client side */
        var ciSysId = this.getParameter('sysparm_ci_sys_id');
        gs.log('[getServiceDetails] Called for CI: ' + ciSysId);

        if (!ciSysId) {
            gs.log('[getServiceDetails] No CI sys_id provided.');
            return '';
        }

        /**Querying the cmdb_rel_ci to find parent relationships for the CI */
        var relGR = new GlideRecord('cmdb_rel_ci');
        relGR.addQuery('child', ciSysId);
        relGR.query();

        while (relGR.next()) {
            var parentSysId = relGR.getValue('parent');

            /**Check if the parent is a Business Service (cmdb_ci_service) */
            var bsGR = new GlideRecord('cmdb_ci_service');
            if (bsGR.get(parentSysId)) {
                var businessServiceName = bsGR.getValue('name');
                gs.log('[getServiceDetails] Found Business Service: ' + businessServiceName);
                return businessServiceName; // Return the name of the businessService
            }
        }

        gs.log('[getServiceDetails] No linked Business Service found.');
        return '';
    },

    type: 'getServiceDetails'
});


/**onChange Client Script on Change_Request form when CI changes */

function onchange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    var ga = new GlideAjax('getServiceDetails');
    ga.addParam('sysparm_name', 'getService');
    ga.addParam('sysparm_ci_sys_id', newValue);
    ga.getXML(callScriptInclude);

    function callScriptInclude(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");

        if (answer) {
            // Set the Business Service field with the service name returned
            g_form.setValue('business_service', answer);
        } else {
            // Optional: show a message if no service is found
            g_form.showFieldMsg('business_service', 'No linked Business Service found for this CI.', 'info');
        }
    }
}
