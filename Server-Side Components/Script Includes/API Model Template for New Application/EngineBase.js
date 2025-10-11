var EngineBase = Class.create();
EngineBase.prototype = Object.extendsObject(ApplicationCore, {
    initialize: function (/* expected */) {},

    process: function() {
        return this._process();
    },

    _process: function() {
        try {
            var strategy = this._getStrategy(/* expected */);
            if (!strategy) return;
            strategy.run();
        } catch (ex) {
            gs.error(ex.getMessage());
        }
    },

    _getStrategy: function(grRecord) {
        grRecord = grRecord || this.grRecord || null;
        if(!grRecord) return;
        var strType = this._getType(grRecord) || ''; // method needs to be defined
        switch (strType) {
            case '1':
                return new ExampleStrategy1(/* expected */);
            case '2':
                return new ExampleStrategy2(/* expected */);
        }
    },

    type: 'EngineBase'
});