var NumberOfDependentChoices = Class.create();
NumberOfDependentChoices.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getCountOfDependentChoices: function() {
		var dependentChoiceCount = 0;
		var choiceName = this.getParameter('sysparm_choiceName');
		var tableName = this.getParameter('sysparm_tableName');
		var element = this.getParameter('sysparm_element');
		var choiceCountGa = new GlideAggregate('sys_choice');
		choiceCountGa.addAggregate('COUNT');
		choiceCountGa.addQuery('dependent_value',choiceName);
		choiceCountGa.addQuery('inactive','false');
		choiceCountGa.addQuery('name',tableName);
		choiceCountGa.addQuery('element',element);
		choiceCountGa.query();
		while(choiceCountGa.next()){
			dependentChoiceCount = choiceCountGa.getAggregate('COUNT');
		}
		return dependentChoiceCount;
	},
    type: 'NumberOfDependentChoices'
});
