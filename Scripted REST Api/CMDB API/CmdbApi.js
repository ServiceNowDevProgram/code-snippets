/**
 * APIs to manage CIs
 * 
 * @class 
 * @author Amit Gujrathi
 */

var CmdbApi = Class.create();
CmdbApi.prototype = {
initialize: function() {
},

/**
	 * Create a CI
	 * Mapped to POST /api/978841/cis/{ci_type}
	 * 
	 * @returns {Object} JSON response of CI created or Error details
 */
createCi: function() {
	var self = this;

	var ciType = self.getPathParam('ci_type', '');

	var payload = self.body;

	if (!self._isValidCiType(ciType)) {
		return sn_ws_err.BadRequestError('Invalid CI Type provided:' + ciType);
	}

	var ciRec = new GlideRecord(ciType);
	ciRec.initialize();

	try {
		for (var key in payload) {
			if (ciRec.isValidField(key) && key.indexOf('sys_') != 0) {
				var value = payload[key];
				var el = ciRec.getElement(key);

				var descriptor = el.getED();
				var choice = descriptor.choice;
				var type = descriptor.getInternalType();

				if (choice != '0') {
					ciRec[key] = self._getChoiceValue(ciType, key, value);
				} else if (type == 'reference') {
					ciRec[key] = self._getReferenceValue(ciType, key, value);
				} else {
					ciRec[key] = payload[key];
				}
			}
			if (key === 'sys_id') {
				ciRec.setNewGuidValue(payload[key]);
			}
		}
		var sysId = ciRec.insert();

		var errMsg = ciRec.getLastErrorMessage();
		if (!gs.nil(errMsg)) {
			return new sn_ws_err.BadRequestError(errMsg);
		}

		return self._getGrResultStream(ciType, sysId, {});

	} catch (e) {
		var serverError = new sn_ws_err.ServiceError();
		serverError.setStatus(500);
		serverError.setMessage('Operation Failed');
		serverError.setDetail(e);
		return serverError;

	}
},


/**
	 * 
	 * Creates a Configuration Item (CI) relationship in ServiceNow.
	 * Mapped to POST /api/relationships
	 * @returns {Object} JSON response of CI Relationship created or Error details
	 * 
 * */
createCiRelationship: function() {
	var self = this;

	var payload = self.body;

	//Check for mandatory keys in Payload
	var missingPayloadAttributes = ['parent', 'type', 'child'].filter(function(key) {
		if (payload.hasOwnProperty(key)) {
			return gs.nil(payload[key]);
		}
		return true;
	});

	if (missingPayloadAttributes.length > 0) {
		return new sn_ws_err.BadRequestError(gs.getMessage('Missing required attributes: {0}', [missingPayloadAttributes.join()]));
	}

	var parentCiSysId = payload.parent || '';
	var relationshipTypeSysId = payload.type || '';
	var childCiSysId = payload.child || '';

	if (!self._isValidRecord('cmdb_ci', parentCiSysId)) {
		return new sn_ws_err.BadRequestError('Parent CI not found with id: ' + parentCiSysId);
	}

	if (!self._isValidRecord('cmdb_ci', childCiSysId)) {
		return new sn_ws_err.BadRequestError('Child CI not found with id: ' + childCiSysId);
	}

	if (!self._isValidRecord('cmdb_rel_type', relationshipTypeSysId)) {
		return new sn_ws_err.BadRequestError('Relationship type not found with id: ' + relationshipTypeSysId);
	}

	if (self._isValidRecord('cmdb_rel_ci', '', gs.getMessage('parent={0}^child={1}^type={2}', [parentCiSysId, childCiSysId, relationshipTypeSysId]))) {
		return new sn_ws_err.BadRequestError('Relationship already exists');
	}

	var ciRelation = new GlideRecord('cmdb_rel_ci');
	ciRelation.initialize();
	ciRelation.parent = parentCiSysId;
	ciRelation.child = childCiSysId;
	ciRelation.type = relationshipTypeSysId;
	ciRelation.insert();

	var insertError = ciRelation.getLastErrorMessage();
	if (!gs.nil(insertError)) {
		return new sn_ws_err.BadRequestError(insertError);
	}

	return self._getGrResultStream('cmdb_rel_ci', ciRelation.getValue('sys_id'));
},


/**
	 * 
	 * Deletes a Configuration Item (CI) based on the provided CI type and sys_id.
	 * Mapped to DELETE /cis/{ci_type}/{sys_id}
	 * @returns 
	 * 
 * */
	deleteCi: function () {
		var self = this;

        var ciType = self.getPathParam('ci_type', '');

        var ciSysId = self.getPathParam('sys_id');

        var payload = self.body;
		
		var isCmdbExtension = (function (tableName) {
			var absoluteBase = new TableUtils(tableName).getAbsoluteBase();
            return (absoluteBase == 'cmdb_ci');
		})(ciType);
		
		var isRootTable = (function(tableName) {
            var rootTables = gs.getProperty('sr-cmdb-api.root-tables.delete', '');
            return (rootTables.indexOf(tableName) > -1);
        })(ciType);
		
		if (!isCmdbExtension && !isRootTable) {
            return sn_ws_err.BadRequestError('Invalid CI Type provided:' + ciType);
		}
		
		var honorAcl = isCmdbExtension;
		// Honor ACL security for tables extending cmdb_ci. For CMDB extended tables, the security can be configured in the metadata record
		// Do not honor ACL security for standalone tables. Delete access for such tables can be controlled by property 'sr-cmdb-api.root-tables.delete'

		var ciRec = honorAcl ? new GlideRecordSecure(ciType) : new GlideRecord(ciType);
        if (ciRec.get(ciSysId)) {
			
			if (honorAcl) {
				if (!ciRec.canDelete()) {
					var unauthorizedError = new sn_ws_err.ServiceError();
					unauthorizedError.setStatus(403);
					unauthorizedError.setMessage('Operation Failed');
					unauthorizedError.setDetail('ACL Exception Delete Failed due to security constraints');
					return unauthorizedError;
				}	
			}
			
			try {
                ciRec.deleteRecord();

                var errMsg = ciRec.getLastErrorMessage();
                if (!gs.nil(errMsg)) {
                    return new sn_ws_err.BadRequestError(errMsg);
                }

                return self.response.setStatus(204);

            } catch (e) {
                var serverError = new sn_ws_err.ServiceError();
                serverError.setStatus(500);
                serverError.setMessage('Operation Failed');
                serverError.setDetail(e);
                return serverError;
            }
        } else {
            return new sn_ws_err.NotFoundError('No record found');
        }
	},	

 /**
     * Deletes a CI (Configuration Item) relationship based on the provided sys_id.
     * Mapped to DELETE /cis/relationships/{sys_id}
     * @throws {sn_ws_err.BadRequestError} Throws an error if the sys_id is null or not provided.
     * @throws {sn_ws_err.NotFoundError} Throws an error if a CI relationship with the given sys_id is not found.
     * @returns {void} Returns nothing if the deletion is successful, otherwise throws an error.
 */	
    deleteCiRelationship: function() {
        var self = this;

        var relSysId = self.getPathParam('sys_id', '');

        if (gs.nil(relSysId)) {
            return new sn_ws_err.BadRequestError('sys_id cannot be null');
        }

        var ciRelation = new GlideRecord('cmdb_rel_ci');
        ciRelation.addQuery('sys_id', relSysId);
        ciRelation.query();
        if (ciRelation.next()) {
            ciRelation.deleteRecord();

            self.response.setStatus(204);
            return;
        } else {
            return new sn_ws_err.NotFoundError('CI Relationship not found with sys_id: ' + relSysId);
        }
    },
/**
	 * Get the details of a Configuration Item (CI) Group in the CMDB.
  	 * Mapped to GET /cis/group/{id}
	 * @function getCiGroup
	 * @returns {Object} - Returns a response object containing the details of the CI and its associated groups.
 **/
 getCiGroup: function() {
        var response = {};
        var self = this;
        var ciId = self.getPathParam('id', '');
        if (gs.nil(ciId)) {
            return new sn_ws_err.BadRequestError('Parameter id cannot be null');
        }
        var CI_details = [];
        var arrGroupList = [];
        var arrStatusDetails = [];
        var ciDetailsObj = {};
        var ci_name = '';
        var ci = new GlideRecord("cmdb_ci");
        switch (this.getSourceIDtype(ciId)) {
            case 'srobjUID':
                ci.addQuery("u_sr_object_uid", ciId);
                break;
            case 'sysID':
                ci.addQuery("sys_id", ciId);
                break;
            case 'configId':
                ci.addQuery("name", ciId);
                break;
        }
        ci.query();
        if (ci.next()) {
            ciDetailsObj['name'] = ci.name.toString();
            ciDetailsObj['sys_class_name'] = ci.sys_class_name.getDisplayValue();
            ciDetailsObj['operational_status'] = ci.operational_status.getDisplayValue();
            ciDetailsObj['short_description'] = ci.short_description.toString();
            arrStatusDetails.push(ciDetailsObj);
            ci_name = ci.sys_id;
            var gr = new GlideRecord("cmdb_rel_group");
            gr.addQuery("ci", ci_name);
            gr.query();
            while (gr.next()) {
                var retObj = {};
                retObj['type'] = gr.type.name.toString();
                retObj['u_default'] = gr.u_default.toString();
                retObj['group'] = gr.group.name.toString();
                arrGroupList.push(retObj);
            }
        } else {
            return new sn_ws_err.NotFoundError('No group found for CI with ID: ' + ciId);
        }
        ciDetailsObj.ciGroups = arrGroupList;
        CI_details.push(ciDetailsObj);
        response['ciDetails'] = CI_details;
        return response;
    },
	
/**
 * Retrieves a list of Configuration Item (CI) Relationship Types from the ServiceNow instance.
 * Mapped to GET /cis/relationshiptypes
 * @function
 * @name getCiRelationshipTypes
 * @returns {GlideRecord} A GlideRecord object representing the list of CI Relationship Types.
 * @throws {Error} If there is an issue with the retrieval process.
 **/
 getCiRelationshipTypes: function() {
        return this._getGrResultStream('cmdb_rel_type', null, {
            sysparm_limit: 100
        });
    },

/**
 * Retrieves Configuration Items (CIs) based on the specified CI type.
 * Mapped to GET /cis/{ci_type}
 * @returns {GlideRecordStream} A stream of GlideRecord objects representing the CIs.
 * @throws {BadRequestError} If an invalid CI type is provided.
 */
 getCis: function() {
        var self = this;

        var ciType = self.getPathParam('ci_type', '');

        if (!self._isValidCiType(ciType)) {
            return sn_ws_err.BadRequestError('Invalid CI Type provided:' + ciType);
        }

        return self._getGrResultStream(ciType, null, {
            sysparm_limit: 100
        });

    },

/**
 * Update a Configuration Item (CI).
 * Mapped to PATCH /cis/{ci_type}/{sys_id}
 *
 * This function updates a CI based on its type and system ID.
 *
 * @returns {Object} JSON response containing the updated CI or error details.
 * @throws {BadRequestError} If an invalid CI type is provided.
 * @throws {ServiceError} If the operation fails for any reason.
 * @throws {NotFoundError} If no record is found for the provided system ID.
 */
    updateCi: function() {
        var self = this;

        var ciType = self.getPathParam('ci_type', '');

        var ciSysId = self.getPathParam('sys_id');

        var payload = self.body;

        if (!self._isValidCiType(ciType)) {
            return sn_ws_err.BadRequestError('Invalid CI Type provided:' + ciType);
        }

        var ciRec = new GlideRecord(ciType);
        if (ciRec.get(ciSysId)) {

            try {
                for (var key in payload) {
                    if (ciRec.isValidField(key) && key.indexOf('sys_') != 0) {
                        var value = payload[key];
                        var el = ciRec.getElement(key);

                        var descriptor = el.getED();
                        var choice = descriptor.choice;
                        var type = descriptor.getInternalType();

                        if (choice != '0') {
                            ciRec[key] = self._getChoiceValue(ciType, key, value);
                        } else if (type == 'reference') {
                            ciRec[key] = self._getReferenceValue(ciType, key, value);
                        } else {
                            ciRec[key] = payload[key];
                        }
                    }
                }
                ciRec.update();

                var errMsg = ciRec.getLastErrorMessage();
                if (!gs.nil(errMsg)) {
                    return new sn_ws_err.BadRequestError(errMsg);
                }

                return self._getGrResultStream(ciType, ciRec.getValue('sys_id'), {});

            } catch (e) {
                var serverError = new sn_ws_err.ServiceError();
                serverError.setStatus(500);
                serverError.setMessage('Operation Failed');
                serverError.setDetail(e);
                return serverError;
            }
        } else {
            return new sn_ws_err.NotFoundError('No record found');
        }
    },
/**
 * Retrieve Configuration Item (CI) Relationships.
 * Mapped to GET /cis/relationships
 *
 * This function retrieves CI relationships
 *
 * @returns {Object} JSON response containing the CI relationships or error details.
 */
 getRelationships: function() {
        var self = this;

        return self._getGrResultStream('cmdb_rel_ci', null, {
            sysparm_limit: 100
        });

    },
	
/**
	 * Determine the type of source ID.
	 * @function getSourceIDtype
	 * @param {string} parm - The parameter that needs to be tested against various ID types.
	 * @returns {string} - Returns a string representing the type of the source ID ('srobjUID', 'sysID', or 'configId').
 */
    getSourceIDtype: function(parm) {
        var UUIDregEx = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i); //regular expression to validate the input string in uuid
        var reguuidPattern = new RegExp(UUIDregEx);
        if (UUIDregEx.test(parm)) {
            return "srobjUID";
        }
        var sysRegex = /[a-z0-9]{32}/;
        var regexsysidPattern = new RegExp(sysRegex);
        if (regexsysidPattern.test(parm)) {
            return "sysID";
        }
        return "configId";
    },
 /**
     * Check if the Table is part of CMDB. The table should be an extension of cmdb_ci or a root table defined in property sr-cmdb-api.root-tables
     * 
     * @param {String} tableName
     * @returns {Boolean}
 */
    _isValidCiType: function(tableName) {
        if (gs.nil(tableName)) {
            return false;
        }

        if (!gs.tableExists(tableName)) {
            return false;
        }

        var isRootTable = (function() {
            var rootTables = gs.getProperty('sr-cmdb-api.root-tables', ''); // Comma seperated root table names
            return (rootTables.indexOf(tableName) > -1);
        })();

        if (isRootTable) {
            return true;
        } else {
            var absoluteBase = new TableUtils(tableName).getAbsoluteBase();

            return (absoluteBase == 'cmdb_ci');
        }
    },

 /**
     * Get the valid Choice value of the field
     * @param {String} tableName
     * @param {String} fieldName
     * @param {String} payloadValue
     * @returns {String} choiceValue
*/
    _getChoiceValue: function(tableName, fieldName, payloadValue) {

        if (gs.nil(tableName) || gs.nil(fieldName) || gs.nil(payloadValue)) {
            return '';
        }

        var choiceValue = null;

        var gr = new GlideRecord(tableName);
        gr.initialize();

        var el = gr.getElement(fieldName);

        var descriptor = el.getED();
        var choice = descriptor.choice;

        if (choice == '0') {
            return '';
        }

        if (el.getChoices().indexOf(payloadValue + '') != -1) {
            return payloadValue;
        } else {
            var tables = new TableUtils(tableName).getHierarchy();

            choiceValue = j2js(tables).reduce(function(out, table) {
                if (out !== null)
                    return out;

                var gcs = new GlideRecord('sys_choice');
                gcs.addQuery('name', table);
                gcs.addQuery('element', fieldName);
                gcs.addQuery('label', payloadValue);
                gcs.addQuery('inactive', false);
                gcs.query();
                if (gcs.next()) {
                    out = gcs.value;
                }
                return out;
            }, null);

            if (choiceValue == null) {
                throw gs.getMessage('Invalid value [{0}] for field [{1}]', [payloadValue, fieldName]);
            }
        }
        return choiceValue;
    },
	
