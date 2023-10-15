//Script to quickly generate needed statistic about events generated today in system 

//Function to generate statistics based on parameters
//field - name of field which should be used in aggregate function
//aggFunction - name of aggregate function which should be used
//orderByField - name of field which should be used to orderBy
function getStats(field, aggFunction, orderByField) {

    gs.info('[Events stats] --- Statistics for field: ' + field + ' and with aggreagte function: ' + aggFunction);

    //GlideAggregate query to get data from sysevent table
    var agEvent = new GlideAggregate('sysevent');
    agEvent.addAggregate(aggFunction, field);
    agEvent.orderBy(orderByField);
    agEvent.addEncodedQuery('sys_created_onONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');

    //Order results descending by aggregate results
    agEvent.orderByAggregate(aggFunction, field);
    agEvent.query();

    //Display statistics for all groups
    while (agEvent.next()) {
        var eventNumber = agEvent.getAggregate(aggFunction, field);
        var label = agEvent.getValue(orderByField);
        if (field == orderByField) {
            gs.info('[Events stats] ------ Event in ' + orderByField + ': ' + label + ': ' + eventNumber);
        } else {
            gs.info('[Events stats] ------ Event in ' + orderByField + ': ' + label + ': ' + eventNumber + ' ' + aggFunction + ' ' + field);
        }

    }
}

gs.info('[Events stats] - Generating events statistics created on: ' + gs.nowDateTime());

//Calling getStats function which different parameters
//Get events count group by state
getStats('state', 'count', 'state');

//Get events count group by name
getStats('name', 'count', 'name');

//Get events average processing duration grouped by table name
getStats('processing_duration', 'avg', 'table');
