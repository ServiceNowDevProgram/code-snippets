Flow action(add in your main flow):

Inputs:Metric Type, Metric Category,Target Table,Assessment Assignment user and Target record sys_id

Output:Assessment record gets created and attached to the target record

Script login inside the action. : 
(function execute(inputs, outputs) {
// ... code ...
//get current record object 
var record = new GlideRecord(inputs.TargetTable);
record.get(inputs.CurrentRecord)

//sys_id of the metric type
var metricType = inputs.MetricType;

// Sys Ids for the Metric Categories
var general = inputs.MetricCategory;

var metricCategories = [];
metricCategories.push(general);

// Function to fetch the assessable record for the current record if exists
function getAssessableRecord(record) {
    assessableRecordGR.addQuery("source_id", inputs.CurrentRecord);
    assessableRecordGR.addQuery("source_table", inputs.TargetTable);
    assessableRecordGR.addQuery("metric_type", metricType);
    assessableRecordGR.query();
    if (assessableRecordGR.hasNext()) {
        assessableRecordGR.next();
        return assessableRecordGR;
    }
    return null;
}

try {

    var assessableRecordGR = new GlideRecord('asmt_assessable_record');

    var m2mGR = new GlideRecord("asmt_m2m_category_assessment");
    // Fetch assessable record for current record
    var assessable = getAssessableRecord(record);
    if (!assessable) {
        // Create assessable record for current record
        new global.AssessmentUtils().checkRecord(record, metricType, true);
        assessable = getAssessableRecord(record);
        // Map all the metric categories to the assessible record (Create records in m2m table)
        for (var i = 0; i < metricCategories.length; i++) {
            m2mGR.initialize();
            m2mGR.category = metricCategories[i];
            m2mGR.assessment_record = assessable.sys_id;
            m2mGR.insert();
        }
    }

    // Generate an Assessment Instance
    var assessment = new global.AssessmentUtils().createAssessments(metricType, record.sys_id, inputs.AssessmentAssignto);
    // Extract the Sys Id for the Assessment Instance
    var assessmentID = assessment.split(',')[0];

    var assessmentInstanceGR = new GlideRecord("asmt_assessment_instance");
    assessmentInstanceGR.get(assessmentID);
    // Set Trigger table to current table
    assessmentInstanceGR.trigger_table = inputs.TargetTable;
    // Set Trigger record to current record
    assessmentInstanceGR.trigger_id = record.sys_id;
    // Set Task record to current record (For Related List)
    assessmentInstanceGR.task_id = record.sys_id
    assessmentInstanceGR.update();

    gs.addInfoMessage("Assessment Instance Generated");
} catch (e) {
    gs.addErrorMessage("Error Generating Assessment Instance");
}
outputs.out=assessment;
outputs.type=metricType;
outputs.category=general;
outputs.id=record.sys_id

})(inputs, outputs);
