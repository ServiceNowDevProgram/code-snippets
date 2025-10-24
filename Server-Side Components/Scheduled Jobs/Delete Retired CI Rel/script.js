//get all relationship records where retired CI is Parent
var gr = new GlideRecord('cmdb_rel_ci');
gr.addEncodedQuery("child.install_status=7^ORparent.install_status=7");
gr.query();

//For each record with a retired CI
while (gr.next()) {
    var par = gr.parent;
    var child = gr.child;
    var tp = gr.type;
    gr.deleteRecord();

    var gr1 = new GlideRecord('u_delete_retired_relationships');
    gr1.initialize();
    gr1.u_child = child;
    gr1.u_parent = par;
    gr1.u_type = tp;
    gr1.insert();
}
