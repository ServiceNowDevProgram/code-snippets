/*This Script Include is useful for:

Filtering user records based on field from table data.
Populating reference fields or dropdowns dynamically via GlideAjax.
Client-side filtering based on server-side data logic.*/

var <Script_include_name> = Class.create();
<Script_include_name>.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    <functionname>: function() {
        var validID = [];
        var gr = new GlideAggregate("<table_name>");
		gr.addQuery("field","value");
        gr.addAggregate("COUNT");
        gr.groupBy("fieldname");
        gr.query();
        while (gr.next()) {
            var id = gr.getValue("fieldname");

            validID.push(id);

        }

        var varname = "user_nameIN" + validID;
        return varname;
    },
type: '<Script_include_name>'
});
