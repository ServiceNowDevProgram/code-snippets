var GetFieldValuesAjax = Class.create();
GetFieldValuesAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getValues: function() {
        var table = this.getParameter("sysparm_table_name");
        var sys_id = this.getParameter("sysparm_sys_id");
        var fields = '' + this.getParameter("sysparm_field_names");

        return JSON.stringify(
            this._getValues(table, sys_id, fields.split(','))
        );
    },

    /**SNDOC
     @name _getValues
     @private
     @description 
     Get the requested values from the table/record specified.
	 Uses GlideRecord to allow for dot-walking and top-level values from the same field
     @param {string} [table_name] - table to get record from
     @param {string} [record_sys_id] - sys_id of record to query
     @param {array} [field_names] - list of field names to retrieve
     @returns {JSON} JSON object containing each field and its display equivalent
     @example
     _getValues('sys_user', '62826bf03710200044e0bfc8bcbe5df1', ['user_name', 'first_name', 'last_name', 'email', 'manager.email' ])
    */
    _getValues: function(table, sys_id, fields) {
        var json = {};
        try {

            var gr = new GlideRecord(table);
            gr.get(sys_id);

            fields.forEach(function(_field) {
                var ge = gr.getElement(_field);
                if (ge) {
                    json[_field] = {
                        "value": ge.getValue(),
                        "displayValue": ge.getDisplayValue()
                    };
                }
            });
            return json;
        } catch (e) {
            gs.error("(GetFieldValuesAjax) Problem getting field values " + e.toString());
            return {};
        }
    },

    type: 'GetFieldValuesAjax'
});
