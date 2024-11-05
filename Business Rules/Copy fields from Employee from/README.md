## Copy response from Employee form to Specific cases/tasks/records

> This BR script can be used when auto field mapping feature on Employee forms is not fitting your requirements

### Usage scenarios

-   There are multiple Active employee forms associated with a single user at a time
-   Form field to be copied to different cases/tasks/records

### Implementation Guideline

-   Field name on employee form should be same as the field name on the record you want to copy. This is to avoid hard coding of field names/mappings in code and would help to scale the script for any employee form.

ex:

-   Case field name: u_employee_name, Employee form field name: u_employee_name

### Important Note

When a same survey (Employee form) is to be generated for a user who is already assigned to same employee form, then instead of creating new survey instance, OOB, system attaches/associates the existing active survey to the HR tasks. Update the below mentioned business rule to fix this issue.

**BR Name**: Create survey instance

**TODO**: Replace OOB code on line 9 with below code.

```JS

(function executeRule(current, previous /*null when async*/) {

	if(!current.survey || current.survey != previous.survey)
		if(current.survey_instance) {
			current.survey_instance.state = 'canceled';
		}

	if (current.survey)
		current.survey_instance = (new sn_assessment_core.AssessmentCreation()).createOrGetAssessment(current.survey, "", current.assigned_to);
})(current, previous);

```
