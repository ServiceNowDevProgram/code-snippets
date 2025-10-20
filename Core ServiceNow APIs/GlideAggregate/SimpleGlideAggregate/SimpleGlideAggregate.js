var SimpleGlideAggregate = Class.create();
SimpleGlideAggregate.prototype = {
    initialize: function(tableName) {
        if (!tableName) {
            throw new Error("Table name is required.");
        }
        this._table = tableName;
        this._ga = new GlideAggregate(tableName);
        this._fields = [];
        this._conditionsAdded = false;
    },

    /**
     * Adds a query condition.
     * Usage: addQuery('priority', '=', '1') or addQuery('active', true)
     */
    addQuery: function(field, operator, value) {
        if (value === undefined) {
            this._ga.addQuery(field, operator);
        } else {
            this._ga.addQuery(field, operator, value);
        }
        this._conditionsAdded = true;
        return this;
    },

    /**
     * Adds COUNT aggregate.
     */
    count: function() {
        this._fields.push({type: 'COUNT', field: null});
        return this;
    },

    /**
     * Adds SUM aggregate on a field.
     */
    sum: function(field) {
        if (!field) throw new Error("Field name required for sum.");
        this._fields.push({type: 'SUM', field: field});
        return this;
    },

    /**
     * Adds MIN aggregate on a field.
     */
    min: function(field) {
        if (!field) throw new Error("Field name required for min.");
        this._fields.push({type: 'MIN', field: field});
        return this;
    },

    /**
     * Adds MAX aggregate on a field.
     */
    max: function(field) {
        if (!field) throw new Error("Field name required for max.");
        this._fields.push({type: 'MAX', field: field});
        return this;
    },

    /**
     * Executes the aggregate query and returns results as an object.
     * Keys are aggregate type or type_field (for field aggregates).
     */
    execute: function() {
        var self = this;

        if (this._fields.length === 0) {
            throw new Error("At least one aggregate function must be added.");
        }

        this._fields.forEach(function(agg) {
            if (agg.field) {
                self._ga.addAggregate(agg.type, agg.field);
            } else {
                self._ga.addAggregate(agg.type);
            }
        });

        this._ga.query();

        var results = {};
        if (this._ga.next()) {
            this._fields.forEach(function(agg) {
                var key = agg.field ? agg.type + '_' + agg.field : agg.type;
                var value = agg.field ? self._ga.getAggregate(agg.type, agg.field) : self._ga.getAggregate(agg.type);
                results[key] = agg.type === 'COUNT' ? parseInt(value, 10) : parseFloat(value);
            });
        } else {
            // No rows matched, all aggregates 0 or null
            this._fields.forEach(function(agg) {
                var key = agg.field ? agg.type + '_' + agg.field : agg.type;
                results[key] = 0;
            });
        }

        return results;
    },

    type: 'SimpleGlideAggregate'
};
