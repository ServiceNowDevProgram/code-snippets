var inc = new GlideRecord('incident');
inc.addQuery('caller_id.vip', true); // Only VIP callers
inc.query();

gs.info("Incidents with VIP Callers:");
while (inc.next()) {
    var callerName = inc.caller_id.getDisplayValue(); // Get caller name
    gs.info(
        "Number: " + inc.number +
        " | Caller: " + callerName +
        " | Short Description: " + inc.short_description +
        " | Priority: " + inc.priority +
        " | State: " + inc.state
    );
}
