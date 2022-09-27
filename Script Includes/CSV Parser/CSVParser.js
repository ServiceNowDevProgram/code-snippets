var CSVParser = Class.create();
CSVParser.prototype = {
    initialize: function() {},

    //
    // Parses a CSV string into array of objects
    // Example:
    // var csv = "John, Doe, 33\nJane, Doe, 32\nJack, Doe, 11\nJosh, Doe, 13" 
    // var delimiter = ","
    // var headers = ["first_name", "last_name", "age"]
    // var result = parser.parse(csv, headers, delimiter);
    //
    parse: function(csv, headers, delimiter, quoteCharacter) {

        // Validate all input parameters
        this._validateInput(csv, headers, delimiter, quoteCharacter);

        // Split based on carriage return
        var lines = csv.split("\n");

        var jsonArray = [];

        // Populate the array from JSON objects
        for (var i = 0; i < lines.length; i++) {
            if (i == 0) {
                continue; // Ignore the header line
            }

            var csvLine = lines[i];

            if (csvLine) {
                var jsonObject = new sn_impex.CSVParser().parseLineToObject(csvLine, headers, delimiter, quoteCharacter);
                jsonArray.push(jsonObject);
            }

        }

        return jsonArray;

    },

    _validateInput: function(csv, headers, delimiter, quoteCharacter) {

        if (!csv) {
            throw new Error("The field 'csv' is required. This is the concatenated CSV text that needs to be parsed.");
        }

        if (!delimiter) {
            throw new Error("The field 'delimiter' is required. This is the character that splits the columns in the CSV file e.g. a comma.");
        }

        if (headers) {
            if (!Array.isArray(headers)) {
                throw new Error("The field 'headers' should be an array in the form of ['field1','field2'] etc.");
            }
        }

    },

    type: 'CSVParser'
};