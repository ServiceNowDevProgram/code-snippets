/**
 * Retrieves the name of an active MID Server that is both up and validated.
 * @returns {string|null} The name of the active MID Server, or null if none is found.
 */
function getActiveMidServer() {
    // Create a GlideRecord object for the 'ecc_agent' table
    var grServer = new GlideRecord('ecc_agent');

    // Add an encoded query to filter for MID Servers that are up and validated
    grServer.addEncodedQuery('status=Up^validated=true');

    // Execute the query
    grServer.query();

    // Check if a record matching the query criteria was found
    if (grServer.next()) {
        // Return the name of the active MID Server
        return grServer.name;
    } else {
        // No active MID Server found, return null
        return null;
    }
}

getActiveMidServer();
