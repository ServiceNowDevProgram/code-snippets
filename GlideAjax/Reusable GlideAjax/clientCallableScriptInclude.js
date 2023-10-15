var ScriptIncludeName = Class.create();
ScriptIncludeName.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    scriptIncludeFunctionName: function() {
        var resultObj = {};
        var tableName = this.getParameter('sysparm_table');
        var query = this.getParameter('sysparm_query');
        var columns = this.getParameter('sysparm_returnAttributes').split(',');
        if (tableName != '') {
            var grObj = new GlideRecord(tableName);
            grObj.addEncodedQuery(query);
            grObj.setLimit(1);
            grObj.query();
            if (grObj.next() && columns.length > 0) {
                for (var i = 0; i < columns.length; i++) {
                    resultObj[columns[i]] = grObj.getValue(columns[i]);
                }
            }
        }
        return JSON.stringify(resultObj);
    },

    type: 'ScriptIncludeName'
});
