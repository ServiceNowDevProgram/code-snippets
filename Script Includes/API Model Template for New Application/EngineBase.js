var EngineBase = Class.create();
EngineBase.prototype = Object.extendsObject(ApplicationCore, {
    initialize: function (/* expected */) {},

    process: function() {
        return this._process();
    },

    _process: function() {
        try {
            var strategy = this._getStrategy();
            if (!strategy) return;
            return strategy.run();
        } catch (ex) {
            gs.error(ex.getMessage());
        }
    },

    _getStrategy: function(strType) {
        strType = strType || '';
        switch (strType) {
            default:
                return new ExampleStrategy();
        }
    },

    type: 'EngineBase'
});