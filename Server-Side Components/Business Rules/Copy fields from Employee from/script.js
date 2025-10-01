(function executeRule(current, previous /*null when async*/) {
	/**
	 * This script is user to copy employee field value to any record in case
	 * This can be used when Employee form auto mapping feature cant be used
	 * - There are multiple Active employee forms associated with a single user at a time
	 * - Form field to be copied to different cases/tasks/records
	 *
	 */

	var surveyResultTable = "asmt_metric_result";
	// Employee form surveys linked to Tasks using "survey instance" field
	var parentGR = new GlideRecord(current.parent.sys_class_name.toString());
	parentGR.get(current.parent.sys_id.toString());

	var resultGR = new GlideRecord(surveyResultTable);
	resultGR.addQuery("instance", current.survey_instance.sys_id.toString());
	resultGR.query();
	while (resultGR.next()) {
		var dataType = resultGR.metric.datatype.toString();
		var fieldName = resultGR.metric.name.toString();

		var value = "";
		var stringValue = resultGR.string_value.toString();
		var finalValue = "";

		// Survey response value is saved in different field depending on metric datatype
		// This section may need to be updated based on different metric type you add in your survey
		switch (dataType) {
			case "choice":
				var tableName = current.parent.sys_class_name.toString();
				// Get the exact choice "value" to avoid issues with difference in Label and value of field
				value = "";
				if (stringValue /*label*/ && fieldName /*element*/ && tableName /*name*/) {
					var choiceGR = new GlideRecord("sys_choice");
					choiceGR.addQuery("name", tableName);
					choiceGR.addQuery("element", fieldName);
					choiceGR.addQuery("label", stringValue);
					choiceGR.addQuery("inactive", false);
					choiceGR.query();
					if (choiceGR.next()) {
						value = choiceGR.value.toString();
					}
				}

				if (value !== false) {
					finalValue = value;
				} else {
					finalValue = stringValue;
				}
				break;
			case "reference":
				finalValue = resultGR.reference_value.toString();
				break;
			case "date":
				// finalValue = stringValue;
				var gdt = new GlideDateTime(stringValue);
				finalValue = gdt;
				break;
			case "string":
				finalValue = stringValue;
				break;
			default:
				finalValue = stringValue;
				break;
		}

		// Setting defaults values for questions based on Default value scenarios

		/**
		 *
		 * Employee Form: <Employee Form Name>
		 * Question: <Question Label>
		 * Name: <Question name>
		 * Default Values scenario: <Condition when to set this default value>
		 * Default Value: <Default value to set>
		 *
		 * */
		if (fieldName == "u_employee_tile" && finalValue == "") {
			parentGR.setValue("u_employee_name", "Intern");
		}

		parentGR.setValue(fieldName, finalValue);
		// parentGR[fieldName] = finalValue; (this is the same as above)
	}

	parentGR.update();
})(current, previous);
