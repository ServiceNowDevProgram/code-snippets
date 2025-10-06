**Maps Incident Fields to Child Problem**

**Description:**
This client script automatically maps key field values from a parent Incident record to a Problem record when the user creates a new Problem and selects an Incident record in the Parent reference field.

**Client Script:**
Name: IncidentToProblemMapping
Table: Problem [problem]
Type: onChange
Field name: Parent

**Script Include:**
Name: IncidentDetails
Glide AJAX enabled: checked

**Implementation:**
Place this script on the Problem table with the condition that it triggers on change of the Parent field. When the selected parent record is from the Incident table, it fetches field values from the Incident using GlideAjax and sets them on the Problem form.

Fields Mapped:
•	Configuration Item
•	Priority
•	Assignment Group
•	Short Description
•	Description
