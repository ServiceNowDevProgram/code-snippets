Parse JSON with GlideJsonPath
This script demonstrates how to use the GlideJsonPath API in ServiceNow to parse a complex JSON string and extract specific data. In this example, it efficiently retrieves an array of player names from a nested JSON structure representing cricket team information.
Overview
The script performs the following actions:
Initializes GlideJsonPath: A new instance of GlideJsonPath is created, passing the target JSON string as a parameter.
Reads data with JSONPath: The read() method is called with a JSONPath expression to extract the desired data. The expression "$['lib']['jsonpath']['cricket']['players'][*]" navigates to the array of players:
$ represents the root of the JSON object.
['lib'], ['jsonpath'], and ['cricket'] use bracket notation to traverse the nested object structure.
['players'] accesses the array of player names.
[*] is a wildcard that returns all elements in the players array.
Stores the result: The extracted array of player names is stored in the l variable.
Use case
This script is useful in scenarios where you need to parse JSON data returned from a REST API call or an integration. By using GlideJsonPath, you can quickly and efficiently extract specific pieces of information without writing complex code to traverse the entire JSON object manually.
How to use
This script is intended for use in a server-side context within ServiceNow, such as a Script Include or Business Rule.
Example: Script Include
javascript
var CricketJsonParser = Class.create();
CricketJsonParser.prototype = {
    initialize: function() {
    },

    getPlayers: function() {
        var jsonString = '{"lib":{"jsonpath":{"cricket":{"name":"India","players":["Rohit","Dhoni","Kholi"]}}}}';
        var v = new GlideJsonPath(jsonString);
        var playerNames = v.read("$['lib']['jsonpath']['cricket']['players'][*]");
        
        // At this point, `playerNames` is a JavaObject array.
        // You can log it or process it further.
        gs.info("Extracted players: " + JSON.stringify(playerNames));
        
        return playerNames;
    },

    type: 'CricketJsonParser'
};
Use code with caution.

Customization
JSON Data: Replace the hardcoded jsonString with the variable that holds your JSON data (e.g., the body of a REST response).
JSONPath Expression: Modify the JSONPath expression in the read() method to extract different data from your JSON structure.
Result Handling: The read() function returns a JavaObject array, not a standard JavaScript array. If you need to use JavaScript array methods (like forEach), you may need to convert it.
