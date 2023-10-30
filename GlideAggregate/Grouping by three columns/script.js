//GlideAggregate script for grouping by three columns
//In this case it is displaying the number of active changes grouped by state, type and priority

var gaChange = new GlideAggregate('change_request');
gaChange.addAggregate('COUNT', 'state');

//Chained orderBy allows to group by mutliply columns
gaChange.orderBy('state');
gaChange.orderBy('type');
gaChange.orderBy('priority');

gaChange.addActiveQuery();
gaChange.query();

while (gaChange.next()) {
    //Getting values of fields needed to logging 
    var ChangeCount = gaChange.getAggregate('COUNT', 'state');
    var state = gaChange.getDisplayValue('state');
    var type = gaChange.getValue('type');
    var priority = gaChange.getDisplayValue('priority');

    //Logging information about the number of changes in group of state, type and priority
    gs.info('Active changes in state: [' + state + '] with type: [' + type + '] and priority: [' + priority + '] = ' + ChangeCount);

}
