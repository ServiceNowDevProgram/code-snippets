var GenericNOW, _count, _get, _insert, _remove, _update;
GenericNOW = Class.create();

GenericNOW.prototype = {
    type: "GenericNOW",
    initialize: function() {},

    count: function() {
        return _count.apply(this, arguments);
    },
    tableExists: function(table) {
        return new TableUtils(table).tableExists();
    },

};



_count = function(arg) {
    var count, ga, query, res, table;
    table = arg.table;
    query = arg.query;
    if (!table) {
        return {
            error: "Attribute 'table' is not provided"
        };
    }
    if (query == null) {
        return {
            error: "Attribute 'query' is not provided"
        };
    }
    if (!this.tableExists(table)) {
        return {
            error: "Provided 'table' is not a valid table"
        };
    }
    res = {
        data: {},
        error: null,
        count: 0
    };
    ga = new GlideAggregate(table);
    ga.addEncodedQuery(query);
    ga.addAggregate("COUNT");
    ga.query();
    res.count = ga.next() ? (ga.getAggregate("COUNT") * 1) : 0;
    return res;
};
