var DynamicTableQueryUtil = Class.create();
DynamicTableQueryUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getTableRow: function() {
        var tableName = this.getParameter('sysparm_table_name');
        var keyField = this.getParameter('sysparm_key_field');
        var keyValue = this.getParameter('sysparm_key_value');
        var fieldsParam = this.getParameter('sysparm_fields');
        var limitFields = !JSUtil.nil(fieldsParam);
        var desiredFields = limitFields ? fieldsParam.split(',') : [];

        var result = {};
        var tableObj = {};
        var gr = new GlideRecord(tableName);

        // Use addQuery for non-sys_id fields
        if (keyField === 'sys_id') {
            if (!gr.get(keyValue)) {
                return null;
            }
        } else {
            gr.addQuery(keyField, keyValue);
            gr.query();
            if (!gr.next()) {
                return null;
            }
        }

        // Handle variables (if present)
        if (gr.variables) {
            for (var key in gr.variables) {
                if (!JSUtil.nil(gr.variables[key])) {
                    var variableObj = gr.variables[key];
                    tableObj['variables.' + key] = {
                        fieldDisplayVal: variableObj.getDisplayValue() || String(variableObj),
                        fieldVal: String(variableObj)
                    };
                }
            }
        }

        // Handle standard fields
        var fields = gr.getFields();
        for (var i = 0; i < fields.size(); i++) {
            var field = fields.get(i);
            var fieldName = field.getName();
            tableObj[fieldName] = {
                fieldDisplayVal: field.getDisplayValue() || String(field),
                fieldVal: String(field)
            };
        }

        // Add sys_id explicitly
        tableObj['sys_id'] = {
            fieldDisplayVal: 'Sys ID',
            fieldVal: gr.getUniqueValue()
        };

        // Filter fields if requested
        if (limitFields) {
            desiredFields.forEach(function(field) {
                field = field.trim();
                if (tableObj[field]) {
                    result[field] = tableObj[field];
                }
            });
        } else {
            result = tableObj;
        }

        return new JSON().encode(result);
    }
});
