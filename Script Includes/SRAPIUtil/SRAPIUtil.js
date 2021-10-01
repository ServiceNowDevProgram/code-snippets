var SRAPIUtil = (function() {

    /**SNDOC
    @name updateRecord
    @description Update a record on provided table with provided field/value pairs
    @param {String} [table] - Table the record is on
	@param {String} [id] - sys_id or number of record
	@param {Object} [fields] - Fields to be updated and their value eg. {"state": "1"}
	@throws error if no record is found or an invalid field or choice value is used
	@return {Object} {updatedFields, unchangedFields, record}
	@function REIChangeUtil~updateRecord
	*/
    function updateRecord(table, id, fields) {
        var response = {};
        var unchangedFields = [];
        var updatedFields = [];

        var recordGR = new GlideRecordSecure(table);
        var fieldToQuery;
        _isSysID(id) ? fieldToQuery = 'sys_id' : fieldToQuery = 'number';
        if (!recordGR.get(fieldToQuery, id)) {
            throw 'Could not find record, please provide a valid number or sys_id';
        }
        for (var field in fields) {
            if (!recordGR.isValidField(field)) {
                throw field + ' is not a valid field on the ' + table + ' table';
            }
            if (!recordGR.getElement(field).canWrite()) {
                unchangedFields.push(field);
                continue;
            }
            var choiceList = _getChoiceList(field, table);
            if (_getChoiceList(field) && _isChoiceList(field)) {
                if (choiceList.indexOf(fields[field]) < 0) {
                    throw fields[field] + ' is not a valid value for ' + field + '. Valid values: ' + choiceList;
                }
            }
            recordGR.setValue(field, fields[field]);
            var obj = {};
            obj[field] = fields[field];
            updatedFields.push(obj);
        }
        recordGR.update();
        response.updatedFields = updatedFields;
        if (unchangedFields.length > 0) {
            response.unchangedFields = unchangedFields;
        }
        response[table] = _convertToJSON(recordGR);
        return response;
    }

    /**SNDOC
	 @name getRecord
     @description Get a GlideRecord
     @param {String}  [table] - Table the record is on
	 @param {String} [id] - sys_id or number of record to be retrieved
	 @return {Object} GlideRecord represented in JSON
	*/
    function getRecord(table, id) {
        var field;
        _isSysID(id) ? field = 'sys_id' : field = 'number';
        var recordGRS = new GlideRecordSecure(table);
        if (recordGRS.get(field, id)) {
            var record = _convertToJSON(recordGRS);
            return record;
        }
        throw "Could not find record. Please provide a valid table and sys_id";
    }

    /**SNDOC
     @name queryRecords
     @description Query a table
     @param {String} [table] - table the records are on
	 @param {Object} [queryParams] - Query parameters of a REST message containing fields/values to query for
	 @return {Array} Collection of GlideRecords represented in JSON
	*/
    function queryRecords(table, queryParams) {
        var records = [];
        var recordGRS = new GlideRecordSecure(table);
        recordGRS.setLimit(100);
        for (var param in queryParams) {
            if (param == 'api') {
                continue;
            }
            if (param == 'limit') {
                recordGRS.setLimit(queryParams[param]);
                continue;
            }
            if (!recordGRS.isValidField(param)) {
                throw param + ' is not a valid field on ' + table;
            }
            var fieldType = recordGRS.getElement(param).getED().getInternalType();
            if (fieldType == 'reference') {
                var refTable = recordGRS.getElement(param).getReferenceTable();
                var displayField = _getTableDisplayValue(refTable);
            }
            recordGRS.addQuery(param, queryParams[param]).addOrCondition(param + '.' + displayField, queryParams[param]);
        }
        recordGRS.query();
        while (recordGRS.next()) {
            var obj = _convertToJSON(recordGRS);
            records.push(obj);
        }
        return records;
    }

    /**SNDOC
     @name _getChoiceList
     @description Get choices available for a field
     @private
     @param {String} [field] - Name of field to check
     @param {String} [table] - Name of the field the table is on
     @return {Array} Collection of choices available on the field
    */
    function _getChoiceList(field, table) {
        var choices = [];
        var choiceGR = new GlideRecord('sys_choice');
        choiceGR.addQuery('element', field);
        choiceGR.addQuery('name', table);
        choiceGR.addQuery('inactive', false);
        choiceGR.query();
        if (!choiceGR.hasNext()) {
            return null;
        }
        while (choiceGR.next()) {
            choices.push(choiceGR.getValue('value'));
        }
        return choices;
    }

    /**SNDOC
     @name _isChoiceList
     @description Check if a field is choice list by checking if the field's choice value is dropdown, dropdown with none, or suggestion
     @private
	 @param {String} [field] - Name of field to check
	 @return {Boolean} True if the provided field is a choice list, false if not
	*/
    function _isChoiceList(field) {
        var dictionaryGR = new GlideRecord('sys_dictionary');
        dictionaryGR.addQuery('name', 'task');
        dictionaryGR.addQuery('element', field);
        dictionaryGR.addQuery('active', true);
        dictionaryGR.query();
        if (dictionaryGR.next()) {
            if (dictionaryGR.getValue('choice') == 2 || dictionaryGR.getValue('choice') == 3 || dictionaryGR.getValue('choice') == 1) {
                return true;
            }
        }
        return false;
    }

    /**SNDOC
     @name _convertToJSON
     @description Convert the provided GlideRecord to a JSON object
     @private 
	 @param {GlideRecord} [GlideRecord] - GlideRecord to convert
	 @return {Object} GlideRecord represented as JSON
	*/
    function _convertToJSON(glideRecord) {
        var obj = {};
        for (var field in glideRecord) {
            if (glideRecord.getValue(field)) {
                obj[field] = glideRecord.getDisplayValue(field);
            }
        }
        return obj;
    }

    /**SNDOC
     @name _isSysID
     @description Check if provided text is a sys_id (32 char alphanumeric)
     @private 
	 @param {String} [text] - Text to check
	 @return {Boolean} True if the provided string is a sys_id, false if not
	*/
    function _isSysID(text) {
        var regexp = /[0-9a-f]{32}/;
        if (text.match(regexp)) {
            return true;
        } else {
            return false;
        }
    }

    /**SNDOC
     @name _getTableDisplayValue
     @description Get the display field for the provided table
     @private
	 @param {String} [table] - Table to get the display field of
	 @return {String} Name of the display field
	*/
    function _getTableDisplayValue(table) {
        var dictionaryGR = new GlideRecord('sys_dictionary');
        dictionaryGR.addQuery('name', table);
        dictionaryGR.addQuery('display', true);
        dictionaryGR.query();
        if (dictionaryGR.next()) {
            return dictionaryGR.getValue('element');
        } else {
            return 'name';
        }
    }

    return {
        'updateRecord': updateRecord,
        'getRecord': getRecord,
        'queryRecords': queryRecords
    };
})();
