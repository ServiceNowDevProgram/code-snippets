# Automatic Dashboard Refresh Script for ServiceNow

This script, designed for ServiceNow, automatically refreshes a specified dashboard daily at 12:00 AM. By creating a Scheduled Job with this script, users can ensure their dashboard data is updated without manual intervention.

## Overview

ServiceNow’s Scheduled Jobs feature allows you to run server-side scripts at specified intervals. This script uses the `pa_dashboards` table to update the `last_refreshed` field on a given dashboard record, simulating a refresh.

## Prerequisites

- Access to ServiceNow with permissions to create and run Scheduled Jobs.
- The `sys_id` of the dashboard you want to refresh.

## Setup Instructions

1. **Navigate to Scheduled Jobs**:
   - Go to **System Definition > Scheduled Jobs** in ServiceNow.
   
2. **Create a New Scheduled Job**:
   - Set the job to run at **12:00 AM** daily.

3. **Add the Script**:
   - Copy and paste the script below into the Scheduled Job’s script field.
   - Replace `YOUR_DASHBOARD_SYS_ID` with the `sys_id` of the dashboard you want to refresh.

4. **Save and Activate the Job**:
   - Ensure the job is active and will repeat daily.
