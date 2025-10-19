#Contribution

The Business Rule is triggered after an update on the (HR case)"sn_hr_core_case" table, specifically when the case state is set to "Work in Progress". This rule generates a PDF letter based on the trigerred conditions.

Document Template created seperately. Document Template Name - PDF Letter Employee.The Document Template Sys ID is passed within the script, and the corresponding document template has been created separately (refer to the attached screenshot for reference).
Document Template -> All Document Templates - > New
As per the script, the PDF letter is generated and named using the HR case subject's name — for example:
"Letter: " + empName + ".pdf".

Functionality -
When a fulfiller changes the case state to "Work in Progress", the PDF letter is automatically generated and attached to the HR case record.

Business Rule Description -

Name - pdf Letter generation
Table - sn_hr_core_case
Condition - state is "work in Progress"
Update - Check the box
When -select after

This BR will prevent the duplicate letter generation for multiple updates in work in Progress state.
