var GlideRecordHelper = Class.create();
GlideRecordHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  
  	/**SNDOC
	  @name getField
	  @description: Checks the specified field and returns an object.
	  @param {object} [record] - Glide Record object
	  @param {string} [value] - string of field
	  @return {object}  An object containing label, value, and display value of provided field
	*/
	getField : function (record,value){
		var addValue = {};
		addValue.label = record[value].getLabel();
		addValue.value = record.getValue(value);
		addValue.display_value = record.getDisplayValue(value);
		addValue.type = "notAssigned";
		addValue.type = record && record.getElement(value) && record.getElement(value).getED() && record.getElement(value).getED().getInternalType()?record.getElement(value).getED().getInternalType():null;

		return addValue;
	},
	
	/**SNDOC
	  @name getFields
	  @description: Checks the specified fields and returns an array of field objects.
	  @param {object} [record] - Glide Record object
	  @param {string} [values] - Comma deliminated string of field values
	  @return {object}  An array of objects containing label, value, and display value of provided fields
	*/
	getFields : function (record,values){
		var valueList = values.split(",");
		var returnList = [];

		valueList.forEach(function(currentValue){
			var addValue = {};
			addValue.label = record[currentValue].getLabel();
			addValue.value = record.getValue(currentValue);
			addValue.display_value = record.getDisplayValue(currentValue);
			addValue.type = "notAssigned";
			addValue.type = record && record.getElement(currentValue) && record.getElement(currentValue).getED() && record.getElement(currentValue).getED().getInternalType()?record.getElement(currentValue).getED().getInternalType():null;

			returnList.push(addValue);
		});

		return returnList;
	},

	getFieldsObject: function(record,values){
		var valueList = values.split(",");
		var returnList = {};

		valueList.forEach(function(currentValue){
			returnList[currentValue] = {};
			returnList[currentValue].label = record[currentValue].getLabel();
			returnList[currentValue].value = record.getValue(currentValue);
			returnList[currentValue].display_value = record.getDisplayValue(currentValue);
			returnList[currentValue].type = "notAssigned";
			returnList[currentValue].type = record && record.getElement(currentValue) && record.getElement(currentValue).getED() && record.getElement(currentValue).getED().getInternalType()?record.getElement(currentValue).getED().getInternalType():null;
		});

		return returnList;
	},

	getFieldsObjectWithQuery: function(table,query,values){
		var gr = new GlideRecord(table);
		gr.addEncodedQuery(query);
		gr.query();

		return (gr.next() ? this.getFieldsObject(gr,values) : null);
	},
	
	/**SNDOC
		@name getFieldsObjectWithQueryAjax
		@description: Client callable to get fields array of objects with query
		@param {getParameter}   [sysparm_table] - Valid table
		@param {getParameter}   [sysparm_query] - Encoded query
		@param {getParameter}   [sysparm_values] - Fields to return
		@return {JSON} Array of object with display_value, label, type, and value
		@example
		var gaCi = new GlideAjax('GlideRecordHelper');
		gaCi.addParam('sysparm_name', 'getFieldsObjectWithQueryAjax');
		gaCi.addParam('sysparm_table', 'cmdb_ci');
		gaCi.addParam('sysparm_query', 'sys_id=44c417444f6b2200f92eab99f110c762');
		gaCi.addParam('sysparm_values', 'state');
		gaCi.getXML(callBackFuncation);
		
		function callBackFuncation(response){
		var answer = response.responseXML.documentElement.getAttribute("answer");
		var ci = JSON.parse(answer);
		
		// ci = [state{
		//			display_value: "Active",
		//			label: "State",
		//			type: "integer",
		//			value: "2"
		//		}]	
	*/
	getFieldsObjectWithQueryAjax: function(){
		var table = this.getParameter('sysparm_table');
		var query = this.getParameter('sysparm_query');
		var values = this.getParameter('sysparm_values');
		return JSON.stringify(this.getFieldsObjectWithQuery(table,query,values));
	},

	getFieldsMultiObjectWithQuery: function(table,query,values){
		var fieldObjectArray = [];
		var gr = new GlideRecord(table);
		gr.addEncodedQuery(query);
		gr.query();
		while(gr.next()){
			fieldObjectArray.push(this.getFieldsObject(gr,values));
		}
		return fieldObjectArray;
	},

	/**SNDOC
		@name hasNextQuery
		@description: Checks if the provided query has results, returns true if so.
		@param {string}   [table] - Valid table
		@param {string}   [query] - Encoded query
		@return {boolean}  
	*/
	hasNextQuery: function(table,query){
		table = table || this.getParameter('sysparm_table');
		query = query || this.getParameter('sysparm_query');
		var returnVar = false;
		var grGlideRecord = new GlideRecord(table);
		grGlideRecord.addEncodedQuery(query);
		grGlideRecord.query();
		if (grGlideRecord.hasNext()) {
			returnVar = true;
		}
		return returnVar;
	},

	type: 'GlideRecordHelper'
});
