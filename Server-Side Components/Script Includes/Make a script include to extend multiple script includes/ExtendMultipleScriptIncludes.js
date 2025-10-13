var ExtendMultipleScriptIncludes = Class.create();
ExtendMultipleScriptIncludes.prototype = Object.assign({}, global.ArrayUtil.prototype, global.GlideRecordUtil.prototype, { //extend with as many script includes as one wants
    initialize: function() {},

    sayHello: function() {
        return 'Hello ' + gs.getUserDisplayName();
    },

    type: 'ExtendMultipleScriptIncludes'
});
