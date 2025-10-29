var PreviousRequestsUtils = Class.create();
PreviousRequestsUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getPreviousRequests: function() {
        var requestedFor = this.getParameter('sysparm_requested_for');
        var result = [];
        var gr = new GlideRecord('sc_req_item');
        gr.addQuery('requested_for', requestedFor);
        gr.orderByDesc('sys_created_on');
        gr.setLimit(5); // Show last 5 requests
        gr.query();
        while (gr.next()) {
            result.push({
                number: gr.number.toString(),
                item: gr.cat_item.getDisplayValue(),
                date: gr.sys_created_on.getDisplayValue()
            });
        }
        return JSON.stringify(result);
    }
});
