var Enhanced_TableUtils = Class.create();

Enhanced_TableUtils.prototype = Object.extendsObject(TableUtils, {

    initialize: function(tableName) {
        TableUtils.prototype.initialize.call(this, tableName);        
    },

    /**SNDOC
        @name getFieldsAndAttributes

        @description Returns a data structure with field name and field properties for a given table.
        OOB getFields() methods from either GlideRecord() or GlideRecordUtil()
        only work with an existing record and not just with the table name. This one goes
        to sys_dictionary directly and therefore does not need a valid GlideRecord to work.
        The returned object has this structure:
        {
            <field_name_1>: {
               field_label: <label>,
               field_size: <size>,
               field_type: <type>,
               reference_table: <table> (only for reference or glide_list types)
            },
            <field_name_2>: {
               ...
            }
        }

        @example
        var fields = new SPOC_TableUtils('incident').getFieldsAndAttributes();
        for (var fieldName in fields) {
            gs.print('Field ' + fieldName + ' is of type ' + fields[fieldName].field_type);
        }

        @returns {object} [fields]
        */

    getFieldsAndAttributes: function() {

        var fields = {};

        // Get all the table names in the hierarchy and turn it into an array
        // getHierarchy() is a method from the parent class TableUtils

        var tableHierarchy = this.getHierarchy(this.tableName);
        
        // Go find all the fields for all the tables of the hierarchy

        var dicGr = new GlideRecord('sys_dictionary');

        dicGr.addQuery('name', 'IN', j2js(tableHierarchy).join(','));       
        dicGr.addEncodedQuery('internal_type!=collection^ORinternal_type=NULL');
        dicGr.query();

        while (dicGr.next()) {

            var fieldName = dicGr.getValue('element');

            fields[fieldName] = {};
            fields[fieldName].field_label = dicGr.getValue('column_label');
            fields[fieldName].field_size = dicGr.getValue('max_length');

            fields[fieldName].field_type = dicGr.getValue('internal_type');
            if (fields[fieldName].field_type === 'reference' || fields[fieldName].field_type === 'glide_list') {
                fields[fieldName].reference_table = dicGr.getValue('reference');
            }
            
        }

        return fields;

    },

    type: 'Enhanced_TableUtils'

});