(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here

    var t = request.body.data.title;
    var l = request.body.data.label;
    var url = request.body.data.url;
    var read = request.body.data.read;
    var table_key = request.body.data.table_key;
    var table = request.body.data.table;

    var t = request.body.data.title;

    var l = new GlideRecord('label');
    l.initialize();
    l.name = t;
	l.owner = '6816f79cc0a8016401c5a33be04be441';// sys_id of system admin user
	l.type = 'standard';
	l.viewable_by = 'everyone';
	var id = l.insert();



    var entry = new GlideRecord('label_entry');
    entry.initialize();
    entry.title = t;
    entry.label = id;
    entry.table = table;
    entry.table_key = table_key;
    entry.read = read;
    entry.url = table + ".do?sys_id=" + table_key;
    entry.setWorkflow(false);
    var le = entry.insert();

    response.setBody({
        'URL': gs.getProperty('glide.servlet.uri') + 'label_entry_list.do?sysparm_query=sys_id=' + le,
        'sys_id': le



    });




})(request, response);
