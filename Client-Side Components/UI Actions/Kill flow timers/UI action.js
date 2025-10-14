//Onlick: openTimerDialog()

//open dialog using glidemodal and timer_kill_dialog ui page, pass in current sys_flow_context sysid
function openTimerDialog() {
	var dialog = new GlideModal("timer_kill_dialog");
	dialog.setTitle("Kill timers");
	dialog.setPreference('sysparm_id', g_form.getUniqueValue());
	dialog.render();
}
