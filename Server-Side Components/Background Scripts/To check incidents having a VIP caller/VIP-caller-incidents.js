/**
 * Name: VIP Caller Incidents
 * Type: Background Script
 * Purpose: Prints all incidents where the caller is a VIP user
 * Author: Shashank Jain 
 */

var inc = new GlideRecord('incident');
inc.addQuery('caller_id.vip', true); // Only VIP callers
inc.query();
gs.print("Incidents with VIP Callers:");
while (inc.next()) {
    gs.print("Number: " + inc.number + " | Short Description: " + inc.short_description);
}
