    /**SNDOC
        @name choiceValidador

        @param {string} [table] - table that the choice was created
        @param {string} [fieldValue] - field name value
        @param {string} [inputValue] - choice display value (source.field)
        @param {boolean} [isDependent] - if true, add one more parameter to find the depedent
        @param {string} [dependentValue] - value of the parent choice
        
        @return {string} - null || the value of the choice
    */

    choiceValidador: function(table, fieldValue, inputValue, isDependent, dependentValue) {
        var answer = null;

        var grChoice = new GlideRecord('sys_choice');
        grChoice.addQuery('name', table);
        grChoice.addQuery('element', fieldValue);
        grChoice.addQuery('label', inputValue);
        
        if (isDependent)
            grChoice.addQuery('dependent_value', dependentValue);

        grChoice.query();

        if (grChoice.next()) {
            answer = grChoice.getValue('value');
        }

        return answer;
    }
