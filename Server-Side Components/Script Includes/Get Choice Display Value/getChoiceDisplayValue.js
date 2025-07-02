var GetChoiceDisplayValue = Class.create();
GetChoiceDisplayValue.prototype = {
    initialize: function() {},
	
    getChoiceDisplayValue: function(question, value) {
        try {
            var displayValue = '';
            var grQuestionChoice = new GlideRecord('question_choice');

            grQuestionChoice.addEncodedQuery('question=' + question + '^value=' + value);
            grQuestionChoice.query();

            if (grQuestionChoice.next())
                displayValue = grQuestionChoice.text + '';

            return displayValue;
        } catch (exception) {
            gs.error("getChoiceDisplayValue() - " + exception);
        }
    },

    type: 'GetChoiceDisplayValue'
};