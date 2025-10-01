/* 
 * RecordsCalculator 
 * 
 * Provides functions to easily calculate values across multiple records
 * The functions work in both Client and Server scripts.
 */
var RecordsCalculator = Class.create();
RecordsCalculator.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {


    _getAggregateByType: function (in_tableName, pColumn, pEncodedQuery, pAggregateType) {
        var ga = new GlideAggregate(in_tableName);
        if (pEncodedQuery) {
            ga.addQuery(pEncodedQuery);
        }
        ga.setGroup(false);
        //ga.setOrder(false);
        ga.addAggregate(pAggregateType, pColumn);
        ga.query();
        if (ga.next()) {
            return ga.getAggregate(pAggregateType, pColumn);
        } else {
            return null;
        }
    },

    /**
     * Retrieve the parameters value independently of where they come from: passed as parameters or in the Ajax call
     */
    _getParameters: function (in_tableName, in_fieldName, in_encodedQuery) {
        var tableName = global.JSUtil.nil(in_tableName) ? this.getParameter('sysparm_tableName') : in_tableName;
        var fieldName = global.JSUtil.nil(in_fieldName) ? this.getParameter('sysparm_fieldName') : in_fieldName;
        var encodedQuery = global.JSUtil.nil(in_encodedQuery) ? this.getParameter('sysparm_encodedQuery') : in_encodedQuery;
        return {
            tableName: tableName,
            fieldName: fieldName,
            encodedQuery: encodedQuery
        };
    },

    getMin: function (in_tableName, in_fieldName, in_encodedQuery) {
        var param = this._getParameters(in_tableName, in_fieldName, in_encodedQuery);
        return this._getAggregateByType(param.tableName, param.fieldName, param.encodedQuery, 'MIN');
    },

    getMax: function (in_tableName, in_fieldName, in_encodedQuery) {
        var param = this._getParameters(in_tableName, in_fieldName, in_encodedQuery);
        return this._getAggregateByType(param.tableName, param.fieldName, param.encodedQuery, 'MAX');
    },

    getAvg: function (in_tableName, in_fieldName, in_encodedQuery) {
        var param = this._getParameters(in_tableName, in_fieldName, in_encodedQuery);
        return this._getAggregateByType(param.tableName, param.fieldName, param.encodedQuery, 'AVG');
    },

    getSum: function (in_tableName, in_fieldName, in_encodedQuery) {
        var param = this._getParameters(in_tableName, in_fieldName, in_encodedQuery);
        return this._getAggregateByType(param.tableName, param.fieldName, param.encodedQuery, 'SUM');
    },

    type: 'RecordsCalculator'
});