//Trigger flow from Business rule
//Flow can be triggered in foreground or in background
/*Triggering automated workflows after record creation or update.
Passing dynamic data to flows for processing (e.g., notifications, approvals, integrations).
Improving performance by running flows asynchronously.*/

(function executeRule(current, previous /*null when async*/ ) {
current.state = 1;
    (function() {

        try {
            var inputs = {};
            inputs['current'] = current; // GlideRecord of table:  
            inputs['table_name'] = '<table name>';

            // Start Asynchronously: Uncomment to run in background.
            sn_fd.FlowAPI.getRunner().flow('<flow name>').inBackground().withInputs(inputs).run();

            // Execute Synchronously: Run in foreground.
            // sn_fd.FlowAPI.getRunner().flow('<flow name>').inForeground().withInputs(inputs).run();

        } catch (ex) {
            var message = ex.getMessage();
            gs.error(message);
        }

    })();
	
