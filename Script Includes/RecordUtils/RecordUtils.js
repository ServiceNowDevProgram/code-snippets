var RecordUtils = Class.create();
RecordUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    type: 'RecordUtils',

    getSysId: function(in_tableName, in_encodedQuery) {
        var param = this._getParameters(in_tableName, in_encodedQuery);
		gs.info(JSON.stringify(param));

		var record = new GlideRecord(param.tableName);
        record.addQuery(param.encodedQuery);
        record.query();
        var sys_id;
        if (record.next()) {
            sys_id = record.getUniqueValue();
        }
        return sys_id;
    },

    /**
     * Retrieve the parameters value independently of where they come from: passed as parameters or in the Ajax call
     */
    _getParameters: function(in_tableName, in_encodedQuery) {
        var tableName = global.JSUtil.nil(in_tableName) ? this.getParameter('sysparm_tableName') : in_tableName;
        var encodedQuery = global.JSUtil.nil(in_encodedQuery) ? this.getParameter('sysparm_encodedQuery') : in_encodedQuery;
        return {
            tableName: tableName,
            encodedQuery: encodedQuery
        };
    }
});