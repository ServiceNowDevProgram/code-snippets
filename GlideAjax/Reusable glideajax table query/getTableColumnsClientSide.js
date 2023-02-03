var getTableColumnsClientSide = Class.create();
getTableColumnsClientSide.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getColumns: function(tableName, encodedQuery, columns) {
        var returnData = [];
        var mappCol = columns.split(',');
        var fetchColumn = new GlideRecord(tableName);
        fetchColumn.addEncodedQuery(encodedQuery);
        fetchColumn.setLimit(1); //Fetch only one record {Check the Query if it return wrong data}
        fetchColumn.query();
        if (fetchColumn.next()) {

            for (var i = 0; i < mappCol.length; i++) {
                var itemCol = {};
                itemCol[mappCol[i]] = fetchColumn.getValue(mappCol[i].toString());
                returnData.push(itemCol);
            }

        }
        return JSON.stringify(returnData);
    },
    getColumnsClient: function() {
        var tableName = this.getParameter('sysparm_tableName');
        var encodedQuery = this.getParameter('sysparm_encodedQuery');
        var columns = this.getParameter('sysparm_columns');
        var returnData = [];
        var mappCol = columns.split(',');
        var fetchColumn = new GlideRecord(tableName);
        fetchColumn.addEncodedQuery(encodedQuery);
        fetchColumn.setLimit(1); //Fetch only one record {Check the Query if it return wrong data}
        fetchColumn.query();
        if (fetchColumn.next()) {
gs.log('found record');
            for (var i = 0; i < mappCol.length; i++) {
                var itemCol = {};
                itemCol[mappCol[i]] = fetchColumn.getValue(mappCol[i].toString());
                returnData.push(itemCol);
            }

        }
        return JSON.stringify(returnData);
    },
    type: 'getTableColumnsClientSide'
});
