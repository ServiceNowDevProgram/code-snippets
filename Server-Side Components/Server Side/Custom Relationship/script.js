(function refineQuery(current, parent) {

    var queryString = "table_nameINsc_request^table_sys_idIN" + parent.getValue("request");
    var gr = new GlideRecord("sc_req_item");
    gr.addQuery("request", parent.getValue("request"));
    gr.query();
    while (gr.next()) {
        queryString += "," + gr.sys_id.toString();
    }
    current.addEncodedQuery(queryString);

})(current, parent);
