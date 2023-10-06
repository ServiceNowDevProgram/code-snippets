(function execute(inputs, outputs) {
    // ... code ...
    try {
        var records = []; // Initialize an array to store records.
        var tableGR = new GlideRecord(inputs.table); // Create a GlideRecord for the specified table.
        tableGR.query(); // Execute the query to retrieve records.
        while (tableGR.next()) {
            if (tableGR.hasOwnProperty(inputs.column)) {
                // Check if the record has the specified column.
                records.push(tableGR[inputs.column].getDisplayValue()); // Add the column's display value to the records array.
            }
        }

        if (records.length > 0) {
            // If there are records in the array.
            outputs.value = records[records.length - 1]; // Set the output to the last record's value.

            while (true) {
                outputs.value = nextSequence(outputs.value, inputs.useLowerUpperBoth); // Generate the next sequence value.
                if (!records.includes(outputs.value)) {
                    // Check if the generated value is not in the records array.
                    break; // Exit the loop.
                }
            }
        } else {
            // If there are no records.
            outputs.value = inputs.default_value; // Set the output to the default value.
        }
    } catch (e) {
        outputs.value = null; // Handle any exceptions by setting the output to null.
    }

})(inputs, outputs);

// Function to generate the next sequence based on the input value and options.
function nextSequence(input, useLowerUpperBoth) {
    if (/\d+$/.test(input.toString())) {
        // If the input ends with digits.
        var postfix = input.match(/\d+$/)[0]; // Extract the digits.
        var initLength = postfix.length;
        postfix = parseInt(postfix);
        ++postfix;
        if (postfix.toString().length < initLength) {
            postfix = padStart(postfix.toString(), initLength, '0'); // Ensure consistent length by padding with zeros.
        }
        return input.replace(/\d+$/, postfix); // Replace the digits with the incremented value.
    } else {
        // If the input ends with alphabetic characters.
        var postfix = input.match(/[A-Za-z]+$/)[0]; // Extract the alphabetic characters.
        var index = postfix.length - 1;
        while (true) {
            if (index === -1) {
                // If all characters have been processed.
                var charCode = postfix.charCodeAt(0);
                if (useLowerUpperBoth === true) {
                    postfix = 'A' + postfix;
                } else {
                    postfix = (charCode < 96 ? 'A' : 'a') + postfix;
                }
                break;
            }
            var charCode = postfix.charCodeAt(index);

            if (useLowerUpperBoth) {
                // If both lower and upper case characters are allowed.
                if (charCode == 90) {
                    postfix = replaceAt(postfix, index, String.fromCharCode(97));
                    break;
                } else if (charCode == 122) {
                    postfix = replaceAt(postfix, index, String.fromCharCode(97));
                    index--;
                } else {
                    postfix = replaceAt(postfix, index, String.fromCharCode(charCode + 1));
                    break;
                }
            } else {
                // If only upper case characters are allowed.
                if (charCode == 90) {
                    postfix = replaceAt(postfix, index, String.fromCharCode(65));
                    index--;
                } else if (charCode == 122) {
                    postfix = replaceAt(postfix, index, String.fromCharCode(97));
                    index--;
                } else {
                    postfix = replaceAt(postfix, index, String.fromCharCode(charCode + 1));
                    break;
                }
            }
        }

        return input.replace(/[A-Za-z]+$/, postfix); // Replace the alphabetic characters with the updated value.
    }
}

// Function to replace a character at a specific index in a string.
function replaceAt(str, index, ch) {
    return str.substring(0, index) + ch + str.substring(index + 1);
}

// Function to pad a string with a specified character to a certain length.
function padStart(str, length, init) {
    return str.length < length ? padStart(init + str, length, init) : str;
}
