var GetReferenceDisplayValue = Class.create();
GetReferenceDisplayValue.prototype = {
    initialize: function() {},

    getReferenceDisplayValue: function(table, value) {
        try {
            var displayValue = '';
            var grReferenceTable = new GlideRecord(table);

            grReferenceTable.addQuery('sys_id', 'IN', value);
            grReferenceTable.query();

            while (grReferenceTable.next())
                displayValue += grReferenceTable.getDisplayValue() + ', ';

            return displayValue.slice(0, -2);
        } catch (exception) {
            gs.error("getReferenceDisplayValue() - " + exception);
        }
    },

    type: 'GetReferenceDisplayValue'
};