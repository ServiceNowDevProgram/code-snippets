//create business rule on sc_req_item table and add condtion 

(function executeRule(current, previous /*null when async*/ ) {

    var gr = new GlideRecord("sc_task");
    gr.addQuery('request_item', current.sys_id);
    gr.orderBy('order');
    gr.setLimit(1);
    gr.query();
    if (gr.next() && gr.getValue('state') == 1) {
        gr.setValue('state', '2');
        gr.update();
    }


})(current, previous);
