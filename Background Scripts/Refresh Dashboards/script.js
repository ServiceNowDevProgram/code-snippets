// Define the sys_id of the dashboard you want to refresh
var dashboardSysId = 'YOUR_DASHBOARD_SYS_ID';

// Function to simulate the dashboard refresh
function refreshDashboard(dashboardSysId) {
    // Use the Service Portal widget for dashboards to refresh them
    var dashboardGR = new GlideRecord('pa_dashboards');
    if (dashboardGR.get(dashboardSysId)) {
        // Trigger dashboard refresh by updating a field or simulating a reload
        dashboardGR.setValue('last_refreshed', gs.nowDateTime());
        dashboardGR.update();
        gs.info('Dashboard with sys_id ' + dashboardSysId + ' refreshed at ' + gs.nowDateTime());
    } else {
        gs.error('Dashboard with sys_id ' + dashboardSysId + ' not found.');
    }
}

// Call the function to refresh the specified dashboard
refreshDashboard(dashboardSysId);
