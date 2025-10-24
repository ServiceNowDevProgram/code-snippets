//Scenario : Automatically detect the root cause category of an Incident based on keywords in the short description or description.

// Script Include
var RootCausePredictor = Class.create();
RootCausePredictor.prototype = {
    predict: function(text) {
        var data = {
            network: ['router', 'switch', 'wifi', 'dns'],
            hardware: ['laptop', 'keyboard', 'printer', 'battery'],
            application: ['login', 'error', 'bug', 'page'],
            security: ['virus', 'attack', 'unauthorized']
        };
        text = text.toLowerCase();
        for (var cat in data) {
            for (var i = 0; i < data[cat].length; i++) {
                if (text.includes(data[cat][i])) return cat;
            }
        }
        return 'general';
    },
    type: 'RootCausePredictor'
};
