var CatalogUtils = Class.create();

/**
 * Helper class for dealing with catalogs and catalog items.
 * All methods can be called both server-side and client-side.
 *
 * @class CatalogUtils
 * @author Maik Skoddow
 */
CatalogUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
	/**
	 * Returns all variables of a given RITM as stringified array of JSON objectss.
	 *
	 * @param {Object} objParameter Valid `sc_req_item` record or String-based Sys ID of a RITM.
	 * @return {String} Stringified array of JSON objects with various variable values and information or an empty array if no valid data could be found.
	 */
	getVariables: function(objParameter) {
		var _grRITM = null;

		//server-side call with Sys ID
		if (typeof objParameter == 'string' && objParameter.length == 32) {
			_grRITM = new GlideRecord('sc_req_item');

			if (!_grRITM.get(objParameter)) {
				_grRITM = null;
			} 
		}

		//server-side call with initialized RITM GlideRecord 
		if (typeof objParameter == 'object' && objParameter instanceof GlideRecord) {
			if (objParameter.isValidRecord() && objParameter.getTableName() == 'sc_req_item') {
				_grRITM = objParameter;
			}
		}

		//client-side Ajax call with RITM Sys ID as parameter
		if (this.getParameter('sysparm_ritm_sys_id')) {
			var _strSysID = String(this.getParameter('sysparm_ritm_sys_id')).trim();

			if (_strSysID.length == 32) {
				_grRITM = new GlideRecord('sc_req_item');

				if (!_grRITM.get(_strSysID)) {
					_grRITM = null;
				}
			}
		}

		//no valid RITM could be loaded
		if (_grRITM == null) {
			return '[]';
		}

		var _arrResult                            = [];
		var _strExcludedGlideElementVariableTypes = '|11|12|14|15|17|19|20|24|'; 
		var _grGlideElementVariables              = new GlideRecord('sc_item_option_mtom');
		var _objGlideElementVariables             = {};

		//load all catalog variables for a given RITM
		_grGlideElementVariables.addQuery('request_item', _grRITM.getValue('sys_id'));
		_grGlideElementVariables.query();

		while (_grGlideElementVariables.next()) {
			var _strType         = _grGlideElementVariables.sc_item_option.item_option_new.type.toString();
			var _strName         = _grGlideElementVariables.sc_item_option.item_option_new.name.toString();
			var _strQuestionText = _grGlideElementVariables.sc_item_option.item_option_new.question_text.toString();
			var _strValue        = _grGlideElementVariables.sc_item_option.value.toString();
			var _strDisplayValue = _grRITM.getDisplayValue('variables.' + _strName);

			//if type is not excluded fill result array with variable values
			if (_strExcludedGlideElementVariableTypes.indexOf('|' + _strType + '|') == -1) {
				_objGlideElementVariables[_strName] = {
					strType:         _strType,
					strName:         _strName,
					strQuestionText: _strQuestionText,
					strValue:        _strValue,
					strDisplayValue: _strDisplayValue,
				};
			}  
		}


		for (var _strKey in _grRITM.variables) {
			var _objVariable     = _grRITM.variables[_strKey];
			var _strVariableType = Object.prototype.toString.call(_objVariable).match(/^\[object\s(.*)\]$/)[1];

			//is it a real catalog variable?
			if (_strVariableType == 'GlideElementVariable') {
				//is the catalog variable available?
				if (_objGlideElementVariables[_strKey]) {
					_arrResult.push(_objGlideElementVariables[_strKey]);
				}
			}

			//is it a MVRS?
			if (_strVariableType == 'TableVariableNode') {
				_arrResult.push({
					strType:         'MVRS',
					strName:         _strKey,
					strQuestionText: _grRITM.variables[_strKey].getLabel(),
					strValue:        _grRITM.variables[_strKey].toString(),
					strDisplayValue: null,      
				});
			}  
		}

		return JSON.stringify(_arrResult, '', 4);
	},

	type: 'CatalogUtils',
});
