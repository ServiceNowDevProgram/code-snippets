/*
	Server-side client-callable Script Include.
	See related article for full usage instructions and API documentation:
	https://snprotips.com/efficientgliderecord
*/
var ClientGlideRecordAJAX = Class.create();
ClientGlideRecordAJAX.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	
	gr_config : {},
	
	getPseudoGlideRecord : function() {
		var grQuery;
		var responseObj = {
			'_records' : [],
			'_row_count' : 0,
			'_config' : {},
			'_executing_as' : {
				'user_name' : gs.getUserName(),
				'user_id' : gs.getUserID()
			}
		};
		
		this.gr_config = {};
		
		this.gr_config.table_to_query = this.getParameter('table_to_query');
		//@type {{get_display_value: boolean, name: string}}
		this.gr_config.fields_to_get = this.getParameter('fields_to_get');
		this.gr_config.record_limit = this.getParameter('record_limit');
		this.gr_config.order_by_field = this.getParameter('order_by_field');
		this.gr_config.order_by_desc_field = this.getParameter('order_by_desc_field');
		this.gr_config.encoded_queries = this.getParameter('encoded_queries');
		this.gr_config.queries = this.getParameter('queries');
		
		//Parse queries/encoded queries array and fields_to_get object
		if (this.gr_config.hasOwnProperty('queries') && this.gr_config.queries) {
			this.gr_config.queries = JSON.parse(this.gr_config.queries);
		}
		if (this.gr_config.hasOwnProperty('fields_to_get') && this.gr_config.fields_to_get) {
			this.gr_config.fields_to_get = JSON.parse(this.gr_config.fields_to_get);
		}
		if (this.gr_config.hasOwnProperty('encoded_queries') && this.gr_config.encoded_queries) {
			this.gr_config.encoded_queries = JSON.parse(this.gr_config.encoded_queries);
		}
		
		gs.debug('EfficientGlideRecord config: \n' + JSON.stringify(this.gr_config, null, 2));
		
		if (!this._validateMandatoryConfig()) {
			throw new Error(
				'Mandatory value not specified. ' +
				'Cannot perform query. Halting.\n' +
				'Config: \n' +
				JSON.stringify(this.gr_config)
			);
		}
		
		grQuery = this._constructAndGetGlideRecord();
		grQuery.query();
		
		while (grQuery.next()) {
			responseObj._records.push(
				this._getRequestedRecordData(grQuery, this.gr_config)
			);
		}
		
		responseObj._row_count = responseObj._records.length;
		responseObj._config = this.gr_config;
		
		return JSON.stringify(responseObj);
	},
	
	_constructAndGetGlideRecord : function() {
		var i, queryField, queryOperator, queryValue;
		var grQuery = new GlideRecordSecure(this.gr_config.table_to_query);
		
		//Add limit, if specified
		if (
			this.gr_config.hasOwnProperty('record_limit') &&
			this.gr_config.record_limit >= 1
		) {
			grQuery.setLimit(this.gr_config.record_limit);
		}
		
		//add order_by or order_by_desc field, if specified
		if (
			this.gr_config.hasOwnProperty('order_by_desc_field') &&
			this.gr_config.order_by_desc_field
		) {
			grQuery.orderByDesc(this.gr_config.order_by_desc_field);
		}
		if (
			this.gr_config.hasOwnProperty('order_by_field') &&
			this.gr_config.order_by_field
		) {
			grQuery.orderBy(this.gr_config.order_by_field);
		}
		
		//Add encoded query, if specified
		if (
			this.gr_config.hasOwnProperty('encoded_queries') &&
			this.gr_config.encoded_queries
		) {
			for (i = 0; i < this.gr_config.encoded_queries.length; i++) {
				if (this.gr_config.encoded_queries[i]) {
					grQuery.addEncodedQuery(this.gr_config.encoded_queries[i]);
				}
			}
		}
		
		//Add field queries if specified
		if (
			this.gr_config.hasOwnProperty('queries') &&
			this.gr_config.queries.length > 0
		) {
			for (i = 0; i < this.gr_config.queries.length; i++) {
				queryField = this.gr_config.queries[i].field;
				queryOperator = this.gr_config.queries[i].operator;
				queryValue = this.gr_config.queries[i].value;
				
				grQuery.addQuery(queryField, queryOperator, queryValue);
			}
		}
		
		return grQuery;
	},
	
	_validateMandatoryConfig : function() {
		var i, currentQuery;
		//May add more later if necessary
		var mandatoryFields = [
			'table_to_query',
			'fields_to_get'
		];
		
		for (i = 0; i < mandatoryFields.length; i++) {
			if (
				!this.gr_config.hasOwnProperty(mandatoryFields[i]) ||
				!this.gr_config[mandatoryFields[i]]
			) {
				return false;
			}
		}
		
		//If both order_by and order_by_desc are specified, log a warning and ignore order_by_desc.
		// if (
		// 	(
		// 		this.gr_config.hasOwnProperty('order_by_field') &&
		// 		this.gr_config.order_by_field
		// 	) &&
		// 	(
		// 		this.gr_config.hasOwnProperty('order_by_desc_field') &&
		// 		this.gr_config.order_by_desc_field
		// 	)
		// ) {
		// 	gs.warn(
		// 		'ClientGlideRecordAJAX client-callable Script Include called with ' +
		// 		'both an "order by" and "orderby descending" field. It is only possible to ' +
		// 		'specify one field to sort by, either ascending or descending. \n' +
		// 		'Ignoring the descending field, and ordering by the order_by_field field.'
		// 	);
		// 	this.gr_config.order_by_desc_field = '';
		// }
		
		/*
			Decided to remove the above code and allow the user to order their results
			however they like, I'm not their dad.
		*/
		
		if (
			this.gr_config.hasOwnProperty('queries') &&
			this.gr_config.queries
		) {
			for (i = 0; i < this.gr_config.queries.length; i++) {
				currentQuery = this.gr_config.queries[i];
				if (
					(!currentQuery.hasOwnProperty('field') || !currentQuery.field) ||
					(!currentQuery.hasOwnProperty('operator') || !currentQuery.operator) ||
					(!currentQuery.hasOwnProperty('value') || !currentQuery.value)
				) {
					gs.error(
						'Malformed query provided to ClientGlideRecordAJAX Script Include:\n' +
						JSON.stringify(currentQuery)
					);
					return false;
				}
			}
		}
		
		return true;
	},
	
	_getRequestedRecordData : function(grRecord, config) {
		var i, canReadField, fieldName, fieldValue, fieldDisplayValue, getDisplay;
		var recordData = {
			'_config' : config,
			'_table_name' : grRecord.getTableName(),
			'_field_values' : {}
		};
		
		for (i = 0; i < recordData._config.fields_to_get.length; i++) {
			fieldName = recordData._config.fields_to_get[i].name;
			getDisplay = !!recordData._config.fields_to_get[i].get_display_value;
			//Must get canReadField in this way and use it to see if we can see the field values,
			// cause otherwise GlideRecordSecure freaks alll the way out.
			canReadField = (grRecord.isValidField(fieldName) && grRecord[fieldName].canRead());
			fieldValue = canReadField ? (grRecord.getValue(fieldName) || '') : '';
			fieldDisplayValue = (getDisplay && canReadField && fieldValue) ?
				(grRecord[fieldName].getDisplayValue() || '') : ('');
			
			//Retrieve value (and display value if requested)
			recordData._field_values[fieldName] = {
				'name' : fieldName,
				'value' : fieldValue,
				'display_value' : fieldDisplayValue,
				//If false, may be caused by ACL restriction, or by invalid field
				'can_read' : canReadField
			};
		}
		
		return recordData;
	},
	
	type : 'ClientGlideRecordAJAX'
});