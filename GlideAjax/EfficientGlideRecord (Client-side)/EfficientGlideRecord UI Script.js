/**
 * UI Script (Desktop-Global)
 * @description See related article for full usage instructions and API documentation:
 * https://snprotips.com/efficientgliderecord
 * @classdesc https://snprotips.com/efficientgliderecord
 * @author
 *  Tim Woodruff (https://TimothyWoodruff.com)
 *  SN Pro Tips (https://snprotips.com)
 * @version 1.0.1
 * @class
 *
 * @license
 * Copyright (c) 2022 Tim Woodruff (https://TimothyWoodruff.com)
 * & SN Pro Tips (https://snprotips.com).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 * Alternative licensing is available upon request. Please contact tim@snc.guru
 *  for more info.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
class EfficientGlideRecord {
	
	/**
	 * Instantiated with the 'new' keyword (as classes typically are when instantiated), this
	 *  will construct a client-side EfficientGlideRecord object. The methods of this class can
	 *  then be called to construct a client-side GlideRecord query. EfficientGlideRecord
	 *  replicates *most* of the functionality of the client-side GlideRecord object, but
	 *  with more and enhanced functionality.
	 * EfficientGlideRecord is FAR preferable to using the out-of-box (OOB) client-side
	 *  GlideRecord query (even asynchronously), because GlideRecord returns a massive amount
	 *  of unnecessary data, and can be much, much slower. EfficientGlideRecord aims to return
	 *  only that data which is necessary and requested from the server, thus providing an
	 *  efficient interface to query records asynchronously without all the additional overhead
	 *  related to information that you don't need.
	 *
	 * Additional documentation can be found on the SN Pro Tips blog, at https://go.snc.guru/egr
	 * NOTE: For info on performing async queries in onSubmit Client Scripts, see
	 *  https://go.snc.guru/onsubmit
	 *
	 * @param {String} tableName - The name of the table on which to execute your GlideRecord query
	 * @returns {EfficientGlideRecord}
	 * @example
	 * var egrIncident = new EfficientGlideRecord('incident');
	 * egrIncident.addField('number')
	 * 	.addField('assignment_group', true)
	 * 	.addField('assigned_to', true);
	 *
	 * egrIncident.get('some_incident_sys_id', function(egrInc) {
	 * 	g_form.addInfoMessage(
	 * 		egrInc.getValue('number') + '\'s assignment group is ' +
	 * 		egrInc.getDisplayValue('assignment_group') + ' (sys_id: ' +
	 * 		egrInc.getValue('assignment_group') + ')\n' +
	 * 		'The assignee is ' + egrInc.getDisplayValue('assigned_to') + ' (sys_id: ' +
	 * 		egrInc.getValue('assigned_to') + ')'
	 * 	);
	 * });
	 * @constructor
	 */
	constructor(tableName) {
		if (!tableName) {
			throw new Error(
				'EfficientGlideRecord constructor called without a valid tableName ' +
				'argument. Cannot continue.'
			);
		}
		
		this._config = {
			'table_to_query' : tableName,
			'fields_to_get' : [],
			'record_limit' : 0,
			'order_by_field' : '',
			'order_by_desc_field' : '',
			'encoded_queries' : [],
			'queries' : []
		};
		
		this._row_count = -1;
		this._query_complete = false;
		
		this._records = [];
		this._current_record_index = -1;
		this._current_record = {};
		
		this._gaQuery = new GlideAjax('ClientGlideRecordAJAX');
		this._gaQuery.addParam('sysparm_name', 'getPseudoGlideRecord');
		
		return this;
	}
	
	/**
	 * Add a field to retrieve from the target record(s).
	 * Any fields not specified by calling this method will not be available on the resulting
	 *  EfficientGlideRecord object in the callback function after calling .query(). In this
	 *  case, a warning will be shown in the console, and .getValue('field_name') will return
	 *  a blank string.
	 * If a second argument (getDisplayValue) is not specified and set to true, then the
	 *  field's display value will not be available on the resulting EfficientGlideRecord
	 *  object in the callback function. In this case, .getDisplayValue('field_name') will
	 *  return a blank string.
	 * @param {String} fieldName - The name of the field to retrieve from the server for the
	 *  specified record(s).
	 * @param {Boolean} [getDisplayValue=false] - Set this argument to true in order to
	 *  retrieve the display value for the specified field. If this is not set to true then
	 *  calling .getDisplayValue('field_name') will cause a warning to be logged to the
	 *  console, and a blank string will be returned.
	 * @returns {EfficientGlideRecord}
	 * @example
	 * var egrIncident = new EfficientGlideRecord('incident');
	 * egrIncident.addField('number')
	 * 	.addField('assignment_group', true)
	 * 	.addField('assigned_to', true);
	 *
	 * egrIncident.get('some_incident_sys_id', function(egrInc) {
	 * 	g_form.addInfoMessage(
	 * 		egrInc.getValue('number') + '\'s assignment group is ' +
	 * 		egrInc.getDisplayValue('assignment_group') + ' (sys_id: ' +
	 * 		egrInc.getValue('assignment_group') + ')\n' +
	 * 		'The assignee is ' + egrInc.getDisplayValue('assigned_to') + ' (sys_id: ' +
	 * 		egrInc.getValue('assigned_to') + ')'
	 * 	);
	 * });
	 */
	addField(fieldName, getDisplayValue) {
		this._config.fields_to_get.push({
			'name' : fieldName,
			'get_display_value' : (!!getDisplayValue)
		});
		
		return this;
	}
	
	/**
	 * Add a query to the EfficientGlideRecord object.
	 * By specifying a field name, operator, and value, you can perform all sorts of queries.
	 * If only two arguments are specified, then it's assumed that the first is the field
	 *  name and the second is the field value. The operator will automatically be set to "=".
	 *
	 * @param {String} fieldName - The name of the field to perform the query against.
	 * @param {String} [operator="="] - The operator to use for the query.
	 * Valid operators:
	 * Numbers: =, !=, >, >=, <, <=
	 * Strings: =, !=, STARTSWITH, ENDSWITH, CONTAINS, DOES NOT CONTAIN, IN, NOT IN, INSTANCEOF
	 * Note: If only two arguments are specified (fieldValue is not defined), then the second
	 *  argument will be treated as the value, and the operator will automatically be set to "=".
	 * @param {String} fieldValue - The value to compare, using the specified operator, against
	 *  the specified field.
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling (as seen in the example below).
	 * @example
	 * new EfficientGlideRecord('incident')
	 * 	.setLimit(10)
	 * 	.addQuery('assignment_group', '!=', 'some_group_sys_id')
	 * 	.addQuery('assigned_to', 'some_assignee_sys_id')
	 * 	.addNotNullQuery('assignment_group')
	 * 	.addField('number')
	 * 	.addField('short_description')
	 * 	.addField('assignment_group', true) //Get display value as well
	 * 	.orderBy('number')
	 * 	.query(function (egrIncident) {
	 * 		while (egrIncident.next()) {
	 * 			console.log(
	 * 				'Short description value: ' + egrIncident.getValue('short_description') + '\n' +
	 * 				'Number: ' + egrIncident.getValue('number') + '\n' +
	 * 				'Assignment group: ' + egrIncident.getValue('assignment_group') + ' (' +
	 * 				egrIncident.getDisplayValue('assignment_group') + ')'
	 * 			);
	 * 		}
	 * 	});
	 */
	addQuery(fieldName, operator, fieldValue) {
		if (typeof fieldValue === 'undefined') {
			fieldValue = operator;
			operator = '=';
		}
		
		this._config.queries.push({
			'field' : fieldName,
			'operator' : operator,
			'value' : fieldValue
		});
		
		return this;
	}
	
	/**
	 * Shorthand for this.addQuery(fieldName, '!=', 'NULL');.
	 * @param {String} fieldName - The name of the field to ensure is not empty on returned
	 *  records.
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling.
	 *  @example
	 *  new EfficientGlideRecord('incident')
	 * 	.setLimit(10)
	 * 	.addQuery('assignment_group', '!=', 'some_group_sys_id')
	 * 	.addQuery('assigned_to', 'some_assignee_sys_id')
	 * 	.addNotNullQuery('assignment_group')
	 * 	.addField('number')
	 * 	.addField('short_description')
	 * 	.addField('assignment_group', true) //Get display value as well
	 * 	.orderBy('number')
	 * 	.query(function (egrIncident) {
	 * 		while (egrIncident.next()) {
	 * 			console.log(
	 * 				'Short description value: ' + egrIncident.getValue('short_description') + '\n' +
	 * 				'Number: ' + egrIncident.getValue('number') + '\n' +
	 * 				'Assignment group: ' + egrIncident.getValue('assignment_group') + ' (' +
	 * 				egrIncident.getDisplayValue('assignment_group') + ')'
	 * 			);
	 * 		}
	 * 	});
	 */
	addNotNullQuery(fieldName) {
		this.addQuery(fieldName, '!=', 'NULL');
		
		return this;
	}
	
	/**
	 * Shorthand for .addQuery(fieldName, '=', 'NULL')
	 * @param {String} fieldName - The name of the field to use in your query, getting only
	 *  records where this field is empty.
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling.
	 */
	addNullQuery(fieldName) {
		this.addQuery(fieldName, '=', 'NULL');
		
		return this;
	}
	
	/**
	 * Add an encoded query string to your query. Records matching this encoded query will
	 *  be available in your callback function after calling .query().
	 * @param {String} encodedQueryString - The encoded query string to use in your query.
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling.
	 */
	addEncodedQuery(encodedQueryString) {
		if (!encodedQueryString || typeof encodedQueryString !== 'string') {
			throw new Error(
				'Invalid encoded query string specified. Encoded query must be a valid ' +
				'non-empty string.'
			);
		}
		
		this._config.encoded_queries.push(encodedQueryString);
		
		return this;
	}
	
	/**
	 * Very similar to .addEncodedQuery(), except that it REPLACES any existing encoded
	 *  queries on the GlideRecord, rather than adding to them.
	 * @param {String} encodedQueryString - The exact encoded query, as a string, to use in
	 *  your query.
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling.
	 */
	setEncodedQuery(encodedQueryString) {
		//REPLACE existing encoded queries, rather than add to them like .addEncodedQuery().
		this._config.encoded_queries = [encodedQueryString];
		
		return this;
	}
	
	/**
	 * Orders the queried table by the specified column, in ascending order
	 * (Alternate call for .orderBy(fieldName).)
	 * @param orderByField
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling.
	 */
	addOrderBy(orderByField) {
		this.orderBy(orderByField);
		
		return this;
	}
	
	/**
	 * Orders the queried table by the specified column, in ascending order
	 * @param {String} orderByField - Orders the queried table by the specified column,
	 *  in ascending order
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling.
	 */
	orderBy(orderByField) {
		this._config.order_by_field = orderByField;
		
		return this;
	}
	
	/**
	 * Orders the queried table by the specified column, in descending order
	 * @param {String} orderByDescField - Orders the queried table by the specified column,
	 *  in descending order
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling.
	 */
	orderByDesc(orderByDescField) {
		this._config.order_by_desc_field = orderByDescField;
		
		return this;
	}
	
	/**
	 * Limits the number of records queried from the database and
	 * returned to the response.
	 * @param {Number} limit - The limit to use in the database query. No more than this number
	 *  of records will be returned.
	 * @returns {EfficientGlideRecord} - Returns the instantiated object for optional
	 *  chain-calling.
	 */
	setLimit(limit) {
		if (typeof limit !== 'number' || limit <= 0) {
			throw new Error(
				'EfficientGlideRecord.setLimit() method called with an invalid argument. ' +
				'Limit must be a number greater than zero.'
			);
		}
		this._config.record_limit = limit;
		
		return this;
	}
	
	/**
	 * Gets a single record, efficiently, from the database by sys_id.
	 * @param {String} sysID - The sys_id of the record to retrieve. Must be the sys_id of
	 *  a valid record which the user has permissions to see, in the table specified in the
	 *  constructor when instantiating this object.
	 * @param {function} callbackFn - The callback function to be called when the query is
	 *  complete.
	 * When the query is complete, this callback function will be called with one argument:
	 *  the EfficientGlideRecord object containing the records resultant from your query.
	 *  After querying (in your callback function), you can call methods such as .next()
	 *  and .getValue() to iterate through the returned records and get field values.
	 */
	get(sysID, callbackFn) {
		this.addQuery('sys_id', sysID);
		this.setLimit(1);
		
		this.query(callbackFn);
	}
	
	/**
	 * Perform the async query constructed by calling methods in this class, and get the
	 * field(s) from the resultant record that were requested by calling
	 *  .addField(fieldName, getDisplayValue)
	 * @async
	 * @param {function} callbackFn - The callback function to be called
	 *  when the query is complete.
	 * When the query is complete, this callback function will be called with one argument:
	 *  the EfficientGlideRecord object containing the records resultant from your query.
	 *  After querying (in your callback function), you can call methods such as .next()
	 *  and .getValue() to iterate through the returned records and get field values.
	 */
	query(callbackFn) {
		let paramName;
		
		if (!this._readyToSend()) {
			//Meaningful errors are logged by this._readyToSend().
			return false;
		}
		
		for (paramName in this._config) {
			//Prevent iteration into non-own properties
			if (!this._config.hasOwnProperty(paramName)) {
				continue;
			}
			
			let paramVal;
			
			if (typeof this._config[paramName] === 'object') {
				paramVal = JSON.stringify(this._config[paramName]);
			} else {
				paramVal = this._config[paramName];
			}
			
			this._gaQuery.addParam(
				paramName,
				paramVal
			);
		}
		this._gaQuery.getXMLAnswer(function (answer, eGR) {
			
			answer = JSON.parse(answer);
			//let answer = response.responseXML.documentElement.getAttribute('answer');
			// answer = JSON.parse(answer); //Throws if unparseable -- good.
			if (!answer.hasOwnProperty('_records')) {
				throw new Error(
					'Something went wrong when attempting to get records from the server.\n' +
					'Response object: \n' +
					JSON.stringify(answer)
				);
			}
			
			eGR._query_complete = true;
			eGR._records = answer._records;
			eGR._row_count = answer._row_count;
			eGR._executing_as = answer._executing_as;
			
			
			callbackFn(eGR);
		}, null, this);
		
	}
	
	/* The following methods can only be called after the query is performed */
	
	/**
	 * Check if there is a "next" record to iterate into using .next() (without actually positioning the current record to the next one).
	 * Can only be called from the callback function passed into .query()/.get() after the query
	 *  has completed.
	 * @returns {boolean} - True if there is a "next" record to iterate into, or false if not.
	 */
	hasNext() {
		if (!this._query_complete) {
			/*throw new Error(
				'The .hasNext() method of EfficientGlideRecord can only be called from the ' +
				'callback function after calling .query()'
			);*/
			
			return false;
		}
		
		return (this._row_count > (this._current_record_index + 1));
	}
	
	/**
	 * Iterate into the next record, if one exists.
	 * Usage is the same as GlideRecord's .next() method.
	 * @returns {boolean} - True if there was a "next" record, and we've successfully positioned
	 *  into it. False if not. Can only be run from the callback function after a query using .query() or .get().
	 */
	next() {
		if (!this._query_complete) {
			/*throw new Error(
				'The .next() method of EfficientGlideRecord can only be called from the ' +
				'callback function after calling .query()'
			);*/
			
			return false;
		}
		if (!this.hasNext()) {
			return false;
		}
		
		this._current_record_index++;
		this._current_record = this._records[this._current_record_index];
		
		return true;
	}
	
	/**
	 * Returns true if the specified field exists and can be read (even if it's blank).
	 * Will return false in the following cases:
	 *  -The specified field on the current record cannot be read
	 *  -The specified field does not exist in the response object (which may happen if you don't
	 *   add the field to your request using .addField()).
	 *  -The specified field does not exist in the database
	 * @param {String} fieldName - The name of the field to check whether the user can read or not.
	 * @returns {Boolean} - Returns true if the specified field exists and can be read, or
	 *  false otherwise.
	 */
	canRead(fieldName) {
		if (!this._query_complete) {
			throw new Error(
				'The .canRead() method of EfficientGlideRecord can only be called from the ' +
				'callback function after calling .query(callbackFn)'
			);
		}
		
		if (!this._current_record._field_values.hasOwnProperty(fieldName)) {
			console.warn(
				'There is no field with the name ' + fieldName + ' in the ' +
				'EfficientGlideRecord object. Did you remember to specify that you want to ' +
				'get that field in the query using .addField()?'
			);
			return false;
		}
		
		if (!this._current_record._field_values[fieldName].hasOwnProperty('can_read')) {
			console.warn(
				'The requested field "' + fieldName + '" has no can_read node. ' +
				'This should not happen. Returning a blank false.'
			)
			return false;
		}
		
		return (!!this._current_record._field_values[fieldName].can_read) || false;
	}
	
	/**
	 * Retrieve the database value for the specified field, if the user has permissions to read that field's value.
	 * @param fieldName
	 * @returns {string}
	 */
	getValue(fieldName) {
		if (!this._query_complete) {
			throw new Error(
				'The .getValue() method of EfficientGlideRecord can only be called from the ' +
				'callback function after calling .query(callbackFn)'
			);
		}
		
		if (!this._current_record._field_values.hasOwnProperty(fieldName)) {
			console.warn(
				'There is no field with the name ' + fieldName + ' in the ' +
				'EfficientGlideRecord object. Did you remember to specify that you want to ' +
				'get that field in the query using .addField()?'
			);
			return '';
		}
		
		if (!this._current_record._field_values[fieldName].hasOwnProperty('value')) {
			console.warn(
				'The requested field "' + fieldName + '" has no value node. ' +
				'This should not happen. Returning a blank string.'
			)
			return '';
		}
		
		return this._current_record._field_values[fieldName].value || '';
	}
	
	/**
	 * Retrieve the display value for the specified field, if the user has permission to view
	 *  that field's value.
	 * Can only be called from the callback function after the query is complete.
	 * @param fieldName
	 * @returns {string|*|string}
	 */
	getDisplayValue(fieldName) {
		if (!this._query_complete) {
			throw new Error(
				'The .getDisplayValue() method of EfficientGlideRecord can only be called from the ' +
				'callback function after calling .query(callbackFn)'
			);
		}
		if (!this._current_record._field_values.hasOwnProperty(fieldName)) {
			console.warn(
				'There is no field with the name ' + fieldName + ' in the ' +
				'EfficientGlideRecord object. Did you remember to specify that you want to ' +
				'get that field in the query using .addField()?'
			);
			return '';
		}
		if (
			!this._current_record._field_values[fieldName].hasOwnProperty('display_value') ||
			!this._current_record._field_values[fieldName].display_value
		) {
			console.warn(
				'There is no display value for the field with the name ' + fieldName +
				' in the EfficientGlideRecord object. Did you remember to specify that you ' +
				'want to get that field\'s display value in the query using ' +
				'.addField(fieldName, true)?'
			);
			return '';
		}
		
		return this._current_record._field_values[fieldName].display_value || '';
	}
	
	/**
	 * Retrieves the number of records returned from the query.
	 * If used in conjunction with .setLimit(), then the maximum value returned from this
	 *  method will be the limit number (since no more records than the specified limit can
	 *  be returned from the server).
	 *
	 * @returns {number} - The number of records returned from the query.
	 * @example
	 * //Show the number of child Incidents missing Short Descriptions.
	 * new EfficientGlideRecord('incident')
	 * 	.addQuery('parent', g_form.getUniqueValue())
	 * 	.addNullQuery('short_description')
	 * 	.addField('number')
	 * 	.query(function (egrIncident) {
	 * 		if (egrIncident.hasNext()) {
	 * 			g_form.addErrorMessage(
	 * 				egrIncident.getRowCount() + ' child Incidents are missing a short description.'
	 * 			);
	 * 		}
	 * 	});
	 * 	@since 1.0.1
	 */
	getRowCount() {
		return this._row_count;
	}
	
	/* Private helper methods below */
	
	_readyToSend() {
		if (!this._config.table_to_query) {
			console.error(
				'EfficientGlideRecord not ready to query. Table name was not specified in ' +
				'the constructor\'s initialize argument.'
			);
			return false;
		}
		
		if (
			!this._config.fields_to_get ||
			this._config.fields_to_get.length < 1
		) {
			console.error(
				'EfficientGlideRecord not ready to query. No fields were specified to ' +
				'retrieve. \nPlease specify which fields you want to retrieve from the ' +
				'GlideRecord object using .addField(fieldName, getDisplayValue). ' +
				'Afterward, in your callback, you can use .getValue(fieldName). If ' +
				'you set getDisplayValue to true, you can also use ' +
				'.getDisplayValue(fieldName).'
			);
			return false;
		}
		
		//Warn if queries AND encoded queries are both empty and limit is unspecified
		// (but don't return false)
		if (
			(
				!this._config.hasOwnProperty('queries') ||
				this._config.queries.length < 1
			) &&
			(
				!this._config.hasOwnProperty('encoded_queries') ||
				this._config.encoded_queries.length < 1
			) &&
			(
				!this._config.hasOwnProperty('record_limit') ||
				this._config.record_limit < 1
			)
		) {
			console.warn(
				'The EfficientGlideRecord query has no query and no record limit ' +
				'associated with it. This may result in poor performance when querying larger ' +
				'tables. Please make sure that you need all records in the specified table, ' +
				'as all records will be returned by this query.'
			);
		}
		
		//Return true if none of the above validations have failed.
		return true;
	}
}