/**
     * Get the sys_id of the Reference field
     * 
     * @param {String} tableName
     * @param {String} fieldName
     * @param {String} payloadValue
     * @returns {String} refValue
*/
    _getReferenceValue: function(tableName, fieldName, payloadValue) {

        if (gs.nil(tableName) || gs.nil(fieldName) || gs.nil(payloadValue)) {
            return '';
        }

        var gr = new GlideRecord(tableName);
        gr.initialize();

        var el = gr.getElement(fieldName);
        var descriptor = el.getED();
        var type = descriptor.getInternalType();

        if (type != 'reference') {
            return '';
        }

        var refTable = el.getReferenceTable();

        if (gs.nil(refTable)) {
            throw gs.getMessage('Invalid reference field [{0}]; Reference table not defined', [fieldName]);
        }

        if (!gs.tableExists(refTable)) {
            throw gs.getMessage('Reference table [{0}] does not exist for field [{1}]', [refTable, fieldName]);
        }

        var refTableDisplayField = (function() {
            var grRef = new GlideRecord(refTable);
            grRef.initialize();
            return grRef.getDisplayName();
        })();

        var refValue = (function() {
            var grRefTable = new GlideRecord(refTable);
            if (grRefTable.get(payloadValue)) {
                return grRefTable.getValue('sys_id');
            }
            return '';
        })();

        return refValue;
    },


