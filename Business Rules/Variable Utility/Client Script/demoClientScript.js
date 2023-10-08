/**
 * This script serves as a proof of concept for the variableUtil capabilities.
 * It aims to validate that g_scratchpad variables are being set correctly by displaying them in an alert box.
 * This is particularly useful for debugging and ensuring that the server-side variables are accessible client-side.
 */
function onLoad() {
    if (typeof g_scratchpad !== 'undefined') {
        var scratchpadInfo = [];
        
        // Collecting g_scratchpad variables to provide a snapshot for debugging or validation purposes
        for (var key in g_scratchpad) {
            scratchpadInfo.push(key + ': ' + g_scratchpad[key]);
        }
        
        alert('g_scratchpad variables:\n' + scratchpadInfo.join('\n'));
    } else {
        // Alerting that g_scratchpad is not defined helps in diagnosing issues with server-client variable transfer
        alert('g_scratchpad is not defined.');
    }
}