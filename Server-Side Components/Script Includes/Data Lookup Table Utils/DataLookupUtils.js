var DataLookupUtils = Class.create();

DataLookupUtils.prototype = {
    initialize: function (tableName, sortByColumn) {
        this.tableName = tableName;
        this.columnNames = this._getColumnNames(tableName);
        this.queryColumns = this.columnNames;

        sortByColumn = sortByColumn || false;
        this.sortColumn = sortByColumn ? DataLookupUtils.SORT_BY_COLUMN : DataLookupUtils.SORT_BY_ORDER; // optional, use the field being retrieved or the built in order field
    },

    /**
     * query lookup data
     * can accept either an array of keys, or multiple parameters
     * e.g
     *    getLookupData('key1', 'key2', 'key3');
     *    getLookupData(['key1', 'key2', 'key3']);
     */
    getLookupData: function (_keys) {
        var keys = [];
        if (_keys && typeof _keys != 'object') {
            for (var _arg in arguments) {
                keys.push(arguments[_arg]);
            }
        } else {
            keys = _keys;
        }

        if (keys.length >= this.queryColumns.length) {
            NiceError.raise(gs.getMessage("Too many keys ({0}) provided.  Maximum is {1}", [keys.length.toString(), (this.queryColumns.length - 1).toString()]));
        }

        try {
            var fieldIdx = 0;
            var fieldName = this.queryColumns[fieldIdx];
            var gq = new global.GlideQuery(this.tableName)
                .where('active', true);

            if (keys.length > 0) {
                // loop through the keys
                keys.forEach(function (key, idx, arr) {
                    gq = gq.where(fieldName, key);
                    fieldName = this.queryColumns[++fieldIdx];
                }, this);
            }

            gq = gq.orderBy(this.sortColumn == DataLookupUtils.SORT_BY_COLUMN ? fieldName : 'order')
                .whereNotNull(fieldName)
                .select(fieldName)
                .map(function (_x) {
                    // just need the data, not the other stuff
                    return _x[fieldName];
                })
                .reduce(function (arr, e) {
                    // remove duplicates
                    if (arr.indexOf(e) == -1) arr.push(e);
                    return arr;
                }, []);

            return gq;
        } catch (e) {
            NiceError.raise(e);
        }
    },

    /**
     * override the columns to use for lookups
     * 
     */
    setColumns: function (columns) {
        if (columns.length == 0) return;

        this.queryColumns = [];
        columns.forEach(function (_col) {
            if (this.columnNames.indexOf(_col) > -1) {
                this.queryColumns.push(_col);
            } else {
                NiceError.raise(gs.getMessage('Cannot find column {0}.  Valid columns are {1}', [_col, this.columnNames.join(', ')]));
            }
        }, this);

    },

    /**
     * build the list of column names for the table
     * use the default system view for the table and exclude all system and inherited fields
     * column order determines key lookup
     */
    _getColumnNames: function () {
        return new global.GlideQuery('sys_ui_list_element')
            .where('list_id.name', this.tableName)
            .where('list_id.view', 'Default view')
            // ignore any system or inherited fields from the table
            .where('element', 'NOT IN', ['sys_class_name', 'sys_created_by', 'sys_created_on', 'sys_id', 'sys_mod_count', 'sys_name', 'sys_package', 'sys_policy', 'sys_scope', 'sys_updated_by', 'sys_updated_on', 'sys_update_name', 'active', 'order'])
            .whereNull('list_id.sys_user') // make sure we get the system view
            .orderBy('position')
            .select('element')
            .reduce(function (arr, e) {
                arr.push(e.element);
                return arr;
            }, []);
    },

    type: 'DataLookupUtils'
};

DataLookupUtils.SORT_BY_ORDER = 0;
DataLookupUtils.SORT_BY_COLUMN = 1;
