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

    type: 'ApplicationCoreBase'
};