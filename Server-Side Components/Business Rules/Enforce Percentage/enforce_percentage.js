(function executeRule(current, previous /*null when async*/) {

    var tableName = current.getTableName();
    gs.info('Validate Ownership Percentage');
    var individual = current.individual;
    gs.info(' current individual  = ' + current.individual.getDisplayValue());
    gs.info(' current ownership % = ' + current.ownership_percentage.getDisplayValue());
    gs.info('previous ownership % = ' + previous.ownership_percentage.getDisplayValue());

    /** 
     * The aggregate function calculates the sum by using the values that are stored in the database. 
     * However we need to calculate the sum using the values that are in the database for all owners 
     * and use the value that the user is trying to update for the owner that is currently being 
     * udpated.
      */

    var query = 'business_entity=' + current.business_entity;
    var sum_with_previous_values = new x_snc_ecms.Calculator().getSum(tableName, 'ownership_percentage', query);
    gs.info('SUM ownership % with previous value = ' + sum_with_previous_values);
    var sum_with_current_values = sum_with_previous_values - previous.ownership_percentage + current.ownership_percentage;
    gs.info('SUM ownership % CURRENT= ' + sum_with_current_values);

    if (sum_with_current_values > 100) {
        gs.addErrorMessage("Sum of all ownerships can not be greater than 100%");
        current.setAbortAction(true);
    }
})(current, previous);