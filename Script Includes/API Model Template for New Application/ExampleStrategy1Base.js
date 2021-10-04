var ExampleStrategy1Base = Class.create();
ExampleStrategy1Base.prototype = Object.extendsObject(AbstractStrategy, {
    initialize: function (/* expected */) {},
    run: function() {
        /**
         * do something here
         */
    },

    type: 'ExampleStrategy1Base'
});