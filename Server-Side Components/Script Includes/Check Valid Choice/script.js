var GenericUtils = Class.create();
GenericUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
   /**
     * Checks if the value of a choice field is valid, optionally given a dependent value
     * @param {object} current - GlideRecord object containing the current record
     * @param {string} The name of the choice field
     * @returns {bool}         - Boolean indicating whether the value of a choice field is valid
     */
    isChoiceValid: function(current, choiceField) {
        // Checking if we get valid params
        if (JSUtil.nil(current) || JSUtil.nil(choiceField)) {
            return false;
        }

        var arrUtil = new ArrayUtil();
        var choiceValue = current.getValue(choiceField);
        var field = current.getElement(choiceField);
        var dependentField = field.getDependent();
        var dependentValue = "";
        if (dependentField != null) {
            dependentValue = current.getValue(dependentField);
        }

        var validValues = field.getChoices(dependentValue);

        // Return a boolean indicating whether of not the specific field has a value or not.
        return (arrUtil.indexOf(validValues, choiceValue) >= 0) ? true : false;
    },
  type: "GenericUtils"
});
