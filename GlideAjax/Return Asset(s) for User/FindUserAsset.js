var getUserAsset = Class.create();
getUserAsset.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////Return 1 Asset Any Model//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////	

    getOneAsset: function() {

        var userSys = this.getParameter('sysparm_user');

        var mAsset = new GlideRecord('alm_hardware');
        mAsset.addQuery("assigned_to", userSys);
        mAsset.setLimit(1);
        mAsset.query();
        while (mAsset.next()) {
            var astID = mAsset.sys_id;
        }
        return astID;

    },

    /////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////Return 1 with specific Model Category////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////

    getAssetCustom: function() {

        var userSys = this.getParameter('sysparm_user');
        var astCat = this.getParameter('sysparm_category');

        var mAsset = new GlideRecord('alm_hardware');
        mAsset.addEncodedQuery('model_category=' + astCat + '^assigned_to=' + userSys);
        mAsset.setLimit(1);
        mAsset.query();
        while (mAsset.next()) {
            var astID = mAsset.sys_id;
        }
        return astID;

    },

    /////////////////////////////////////////////////////////////////////////////////////////
 ///////// Reutns All Assets for User////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////

    getAllAssets: function() {

        var userSys = this.getParameter('sysparm_user');
        var aList = [];

        var mAsset = new GlideRecord('alm_hardware');
        mAsset.addQuery("assigned_to", userSys);
        mAsset.setLimit(20); //Set Limi to 20 to prevent too many returns in case of a generic account/blank account is passed.
        mAsset.query();
        while (mAsset.next()) {
            alist.push(mAsset.sys_id);
        }
        return aList;

    },


    type: 'getUserAsset'
});
