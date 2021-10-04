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

        //could be improved by offering a configuration method for excluded variable types
        var _strExcludedTypes = '|11|12|14|15|17|19|20|24|'; 
        var _arrResult        = [];
        var _grVariables      = new GlideRecord('sc_item_option_mtom');

        //load all catalog variables for given RITM
        _grVariables.addQuery('request_item', _grRITM.sys_id);
        _grVariables.orderBy('sc_item_option.order');
        _grVariables.query();

        while (_grVariables.next()) {
            var _strType         = _grVariables.sc_item_option.item_option_new.type.toString();
            var _strName         = _grVariables.sc_item_option.item_option_new.name.toString();
            var _strQuestionText = _grVariables.sc_item_option.item_option_new.question_text.toString();
            var _strValue        = _grVariables.sc_item_option.value.toString();
            var _strDisplayValue = _grRITM.getDisplayValue('variables.' + _strName);

            //if type is not excluded fill result array with variable values
            if (_strExcludedTypes.indexOf('|' + _strType + '|') == -1) {
                _arrResult.push({
                    strType:         _strType,
                    strName:         _strName,
                    strQuestionText: _strQuestionText,
                    strValue:        _strValue,
                    strDisplayValue: _strDisplayValue,
                });
            }
        }

        return JSON.stringify(_arrResult);
    },

    type: 'CatalogUtils',
});
