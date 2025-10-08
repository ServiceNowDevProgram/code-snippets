(function executeRule(current, gsn, gs) {

    var timer = new GlideRecord('sys_trigger');
    timer.initialize();
    timer.name = "Change Escalation for: " + current.number;
    timer.script = "new global.ChangeEscalationHelper().checkAndEscalate('" + current.sys_id + "');";
    
    var triggerTime = new GlideDateTime();
    triggerTime.addSeconds(60 * 60 * 48); // 48 hours
    timer.next_action = triggerTime;
    timer.insert();

})(current, gsn, gs);
