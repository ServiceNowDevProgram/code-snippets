var gr = new GlideAggregate('cmdb_ci');
gr.addAggregate('COUNT', 'name');
gr.groupBy('name'); // You can change this to 'serial_number' or 'asset_tag'
gr.query();

while (gr.next()) {
    if (gr.getAggregate('COUNT', 'name') > 1) {
        gs.info('Duplicate CI found for: ' + gr.name + ', Count: ' + gr.getAggregate('COUNT', 'name'));
    }
}
