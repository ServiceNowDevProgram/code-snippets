******HTML*****
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

	<input type="text" hidden="true" id="initialFetch" name="initialFetch" value="true" />
	<input type="text" hidden="true" id="startTime" name="startTime" />

	<div style="padding: 2rem 20rem;">
		<div class="input-group mb-3">
			<input type="text" style="padding:2rem;" class="form-control" id="filterText" placeholder="Enter your filter" aria-label="Recipient's username" aria-describedby="basic-addon2" />
			<div class="input-group-append">
				<button style="padding:2rem;" class="btn btn-primary" type="button" onClick="startLogs()">Start Logs</button>
			</div>
		</div>
	</div>

	<div id="log_container" style="padding: 5rem;"></div>

</j:jelly>
****************

**Client Script**
function startLogs() {
    setInterval(function() {
		var queryText = $j("#filterText").val();
        var query = "messageSTARTSWITH" + queryText;
        getLogs(query);
    }, 1000);
}

function getLogs(query) {
    var initialFetch = $j("#initialFetch").val();
    var startTime = $j("#startTime").val();
	
    var ga = new GlideAjax("TestScriptInclude");
    ga.addParam("sysparm_name", "getLogs");
    ga.addParam("sysparm_initialFetch", initialFetch);
    ga.addParam("sysparm_startTime", startTime);
    ga.addParam("sysparm_query", query);
    ga.getXMLAnswer(function(response) {
        var answer = JSON.parse(response);

        gel('initialFetch').value = "false";
        gel('startTime').value = answer.startTime;

        var data = answer.response;
		$j("#log_container").empty();
        data.forEach(function(item) {
            var elm = "<div><b>" + item.sys_created_on + "</b>: " + item.message + "</div>";
			$j("#log_container").append(elm);
        });

    });
}