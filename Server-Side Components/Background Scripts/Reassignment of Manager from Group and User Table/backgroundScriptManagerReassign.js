var oldManagerSysId = '506c0f9cd7011200f2d224837e61030f'; // <Include sys id of old Manager >
var newManagerSysId = '46c6f9efa9fe198101ddf5eed9adf6e7'; // <Include sys id of New Manager >

gs.print('========== MANAGER REASSIGNMENT FROM GROUP, USERS AND DEACTIVATE RETIRING MANAGER USER ID ==========');

// --- STEP 1: Update Groups managed by old manager ---
var grpCount = 0;
var grpGR = new GlideRecord('sys_user_group');
grpGR.addQuery('manager', oldManagerSysId);
grpGR.query();

gs.print('Checking groups managed by retiring manager...');
while (grpGR.next()) {
    gs.print('➡️ Group: ' + grpGR.name + ' | Old Manager: ' + grpGR.manager.getDisplayValue());

    grpGR.manager = newManagerSysId;
    grpGR.update();
    gs.print('✅ Group manager updated ');
	
	grpCount++;
}
gs.print('Total groups updated: ' + grpCount);

// --- STEP 2: Update Users reporting to old manager ---
var userCount = 0;
var userGR = new GlideRecord('sys_user');
userGR.addQuery('manager', oldManagerSysId);
userGR.query();

gs.print('\ Checking users reporting to retiring manager...');
while (userGR.next()) {
    gs.print('👤 User: ' + userGR.getDisplayValue('name') + ' | Current Manager: ' + userGR.manager.getDisplayValue());
    userGR.manager = newManagerSysId;
    userGR.update();
    gs.print('✅ User manager updated ');
    userCount++;
}
gs.print('Total users updated: ' + userCount);

// --- STEP 3: Deactivate old manager ---
var mgrGR = new GlideRecord('sys_user');
if (mgrGR.get(oldManagerSysId)) {
    gs.print('\n Retiring Manager: ' + mgrGR.getDisplayValue('name'));
    mgrGR.active = false;
    mgrGR.locked_out = true; // optional – prevents login
    mgrGR.update();
    gs.print('✅ Old manager deactivated and locked out.');
} else {
    gs.print(' Could not find old manager record.');
}

gs.print('\n========== PROCESS COMPLETE ==========');
