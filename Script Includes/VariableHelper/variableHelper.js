var variableHelper = Class.create();
variableHelper.prototype = {
    initialize: function(options) {

        this.useDisplayValue = options.useDisplayValue || false;
        this.expandRef = options.expandRef || false;
        this.useLabel = options.useLabel || false;
		this.debug = options.debug || false;
		

    },

    _print: function(msg) {
        if (!this.debug) {
            return;
        }

        gs.info("Variable Helper: " + msg);
    },

    /**
     * Description: Parse Multi Row Varible set and return array of objects
     * Parameters: mrvs - multi row variable set variable
     * Returns: array
     */
    getMRVS: function(mrvs) {
        var dataToReturn = [];
        this._print('IN GetMRVS');
        this._print(mrvs);
        if (typeof mrvs === 'undefined') {
            return dataToReturn;
        }

        this._print('got past blank check');

        var cellObj = {};

        if (this.expandRef) {
            var questionObj = this._getQuestions(mrvs.getQuestionIds().join(',')) || {};
            this._print(JSON.stringify(questionObj, null, "\t"));

        }

        var rows = mrvs.getRows();
        this._print('Row Lengh-' + rows.length);
        for (var j = 0; j < rows.length; j++) {
            this._print('Row -' + j);
            var row = rows[j];
            var cells = row.getCells();
            for (var k = 0; k < cells.length; k++) {
                var cell = cells[k];
                var varName = cell.getName();
				var objKey = this.useLabel ? cell.getLabel() : varName;
                this._print('MRVS -' + varName);
                if (this.expandRef && questionObj[varName].table && questionObj[varName].table != '') {
                    if (["21"].indexOf(questionObj[varName].type_id) >= 0) {
                        cellObj[objKey] = this.getMultipleRef(questionObj[varName].table, cell.getCellValue().split(','));
                    } else {
                        cellObj[objKey] = this.getRef(questionObj[varName].table, cell.getCellValue());
                    }

                } else {
                    cellObj[objKey] = this.useDisplayValue ? cell.getCellDisplayValue() : cell.getCellValue();
                }

            }
            dataToReturn.push(cellObj);
            cellObj = {};
        }
        return dataToReturn;
    },
    /**
     * Description: Returns Object of questions with thir type and reference table.  Used for MRVS when the expandRef function is true
     * Parameters: questionArr - array of sys_id
     * Returns: Object
     */
    _getQuestions: function(questionArr) {

        var q = {};
        var grQuestion = new GlideRecordSecure('question');
        grQuestion.addQuery('sys_id', 'IN', questionArr);
        grQuestion.query();
        while (grQuestion.next()) {
            q[grQuestion.getValue('name')] = {
                "type": grQuestion.getDisplayValue('type'),
                "type_id": grQuestion.getValue('type'),
                "table": grQuestion.getValue('reference') || grQuestion.getValue('lookup_table') || grQuestion.getValue('list_table') || grQuestion.getValue('choice_table')
            };
        }
        return q;

    },
    getMultipleRef: function(tbl, arr) {
        var arrToReturn = [];
        for (var i = 0; i < arr.length; i++) {
            arrToReturn.push(this.getRef(tbl, arr[i]));
        }
        return arrToReturn;
    },
    /**
 * Description: Return object containing all fields and values of reference field
 * Parameters: 
	 tbl - table name
	 id - sys_id from reference field
 * Returns: array
*/
    getRef: function(tbl, id) {
        this._print('Table: ' + tbl + "\nsys_id: " + id);
        if (!tbl || tbl == '' || !id || id == '') {
            return false;
        }


        var objToReturn = {};
        var grObj = new GlideRecordSecure(tbl);
        if (!grObj.get(id)) {
            return false;
        }


        var fields = grObj.getFields();
        objToReturn['sys_id'] = grObj.getValue('sys_id');
        for (var f = 0; f < fields.size(); f++) {
            var field = fields.get(f);
            if (field.hasValue()) {
                objToReturn[this.useLabel ? field.getLabel() :  field.getName()] = this.useDisplayValue ? field.getDisplayValue() : field.getValue();
            }
        }

        return objToReturn;
    },

    /**
     * Description: Return object containing all variables for a given record.  The object will possibly be nested if expandRef is true
     * Parameters: rec - GlideRecord
     * Returns: Object
     */
    getVariables: function(rec) {
        rec = rec || current;
        if (!rec || rec == '') {
            return;
        }
        var variablesToReturn = {};
        if (!rec.isValidRecord()) {
            return variablesToReturn;
        }

        //var variables = rec.variables;
		var variables = rec.variables.getElements(true);
        var refTable,objKey,question;
		
        //for (var v in variables) {
		for (var v = 0; v < variables.length;v++) {
			question = variables[v].getQuestion();
			objKey = this.useLabel ? question.getLabel() : v;
            if (variables[v].isMultiRow()) {
                this._print(variables[v] + ' MRVS');
                variablesToReturn[this.useLabel ? variables[v].getLabel() : v] = this.getMRVS(variables[v]);
            } else {
                
                this._print(variables[v] + ' - ' + question.getLabel());
				
                if (this.expandRef) {

                    if (question.type == '21') {
                        variablesToReturn[objKey] = this.getMultipleRef(question.lookupTable || question.listTable, question.getValue().split(','));
                    } else {
                        variablesToReturn[objKey] = this.getRef(question.reference || question.choice_table || question.choiceTable, question.getValue());
                    }

                } else {
                    variablesToReturn[objKey] = this.useDisplayValue ? question.getDisplayValue() : question.getValue();
                }
            }
        }

        return variablesToReturn;
    },

    /**
 * Description: get Record from sys_id.
 * Parameters: 
	 sysid = sys_id of record to retrieve
	 tbl = table to retrieve record from.  Defaults to task
 * Returns: Object
*/
    getRecord: function(sysid, tbl) {
        if (!sysid || sysid == '') {
            return;
        }
        tbl = tbl || 'task';
        var grRec = new GlideRecordSecure(tbl);
        if (!grRec.get(sysid)) {
            return;
        }
		
		var recClassName = grRec.getRecordClassName() + '';
        if (recClassName != tbl) {
            return this.getRecord(sysid, recClassName);
        }

        return grRec;

    },

    //Setters
    setUseDisplayValue: function(val) {
        if (typeof val === 'undefined') {
            return;
        }
        this.useDisplayValue = val;
    },

    setExpandRef: function(val) {
        if (typeof val === 'undefined') {
            return;
        }
        this.expandRef = val;
    },

    setDebug: function(val) {
        if (typeof val === 'undefined') {
            return;
        }
        this.debug = val;
    },
    setUseLabel: function(val) {
        if (typeof val === 'undefined') {
            return;
        }
        this.useLabel = val;
    },



    type: 'variableHelper'
};
