//GlideAggregate script for grouping by three columns
//In this case it is displaying the number of active changes grouped by state, type and priority

//First GlideAggregate query which is aggregated by state
var gaChangeState = new GlideAggregate('change_request');
gaChangeState.addActiveQuery();

//Aggregate by the first selected field
gaChangeState.addAggregate('count', 'state');

gaChangeState.query();

while (gaChangeState.next()) {

    //Second GlideAggregate query which is aggregated by type		
    var gaChangeType = new GlideAggregate('change_request');
    gaChangeType.addActiveQuery();

    //It is important to query by fields used in previous GlideAggregates
    gaChangeType.addQuery('state', gaChangeState.state);

    //Aggregate by second selected field
    gaChangeType.addAggregate('count', 'type');

    gaChangeType.query();

    while (gaChangeType.next()) {

        //Third GlideAggregate query which is aggregated by priority		
        var gaChangePriority = new GlideAggregate('change_request');
        gaChangePriority.addActiveQuery();

        //It is important to query by fields used in previous GlideAggregate
        gaChangePriority.addQuery('state', gaChangeState.state);
        gaChangePriority.addQuery('type', gaChangeType.type);

        //Aggregate by third selected field
        gaChangePriority.addAggregate('count', 'priority');

        gaChangePriority.query();

        //Going through all combinations of state, type and priority
        while (gaChangePriority.next()) {

            //Logging information about the number of changes in group of state, type and priority
            gs.info('Active changes in state: [' + gaChangeState.state.getDisplayValue() + '] with type: [' + gaChangeType.type.getDisplayValue() + '] and priority: [' + gaChangePriority.priority.getDisplayValue() + '] = ' + gaChangePriority.getAggregate('count', 'priority'));
        }
    }
}
