//name: timer_kill_dialog

//HTML:
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
	<g:evaluate var="jvar_timers" object="true">
    // executed server side, gets wait jobs for current flow context and returns object with information about timers
		var array = [];
		var waitJob = new GlideRecord("sys_trigger");
		waitJob.addQuery("state", "0")
			.addCondition("name", "flow.fire")
			.addCondition("script", "CONTAINS", RP.getParameterValue("sysparm_id"));
		waitJob.query();
		while (waitJob.next()) {
			var obj = {};
			obj.sys_id = waitJob.getUniqueValue();
			obj.waitUntil = waitJob.getValue("next_action");
			var now = new GlideDateTime()
			obj.timeLeft = GlideDateTime.subtract(now, new GlideDateTime(waitJob.getValue("next_action"))).getDisplayValue()
			array.push(obj)
		}
		array;
	</g:evaluate>

	<style>
		table td {
			padding: 8px;
		}

		table thead td {
			font-weight: bold;
			background-color: #f0f0f0;
		}
	</style>

  <!-- submittable form that shows the wait jobs in [sys_trigger] for context and a checkbox to select timers to kill -->
	<g:ui_form>
		<input type="hidden" id="sysids" name="sysids" value="" />
		<div style="padding: 20px; font-family: sans-serif;">
			<table>
				<tbody>
					<thead>
						<td>timer sys_id</td>
						<td>next action</td>
						<td>time left</td>
						<td>kill?</td>
					</thead>
					<j:forEach var="jvar_timer" items="${jvar_timers}">
						<tr>
							<td>
								${jvar_timer.sys_id}
							</td>
							<td>
								${jvar_timer.waitUntil}
							</td>
							<td>
								${jvar_timer.timeLeft}
							</td>
							<td>
								<g:ui_checkbox name="${jvar_timer.sys_id}">
								</g:ui_checkbox>
							</td>
						</tr>
					</j:forEach>
				</tbody>
			</table>
			<g:dialog_buttons_ok_cancel ok="return okDialog()" />
		</div>
	</g:ui_form>
</j:jelly>

//Client script:
// handler for clicking ok on modal. gathers the sys_ids for the timers that have checked checkbox
function okDialog() {
	var c = gel('sysids');
	var sysids = [];
	$j('input[type="checkbox"]:checked').each(function () {
		var checkboxId = $j(this).attr('id').replace("ni.", "");
		sysids.push(checkboxId);
	});
	c.value = sysids.toString();
	return true;
}

//Processing script:
// queries for timer jobs and sets the job and new flow.fire event to process instantly -> timer on flow completes 
var waitJob = new GlideRecord("sys_trigger");
waitJob.addQuery("sys_id", "IN", sysids);
waitJob.query();
while (waitJob.next()) {
	var currentScript = waitJob.getValue("script");
	var now = new GlideDateTime().getValue();
	var replaceScript = currentScript.replace(/gr\.setValue\('process_on',\s*'[^']*'\)/, "gr.setValue('process_on','" + now + "')");
	waitJob.setValue("script", replaceScript);
	waitJob.setValue("next_action", now);
	waitJob.update();
}
//redirect back to bottom of nav stack
var urlOnStack = GlideSession.get().getStack().bottom();
response.sendRedirect(urlOnStack);
