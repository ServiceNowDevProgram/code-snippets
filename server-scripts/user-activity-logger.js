/**
 * @name User Activity Logger
 * @description Logs user activity with timestamp and session details
 * @author Ashvin (@ashvin2005)
 * @category Server Scripts
 */

(function userActivityLogger() {
    'use strict';
    
    // Get current user information
    var currentUser = gs.getUser();
    var userName = currentUser.getName();
    var userID = currentUser.getID();
    var sessionID = gs.getSessionID();
    
    // Create activity log record
    var activityLog = new GlideRecord('sys_audit');
    activityLog.initialize();
    activityLog.setValue('user', userID);
    activityLog.setValue('reason', 'User Activity - Session: ' + sessionID);
    activityLog.setValue('description', 'User ' + userName + ' activity logged at ' + new GlideDateTime());
    
    // Insert the record
    var sysID = activityLog.insert();
    
    if (sysID) {
        gs.info('Activity logged successfully for user: ' + userName);
        return sysID;
    } else {
        gs.error('Failed to log activity for user: ' + userName);
        return null;
    }
})();

/**
 * Usage:
 * This script can be used in Business Rules, Scheduled Jobs, or Script Includes
 * to track user activities within ServiceNow.
 * 
 * Example in Business Rule:
 * - When: before insert
 * - Table: incident
 * - Script: Call this function to log when users create incidents
 */