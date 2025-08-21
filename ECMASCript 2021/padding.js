// What's the use of `padStart()` and `padEnd()` in JavaScript?
//
// String padding is often needed to ensure consistent formatting.
// Common examples in ServiceNow:
//  - Padding numeric IDs with leading zeros (e.g., "INC000045")
//  - Making export data columns align neatly
//  - Adding placeholders to strings for integration formatting
//
// padStart(targetLength, padString)
//    → Pads a string from the start until it reaches the target length
//
// padEnd(targetLength, padString)
//    → Pads a string from the end until it reaches the target length
//
// Example:
// "1234".padStart(10, "x"); // → "xxxxxx1234"
// "1234".padEnd(10, "y");   // → "1234yyyyyy"

(function executeRule(current, previous /* null when async */) {
    
    let num = "1234";

    // Pad the start with "x"
    let padStartExample = num.padStart(10, "x");
    gs.info("padStart result: " + padStartExample); // "xxxxxx1234"

    // Pad the end with "y"
    let padEndExample = num.padEnd(10, "y");
    gs.info("padEnd result: " + padEndExample); // "1234yyyyyy"

    // ServiceNow use case: format Incident number
    let incidentId = "45"; // Example numeric part
    let formattedIncident = "INC" + incidentId.padStart(6, "0");
    gs.info("Formatted Incident Number: " + formattedIncident); // "INC000045"

})(current, previous);
