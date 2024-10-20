(function() {

    var TABLE_TO_FIND_DUPLICATE_IN = 'cmdb_ci';
    var FIELD_TO_GROUP_BY = 'name';

    // GlideAggregate instance
    var ga = new GlideAggregate(TABLE_TO_FIND_DUPLICATE_IN);
    
    // Group by the specified field
    ga.addAggregate('COUNT', FIELD_TO_GROUP_BY);
    ga.groupBy(FIELD_TO_GROUP_BY);
    
    // Query for records with duplicates (count > 1)
    ga.addHaving('COUNT', '>', '1');
    ga.query();
    
    // Log the duplicate records
    while (ga.next()) {
        var fieldValue = ga.getValue(FIELD_TO_GROUP_BY);
        var count = ga.getAggregate('COUNT', FIELD_TO_GROUP_BY);
        gs.info('Duplicate Record: ' + fieldValue + ' - Count: ' + count);
    }
})();
