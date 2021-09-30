var ApplicationCoreBase = Class.create();
ApplicationCoreBase.prototype = {
    initialize: function () { },

    /**
     * Constants for Defaults
     */
    C_DEFAULT_NOUN1: gs.getProperty('', ''), // always use a 2nd parm default on gs.getProperty to avoid null

    /**
     * Constants for Tables
     */
    C_TBL_USER: 'sys_user',
    C_TBL_GROUP: 'sys_user_group',

    /**
     * Constants for Properties
     */
    C_PROP_NOUN1: '',

    /**
     * get a GlideRecord of the Group based on ID
     * @param {string} id sys_id of the record
     * @returns GlideRecord, if it exists
     */
    _getGrGroup: function (id) {
        return this._getGr(this.C_TBL_GROUP, id);
    },

    /**
     * get a GlideRecord of the User based on ID
     * @param {string} id sys_id of the record
     * @returns GlideRecord, if it exists
     */
    _getGrUser: function (id) {
        return this._getGr(this.C_TBL_USER, id);
    },

    /**
     * get a GlideRecord of the specified table
     * @param {string} strTableName name of table
     * @param {string} id sys_id of the record
     * @returns GlideRecord of record, if it exists
     */
    _getGr: function (strTableName, id) {
        if (!strTableName || !id) return;
        var wrGr = new GlideRecord(strTableName);
        if (!wrGr.get(id)) return;
        return wrGr;
    },

    /**
     * 
     * @param {String} strTableName name of table
     * @param {String} id sys_id of the record
     * @param {*} objFieldValues name value pair of fieldname and value e.g {'short_description': 'record title'}
     * @returns string sys_id of the record being updated, if it exists
     */
    _setGr: function (strTableName, id, objFieldValues) {
        var wrGr = this._getGr(strTableName, id);
        if(!wrGr) return;
        objFieldValues = objFieldValues || {};
        if (typeof objFieldValues != 'object') return;
        for (var key in objFieldValues) {
            if (wrGr.getElement(key) != null)
                wrGr.setValue(key, objFieldValues[key]);
        }
        return wrGr.update();
    },

    type: 'ApplicationCoreBase'
};