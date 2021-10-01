var getGroupCount = function (table, query, groupBy, min, transform) {
    var gaCount = new GlideAggregate(table);
    gaCount.addAggregate("COUNT", groupBy);
    gaCount.addEncodedQuery(query);
    gaCount.groupBy(groupBy);
    gaCount.query();
    var result = [];
    while (gaCount.next()) {
        var groupCount = gaCount.getAggregate("COUNT", groupBy);
        if (groupCount >= min) result.push(transform(gaCount, groupCount));
    }
    return result;
};