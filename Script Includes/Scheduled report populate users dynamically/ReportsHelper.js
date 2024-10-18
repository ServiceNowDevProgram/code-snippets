var ReportsHelper = Class.create();
ReportsHelper.prototype = {
    initialize: function() {},

    
    /**
     * This function will read the schedule report and execute a GlideRecord query based on the report details. It will store all the users from the report into an array, 
     * remove duplicates, and then update the schedule report user list dynamically so that only users who have an action on that week should receive the report.
     * @param {String} scheduleReportSysId - The sys_id of the schedule report
     * @returns {undefined}
     */
    updateScheduleReportUserList: function(scheduleReportSysId) {
        try {

            // Read the schedule report and grab the report details
            var scheduleReport = new GlideRecord('sysauto_report');
            scheduleReport.get(scheduleReportSysId); //Sys ID of your schedule Report
            var tableName = scheduleReport.report.table;
            var query = scheduleReport.report.filter;

            var recipients = [];

            // Execute a GlideRecord based on report details identified above and get all the records
            var report = new GlideRecord(tableName);
            report.addEncodedQuery(query);
            report.query();

            // Find all the action_by users and store them into array
            while (report.next()) {
                recipients.push(report.action_by.email);
            }

            // Remove the duplicate users
            var arrayUtil = new global.ArrayUtil();
            var finalRecipient = arrayUtil.unique(recipients); // unique assigned to
            scheduleReport.user_list = finalRecipient.join(',');

            // Update the schedule report user list dynamically
            scheduleReport.setWorkflow(false);
            scheduleReport.update();
            scheduleReport.setWorkflow(true);
            scheduleReport.update();


        } catch (e) {
            gs.info("There was error while updating the schedule report users list. The error was: " + e);
        }
    },

    type: 'ReportsHelper'
};