/**
	 * Check if the record is a valid record
	 * 
	 * @param {any} tableName
	 * @param {any} sysId
	 * @param {any} query
	 * @returns Boolean
 */
_isValidRecord: function(tableName, sysId, query) {
	if (gs.nil(tableName)) {
		return false;
	}

	if (!gs.tableExists(tableName)) {
		return false;
	}

	if (gs.nil(sysId) && gs.nil(query)) {
		return false;
	}

	gs.getSession().setStrictQuery(true);

	var gr = new GlideRecord(tableName);
	if (!gs.nil(sysId)) {
		gr.addQuery('sys_id', sysId);
	} else {
		gr.addQuery(query);
	}

	gr.query();

	return gr.hasNext();
},

/**
     * Write to response stream
     * 
     * @param {any} tableName
     * @param {any} sysId
     * @param {any} defaultParams
     * @returns {undefined}
 */
    _getGrResultStream: function(tableName, sysId, defaultParams) {

        var self = this;

        defaultParams = defaultParams || {};
        var singleObject = Boolean(sysId);
        if (singleObject) {
            defaultParams.sysparm_suppress_pagination_header = 'true';
        }

        var query = defaultParams.sysparm_query || self.getQueryParam('sysparm_query');
        var fields = defaultParams.sysparm_fields || self.getQueryParam('sysparm_fields');
        fields = (fields) ? fields.split(',') : [];

        var offset = parseInt(self.getQueryParam('sysparm_offset', 0), 10);
        var limit = parseInt(self.getQueryParam('sysparm_limit', defaultParams.sysparm_limit || 10000), 10);

        var displayValue = self.getQueryParam('sysparm_display_value', 'false');
        var category = self.getQueryParam('sysparm_query_category');

        var suppressPaginationLink = defaultParams.sysparm_suppress_pagination_header || self.getQueryParam('sysparm_suppress_pagination_header', 'false');

        var excludeRefLink = self.getQueryParam('sysparm_exclude_reference_link', 'false');
        var view = self.getQueryParam('sysparm_view');


        // query the table
        var gr = new GlideRecord(tableName);

        // init so gr has all fields
        gr.initialize();

        // in case no fields specified, use all (only possible after .next())
        if (fields.length === 0) {
            fields = Object.keys(gr);
        }

        // allow query fields to be in url. e.g. active=true
        Object.keys(self.request.queryParams).forEach(function(key) {
            if (key.indexOf('sysparm_') === 0 || gr[key] === undefined)
                return;
            query = ((query) ? query.concat('^') : '').concat(key, '=', self.getQueryParam(key));
        });

        if (sysId) {
            gr.addQuery('sys_id', sysId);
        } else if (query) {
            gr.addQuery(query);
        }

        if (category)
            gr.setCategory(category);

        var onPage = Math.ceil((offset + 1) / limit),
            thisOffset = offset + limit;

        // set window
        gr.chooseWindow(offset, thisOffset, true);
        //gr.setLimit(nextOffset);
        gr._query();

        var totalRows = gr.getRowCount();

        // send 404 in case no row match
        if (totalRows === 0) {
            return []; //new sn_ws_err.NotFoundError('No Record found. Query: '.concat(query));
        }

        var totalPage = Math.ceil(totalRows / limit),
            prevOffset = offset - limit,
            nextOffset = Math.min(thisOffset, (totalPage - 1) * limit),
            lastOffset = (totalPage - 1) * limit;

        self.response.setContentType('application/json');

        var links = [];
        if ('true' != suppressPaginationLink) {
            links.push(self._createLink(limit, 0, 'first'));
            if (onPage > 1) {
                links.push(self._createLink(limit, prevOffset, 'prev'));
            }
            if (onPage < totalPage) {
                links.push(self._createLink(limit, nextOffset, 'next'));
            }
            links.push(self._createLink(limit, lastOffset, 'last'));
            // append to header
            self.response.setHeader("Link", links.join(','));
        }

        self.response.setStatus(200);

        // get the writer
        var writer = response.getStreamWriter();
        // start the result
        writer.writeString('{"result":');
        if (!singleObject) {
            writer.writeString('[');
        }
        //writer.writeString(JSON.stringify(self.request.queryParams));

        var append = false;
        // stream row by row
        while (gr._next()) {

            if (append) {
                writer.writeString(',');
            } else {
                append = true;
            }

            var out = {};
            fields.forEach(function(fieldName) {
                fieldName = fieldName.trim();

                if (!gr.isValidField(fieldName.split('.')[0]))
                    return;

                var element = gr.getElement(fieldName);
                var ed = element.getED(),
                    value = null;
                /*
                .nil() is also true if a filed has length 0 !!
                if (element.nil()) {
                    value = null;
                } else
                */

                if (ed.isBoolean()) {
                    value = JSUtil.toBoolean(element.toString());
                } else if (ed.isTrulyNumber()) {
                    value = parseInt(element.toString(), 10);
                } else {
                    value = element.toString();
                }

                if ('all' == displayValue.toLowerCase()) {
                    out[fieldName] = {
                        display_value: element.getDisplayValue(),
                        value: value
                    };
                } else if ('true' == displayValue.toLowerCase()) {
                    out[fieldName] = element.getDisplayValue();
                } else {
                    out[fieldName] = value;
                }
            });

            writer.writeString(JSON.stringify(out));

        }
        if (!singleObject) {
            writer.writeString(']');
        }

        if (self.getQueryParam('sysparm_meta', 'false') == 'true') {
            // append meta information
            var meta = {
                query: query,
                queryParams: self.request.queryParams,
                sysId: sysId,
                fields: fields,
                offsetWindowStart: offset,
                offsetWindowEnd: thisOffset,
                limit: limit,
                totalRows: totalRows,
                totalPage: totalPage,
                prevOffset: prevOffset,
                nextOffset: nextOffset,
                lastOffset: lastOffset,
                displayValue: displayValue,
                category: category,
                links: links
            };
            writer.writeString(',"__meta":');
            writer.writeString(JSON.stringify(meta));
        }

        // close the result
        writer.writeString('}');

    },

type: 'CmdbApi'
};
