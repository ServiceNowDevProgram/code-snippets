var RequestedItemUtils = Class.create();

RequestedItemUtils.prototype = {
	initialize: function() {
        //Array of strings, ignores these variables when building lists.
		this.ignoreVariables = [
		];
	},
	/**SNDOC
	@name getVariablesString
	@description Gets all variables for a ritm sorted like they would be on a form and generates an HTML table for them.

	@param {GlideRecord} [gr] - GlideRecord of a sc_req_item record

	@example
		var gr = new GlideRecord('sc_req_item');
		gr.get('9113c3eb1b940d5062e50ed2cd4bcbee');

		var requestedItemUtils = new global.RequestedItemUtils();
		var catItemVars = requestedItemUtils.getVariablesHTML(gr);
		gs.info(catItemVars);

	@returns {string} 
	*/
	getVariablesString : function(gr){
		var variableList = this.getVariables(gr);
		var varString = 'Your approval is required before this request can be processed.\r\n';
		for (var i = 0; i < variableList.length; i++) {
			varString += '\r\n' + variableList[i].title + ' : ' + variableList[i].value;
		}
		return varString;
	},
	/**SNDOC
	@name getVariablesHTML
	@description Gets all variables for a ritm sorted like they would be on a form and generates an HTML table for them.

	@param {GlideRecord} [gr] - GlideRecord of a sc_req_item record

	@example
		var gr = new GlideRecord('sc_req_item');
		gr.get('9113c3eb1b940d5062e50ed2cd4bcbee');

		var requestedItemUtils = new global.RequestedItemUtils();
		var catItemVars = requestedItemUtils.getVariablesHTML(gr);
		gs.info(catItemVars);

	@returns {string} 
	*/
	getVariablesHTML : function(gr){
		var html = '<table>';
		var variableList = this.getVariables(gr);
		for (var i = 0; i < variableList.length; i++) {
			html += '<tr><td>' + variableList[i].title + '</td><td>' + variableList[i].value + '</td>';
		}
		html += '</table>';
		//html = html.replaceAll(' ', '%22').replaceAll('<','&lt;').replaceAll('>','&gt;');
		return html;
	},
	/**SNDOC
	@name getVariables
	@description Gets all variables for a ritm sorted like they would be on a form

	@param {GlideRecord} [gr] - GlideRecord of a sc_req_item record

	@example
		var gr = new GlideRecord('sc_req_item');
		gr.get('9113c3eb1b940d5062e50ed2cd4bcbee');

		var requestedItemUtils = new global.RequestedItemUtils();
		var catItemVars = requestedItemUtils.getVariables(gr);
		gs.info(JSON.stringify(catItemVars));

	@returns {objectArray} 
						[{
							"title", 
							"value", 
							"section", 
							"order", 
							"type", 
							"variable_set", 
							"variable_set_order"
						}]
	*/
	getVariables: function(gr) {
		try{
			var varArray = [];

			varArray.push({
				"title": "Requested Item", 
				"value": gr.cat_item.name.toString(), 
				"section":"", 
				"order":"", 
				"type":"", 
				"variable_set":"", 
				"variable_set_order":""
			});
			var catItemGr = new GlideRecord('sc_cat_item');
			catItemGr.get(gr.cat_item.sys_id);

			//Get variables from variable sets
			var catItemVariables = this.getCatItemVariables(catItemGr);
			var variables = gr.variables.getElements(); 
			for (var i=0;i<variables.length;i++) { 
				var question = variables[i].getQuestion(); 
				var questionTitle = question.getLabel() + '';
				var isIgnore = (this.ignoreVariables.indexOf(questionTitle) != -1);

				//Hide ignored or blank variables
				if(!isIgnore){
					if(!question.getValue().nil() && question.getDisplayValue() != 'false' && question.getDisplayValue() != '' && !question.getValue().nil() && !question.getLabel().nil() && question.getLabel() != ''){
						var itemOrder = '';
						var itemType = '';
						var variableSet = '';
						var variableSetOrder = '';
						var section = '';
						var title = '';
						var value = '';

						var index = -1;
						for(var x = 0; x < catItemVariables.length; x++) {
							if (catItemVariables[x]["display_name"] == questionTitle) {
								index = x;
								break;
							}
							if (catItemVariables[x]["type"] == "CheckBox" && catItemVariables[x]["value"] == questionTitle) {
								index = x;
								break;
							}
						}
						if(index != -1){
							itemOrder = catItemVariables[index]["order"];
							itemType = catItemVariables[index]["type"];
							variableSet = catItemVariables[index]["variable_set"];
							variableSetOrder = catItemVariables[index]["variable_set_order"];
							section = catItemVariables[index]["section"];
							title = catItemVariables[index]["display_name"];
							value = catItemVariables[index]["value"];
						}

						if(question.getLabel() != 'Quantity'){
							varArray.push({
								"title": (title == '' || title == undefined) ? question.getLabel() : title, 
								"value": (value == '' || value == undefined) ? question.getDisplayValue() : value, 
								"section":section, 
								"order":itemOrder, 
								"type":itemType, 
								"variable_set":variableSet, 
								"variable_set_order":variableSetOrder
							});
						}
					}
				}
			}
			return varArray;  // return the calculated value
		}
		catch(e){
			gs.error("Requested Item Utils Exception: " + e);
			return '';
		}
	},

	/**SNDOC
	@name getCatItemVariables
	@description Gets all variables for a catalog item sorted like they would be on a form

	@param {GlideRecord} [catItemGr] - GlideRecord of a sc_cat_item record

	@example

	@returns {objectArray} 
						[{
							"display_name", 
							"order",
							"type",
							"variable_set",
							"variable_set_order"
						}]
	*/
	getCatItemVariables: function(catItemGr){
		var variablesList = [];

		var variableSets = this.getCatItemVariableSets(catItemGr);
		var encodedQuery = 'cat_item=' + catItemGr.sys_id;

		for(var i=0; i<variableSets.length; i++){
			encodedQuery += '^ORvariable_set=' + variableSets[i]["sys_id"];
		}

		var variablesGr = new GlideRecord('item_option_new');
		variablesGr.addEncodedQuery(encodedQuery);
		variablesGr.query();

		while(variablesGr.next()){
			var variableSetOrder = '0';
			for(var j=0; j<variableSets.length; j++){
				if(variablesGr.getDisplayValue('variable_set') == variableSets[j]['display_value']){
					variableSetOrder = variableSets[j]['order'];
					break;
				}
			}
			variablesList.push({
				"display_name" : variablesGr.getValue('question_text'), 
				"order" : variablesGr.getValue('order'),
				"type" : variablesGr.getDisplayValue('type'),
				"variable_set" : variablesGr.getDisplayValue('variable_set'),
				"variable_set_order" : variableSetOrder,
				"section" : ''
			});
		}

		var sortedSetVariables = this._sortByVariableSet(variablesList,variableSets);
		var sortedAllVariables = this._addVariablesWithoutSets(variablesList,sortedSetVariables);
		var sectionDefinedVariables = this._setVariableSection(sortedAllVariables);

		return sectionDefinedVariables;
	},
	/**SNDOC
	@name getCatItemVariableSets
	@description Returns variable sets for a catalog item

	@param {GlideRecord} [catItemGr] - GlideRecord of a sc_cat_item record

	@example

	@returns
				[{
					"sys_id":variableSetGr.variable_set.getValue(),
					"order":variableSetGr.order.getValue(),
					"display_value":variableSetGr.variable_set.title.getValue()
				}]
	*/
	getCatItemVariableSets: function(catItemGr){
		var variableSetList = [];

		var variableSetGr = new GlideRecord('io_set_item');
		variableSetGr.addQuery('sc_cat_item',catItemGr.sys_id);
		variableSetGr.query();

		while(variableSetGr.next()){
			variableSetList.push({
				"sys_id":variableSetGr.variable_set.getValue(),
				"order":variableSetGr.order.getValue(),
				"display_value":variableSetGr.variable_set.title.getValue()
			});
		}
		return variableSetList;
	},
	//Internal - For sorting variables by set, then we'll sort by order
	_sortByVariableSet: function(variables,variableSets){

		var variableArray = [];
		var variableSetArray = [];
		var variableSetOrders = [];

		//Sort variable sets by order
		variableSets.sort(this._sortByOrder);

		//Add variables to array that have a variable set(ones without a variable set will come after)
		for(var i=0; i<variableSets.length; i++){
			var variablesInSets=[];
			var sortedVariables=[];
			for(var j=0; j<variables.length; j++){
				if(variables[j].variable_set == variableSets[i].display_value){
					variablesInSets.push(variables[j]);
				}
			}
			//Sort variables then push them into the variable array
			sortedVariables = variablesInSets.sort(this._sortByOrder);

			for(var k=0; k<sortedVariables.length; k++){
				if(!this._existsInArray(variableArray,sortedVariables[k],"display_name"))
				{
					variableArray.push(sortedVariables[k]);
				}
			}
		}
		return variableArray;
	},
	//Internal - For adding variables that are outside of variable sets to the final array
	_addVariablesWithoutSets: function(variables,variableSetVariables){

		var noSetVariables = [];
		var allVariables = [];

		//Add variables with no variable set to the noSetVariables array
		for(var i = 0; i<variables.length; i++){
			var thisVariable = variables[i];
			if(thisVariable["variable_set"] == '' || thisVariable["variable_set"] == undefined || thisVariable["variable_set"] == null){
				thisVariable['variable_set_order'] = thisVariable['order'];
				noSetVariables.push(thisVariable);
			}
		}

		//Sort variables then push them into the variable array
		var sortedVariables = noSetVariables.sort(this._sortByVarSetOrder);

		//Build new array with sorted variables with and without variable sets
		//Loop through all variables
		for (var j = 0; j<variables.length; j++){
			var thisVar = variables[j];
			//Loop through all sorted variables without variable sets
			//Place the variables without sets before the variables that do have sets
			for (var k = 0; k<sortedVariables.length; k++){
				var thisSortedVar = sortedVariables[k];
				if(thisVar['variable_set_order'] >= thisSortedVar['variable_set_order'] && !this._existsInArray(allVariables,thisSortedVar,"display_name")){
					//Looping through variables without sets again
					//This is to make sure we include variables with duplicate orders
					for(var l = 0; l<sortedVariables.length; l++){
						var thisInnerSortedVar = sortedVariables[l];
						if(thisInnerSortedVar['variable_set_order'] == thisSortedVar['variable_set_order'] && !this._existsInArray(allVariables,thisInnerSortedVar,"display_name")){
							allVariables.push(thisInnerSortedVar);
						}
					}
				}
			}
			//Add the variable to the array if it doesn't already exist
			if(!this._existsInArray(allVariables,thisVar,"display_name")){
				allVariables.push(thisVar);
			}
		}
		var sortedAllVariables = allVariables.sort(this._sortByVarSetOrder);
		var finalSortedAllVariables = allVariables.sort(this._sortByOrderAndVarSetOrder);
		return finalSortedAllVariables;
	},
	_sortByOrder: function(a, b){
		// Use toUpperCase() to ignore character casing
		var orderA = Math.round(a["order"]);
		var orderB = Math.round(b["order"]);

		var sort = 0;
		if (orderA > orderB) {
			sort = 1;
		} else if (orderA < orderB) {
			sort = -1;
		}
		return sort;
	},
	_sortByVarSetOrder: function(a, b){
		// Use toUpperCase() to ignore character casing
		var orderA = Math.round(a["variable_set_order"]);
		var orderB = Math.round(b["variable_set_order"]);

		var sort = 0;
		if (orderA > orderB) {
			sort = 1;
		} else if (orderA < orderB) {
			sort = -1;
		}
		return sort;
	},
	_sortByOrderAndVarSetOrder: function(a, b){
		// Use toUpperCase() to ignore character casing
		var orderSetA = Math.round(a["variable_set_order"]);
		var orderSetB = Math.round(b["variable_set_order"]);
		var orderA = Math.round(a["order"]);
		var orderB = Math.round(b["order"]);

		var sort = 0;
		//If they're in the same variable set, organize
		if (orderSetA == orderSetB && orderA > orderB) {
			sort = 1;
		} else if (orderSetA == orderSetB && orderA < orderB) {
			sort = -1;
		}

		//If they're not in the same variable set, organize
		if (orderSetA != orderSetB && orderSetA > orderSetB) {
			sort = 1;
		} else if (orderSetA != orderSetB && orderSetA < orderSetB) {
			sort = -1;
		}
		return sort;
	},
	_existsInArray: function(array,object,searchBy){
		result = false;
		for(var i=0; i<array.length; i++){
			if(object[searchBy] == array[i][searchBy]){
				result = true;
				break;
			}
		}
		return result;
	},
	_setVariableSection: function(variables){
		for(var i=0; i<variables.length;i++){
			//If the variable is in a variable set, name section the variable set name
			if(variables[i]['variable_set'] != '' && variables[i]['variable_set'] != null && variables[i]['variable_set'] != undefined){
				variables[i]['section'] = this._removeParentheses(variables[i]['variable_set']);
			}

			//If the variable is a container start then set the section of the variables inside
			if(variables[i]['type'] == 'Container Start'){
				var containerStart = i;
				var containerEnd = this._getNextElementInArray(variables, 'type', i, 'Container End');

				//Name the section
				var containerName = 'Checked Boxes';
				if(variables[i]['display_name'] != '' && variables[i]['display_name'] != null && variables[i]['display_name'] != undefined){
					containerName = variables[i]['display_name'];
				}
				else if((variables[i]['display_name'] == '' || variables[i]['display_name'] == null || variables[i]['display_name'] == undefined) && variables[i]['variable_set']){
					containerName = variables[i]['variable_set'];
				}

				containerName = this._removeParentheses(containerName);
				if(containerEnd != -1){
					for (var j=(containerStart+1); j<(containerEnd-1); j++){
						variables[j]['section'] = containerName;
						variables[j] = this._setVariableCheckboxNames(variables[j]);
					}
				}
			}
			if(variables[i]['type'] == 'CheckBox'){
				variables[i] = this._setVariableCheckboxNames(variables[i]);
			}
			//TOOD: Later add "If it's a label with checkboxes under it"
		}
		return variables;
	},
	_setVariableCheckboxNames: function(obj){
		if(obj['type'] == 'CheckBox' && obj['section']){
			var name = obj['display_name'];
			var section = obj['section'];
			obj['display_name'] = section;
			obj['value'] = name;
		}
		return obj;
	},
	_getNextElementInArray: function(array, property, startFrom, searchFor){
		index = -1;
		for(var i = startFrom; i<array.length; i++){
			if(array[i][property] == searchFor){
				index = i;
				break;
			}
		}
		return index;
	},
	_removeParentheses: function(str){
		var result = '';
		result = (str.replace(/\([^()]*\)/g, '')).trim();
		return result;
	},
	type: 'RequestedItemUtils'
};