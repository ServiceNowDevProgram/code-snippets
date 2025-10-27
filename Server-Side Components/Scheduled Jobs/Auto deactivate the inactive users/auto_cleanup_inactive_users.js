(function executeAutoUserCleanup() {

    /***************************************************************
     * AUTO CLEANUP INACTIVE USERS - MONTHLY JOB
     * ------------------------------------------------------------
     * This script automatically deactivates users who have not
     * logged in for a defined number of months. It can also send
     * notifications to both the user and their manager.
     *
     * SAFETY: Use DRY_RUN = true first to test (no updates).
     ***************************************************************/

    // === CONFIGURATION ===
    var MONTHS_THRESHOLD = 3;    // Inactive period threshold (in months)
    var DRY_RUN = true;          // true = test mode, no database updates
    var BATCH_LIMIT = 1000;      // Max records per execution
    var FROM_EMAIL = 'no-reply@yourcompany.com'; // sender email address

    // === STEP 1: Calculate cutoff date ===
    var cutoffDate = new GlideDateTime();
    cutoffDate.addMonths(-MONTHS_THRESHOLD);

    gs.info('[UserCleanup] Job started. Cutoff date: ' + cutoffDate.getDisplayValue() +
            ' | DRY_RUN: ' + DRY_RUN + ' | Threshold: ' + MONTHS_THRESHOLD + ' months');

    // === STEP 2: Query eligible users ===
    var userGr = new GlideRecord('sys_user');
    userGr.addQuery('active', true);                           // only active users
    userGr.addQuery('sys_created_on', '<=', cutoffDate);       // created before cutoff
    userGr.addQuery('last_login_time', '<=', cutoffDate);      // no recent login
    userGr.setLimit(BATCH_LIMIT);                              // safety limit
    userGr.query();

    var totalFound = 0;
    var totalDeactivated = 0;

    // === STEP 3: Loop through each user ===
    while (userGr.next()) {
        totalFound++;

        var userName = userGr.name.toString();
        var userEmail = userGr.email.toString();
        var lastLogin = userGr.last_login_time ? userGr.last_login_time.getDisplayValue() : 'Never';
        var managerEmail = (userGr.manager && userGr.manager.email) ? userGr.manager.email.toString() : null;

        gs.info('[UserCleanup] Found user: ' + userName + 
                ' | Email: ' + userEmail + 
                ' | Last Login: ' + lastLogin + 
                ' | Manager: ' + (managerEmail || 'None'));

        if (!DRY_RUN) {

            // === STEP 4: Deactivate the user ===
            userGr.active = false;
            userGr.update();
            totalDeactivated++;

            // === STEP 5: Send notification to user ===
            if (userEmail) {
                var subjectUser = 'Your ServiceNow account has been deactivated due to inactivity';
                var bodyUser = 
                    'Hello ' + userName + ',\n\n' +
                    'Your ServiceNow account has been automatically deactivated because there has been no login activity ' +
                    'for over ' + MONTHS_THRESHOLD + ' months.\n\n' +
                    'If you believe this is a mistake or require access, please contact the IT Service Desk.\n\n' +
                    'Regards,\nIT Service Management Team';

                gs.email(FROM_EMAIL, userEmail, subjectUser, bodyUser);
                gs.info('[UserCleanup] Email sent to user: ' + userEmail);
            }

            // === STEP 6: Send notification to manager ===
            if (managerEmail) {
                var subjectMgr = 'User under your management has been deactivated';
                var bodyMgr =
                    'Hello,\n\n' +
                    'The following user under your management has been deactivated due to inactivity:\n\n' +
                    'User: ' + userName + '\n' +
                    'Last Login: ' + lastLogin + '\n\n' +
                    'If this account is still required, please raise a ServiceNow access request.\n\n' +
                    'Regards,\nIT Service Management Team';

                gs.email(FROM_EMAIL, managerEmail, subjectMgr, bodyMgr);
                gs.info('[UserCleanup] Email sent to manager: ' + managerEmail);
            }
        }
    }

    // === STEP 7: Log summary ===
    gs.info('[UserCleanup] Total users found: ' + totalFound);
    gs.info('[UserCleanup] Total users deactivated: ' + totalDeactivated + 
            (DRY_RUN ? ' (Dry Run - no records updated)' : ''));

})();

