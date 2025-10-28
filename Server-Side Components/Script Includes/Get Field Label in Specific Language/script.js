var LanguageUtils = Class.create();
LanguageUtils.prototype = {
    getLabel: function(table, variable, language) {

        var grLabel = new GlideRecord("sys_documentation");
        grLabel.addQuery("name", table);
        grLabel.addQuery("element", variable);
        grLabel.addQuery("language", language);
        grLabel.query();

        if (grLabel.next()) {
            return grLabel.getValue("label");
        } else { //if no label in the given language can be found return the default English label instead
            var grEnLabel = new GlideRecord("sys_documentation");
            grEnLabel.addQuery("name", table);
            grEnLabel.addQuery("element", variable);
            grEnLabel.addQuery("language", "en");
            grEnLabel.query();

            if (grEnLabel.next()) {
                gs.log("The variable " + variable + " does not have a label in " + language + " associated to it, in the following table: +" + table);
                return grEnLabel.getValue("label");
            } else {
                gs.log("The variable " + variable + " can not be found in the following table: +" + table);
                return;
            }

        }
    },

    type: 'LanguageUtils'
};
