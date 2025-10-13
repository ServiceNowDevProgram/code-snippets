# CreateProblemFromIncident Script Include

This ServiceNow Script Include automates the creation of a Problem record from an existing Incident record.

## 🔧 Functionality

- Fetches the Incident using its `sys_id`.
- Creates a new Problem record with relevant fields copied from the Incident.
- Links the Incident to the newly created Problem via the `problem_id` field.

## 📥 Input

- `incidentSysId`: The `sys_id` of the Incident record.

## 📤 Output

- Returns the `sys_id` of the newly created Problem record.

## 🧪 Example Usage (via Script or Flow)


var creator = new CreateProblemFromIncident();
var newProblemSysId = creator.createProblem('INCIDENT_SYS_ID_HERE');
