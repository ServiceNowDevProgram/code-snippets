var modelToManufacturer = {
    'HP Model X': 'HP',
    'Dell Model Y': 'Dell'
    // Add more model to manufacturer mappings
};

var gr = new GlideRecord('cmdb_ci');
//I am finding CIs where Manufacturer field is null
gr.addNullQuery('manufacturer');
//You can modify the query to further filter the CIs, for example, to target only active CIs or those belonging 
//to a specific CI class (e.g., servers or routers):
//gr.addQuery('install_status', '=', '1'); // Only query active CIs
//gr.addQuery('sys_class_name', '=', 'cmdb_ci_server'); // Only query server CIs
gr.query();

while (gr.next()) {
    var model = gr.model_id.name;
    if (modelToManufacturer[model]) {
        gr.manufacturer = modelToManufacturer[model];
        gr.update();
        gs.info('Updated manufacturer for CI: ' + gr.name);
    }
}
