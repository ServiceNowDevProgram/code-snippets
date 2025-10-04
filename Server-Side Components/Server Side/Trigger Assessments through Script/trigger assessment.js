var metricType = 'sys_id of the metric type'; // enter Sys Id for the Metric type
var GENERAL = 'sys_id of the metric Category'; // enter Sys Id for the Metric Category

// Function to fetch the assessable record for the current record if exists
function getAssessableRecord(current) {
var assessableRecordGR = new GlideRecord('asmt_assessable_record');
    assessableRecordGR.addQuery("source_id", current.sys_id);
    assessableRecordGR.addQuery("source_table", current.getTableName());
    assessableRecordGR.addQuery("metric_type", metricType);
    assessableRecordGR.query();
    if (assessableRecordGR.hasNext()) {
        assessableRecordGR.next();
        return assessableRecordGR;
    }
    return null;
}
try {  
    // Fetch assessable record for current record
    var assessable = getAssessableRecord(current); //call getAssessableRecord function
    if (!assessable) { //if no assessable record found
        // Create assessable record for current record
        new global.AssessmentUtils().checkRecord(current, metricType, true //replace current with glide varibale object if this is called inside script include
        assessable = getAssessableRecord(current);
        // Map all the metric categories to the assessible record (Create records in m2m table)
        for (var i = 0; i < metricCategories.length; i++) { //this handles if more than one metric category assosciated to this.
	   var m2mGR = new GlideRecord("asmt_m2m_category_assessment");
            m2mGR.initialize();
            m2mGR.category = metricCategories[i];
            m2mGR.assessment_record = assessable.sys_id;
            m2mGR.insert();
        }
    }
  
    // Generate an Assessment Instance
    var assessment = new global.AssessmentUtils().createAssessments(String typeID, String sourceRecordID, String userID);
  //String typeID -The sys_id of the metric type
  //String sourceRecordID - Sys_id of the assessment target record
  //String userID -One or more comma-separated sys_ids of users to which to send assessment 
  
  // Extract the Sys Id for the Assessment Instance
    var assessmentID = assessment.split(',')[0];
    var assessmentInstanceGR = new GlideRecord("asmt_assessment_instance");
    assessmentInstanceGR.get(assessmentID);
    // Set Trigger table to current table
    assessmentInstanceGR.trigger_table = current.getTableName(); //replace a variable which holds target assessment record table name if its inside script include logic or any server side script
    // Set Trigger record to current record
    assessmentInstanceGR.trigger_id = current.sys_id; ////replace a variable which holds target assessment recordsys_id  if its inside script include logic or any server side script
    assessmentInstanceGR.task_id = current.sys_id;
    assessmentInstanceGR.update();
    gs.addInfoMessage("Assessment Instance Generated"); //show info messgae that assesement has been created 
} catch (e) {
    gs.addErrorMessage("Error Generating Assessment Instance"); //sheow if any error
}
