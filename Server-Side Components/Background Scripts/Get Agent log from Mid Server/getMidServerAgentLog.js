/**
 * Script to retrieve a specific log file (e.g., agent0.log.0)
 * from a given ServiceNow MID Server.
 *
 * It creates an ECC Queue output record with the 'grabLog' source
 * and 'SystemCommand' topic, which instructs the MID Server to
 * return the content of the specified file.
 *
 * @param {string} midServerName - The name of the target MID Server (e.g., 'My_MID_Server_A').
 * @param {string} logFileName - The name of the log file to retrieve (e.g., 'agent0.log.0').
 * @returns {GlideRecord | null} The ECC Queue record inserted, or null if insertion failed.
 */
function getMidServerAgentLog(midServerName, logFileName) {
    if (!midServerName || !logFileName) {
        gs.error("MID Server name and log file name are required.");
        return null;
    }

    var gr = new GlideRecord("ecc_queue");
    gr.initialize();
    gr.source = "grabLog";              // Specific source for file retrieval
    gr.topic = "SystemCommand";         // Required topic for this type of command
    gr.name = logFileName;              // The name of the file to grab (this becomes the command's parameter)
    gr.queue = "output";                // Send from ServiceNow to the MID Server
    gr.state = "ready";                 // Set to ready to be processed by the MID Server
    gr.agent = "mid.server." + midServerName; // Full agent string
    // Set a high priority to ensure it's processed quickly (optional, but good practice)
    gr.priority = 100;

    var sysId = gr.insert();

    if (sysId) {
        gs.info("Request to retrieve log '" + logFileName + "' on MID Server '" + midServerName + "' successfully placed.");
        gs.info("ECC Queue Record: https://" + gs.getProperty("instance_name") + ".service-now.com/ecc_queue.do?sys_id=" + sysId);
        return gr; // Returns the initialized GlideRecord object
    } else {
        gs.error("Failed to insert ECC Queue record.");
        return null;
    }
}

// --- EXAMPLE USAGE ---

// 1. Define your target MID Server name (the name *only*, not the 'mid.server.' prefix)
var targetMidServer = "MyMidServerName"; // <== **UPDATE THIS** to your actual MID Server name

// 2. Define the log file you want to retrieve
var targetLogFile = "agent0.log.0";

// 3. Call the function
var eccRecord = getMidServerAgentLog(targetMidServer, targetLogFile);

if (eccRecord) {
    gs.print("Check the ECC Queue Input for a response with the log content.");
}
