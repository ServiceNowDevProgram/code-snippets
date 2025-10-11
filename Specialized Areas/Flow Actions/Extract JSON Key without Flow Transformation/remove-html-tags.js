(function execute(inputs, outputs) {
var htmlString = inputs.htmlValue; // Assuming HTML string is stored in the input variable htmlValue
var plainText = htmlString.replace(/<[^>]+>/g,''); // Regex to replace HTML tags
outputs.plainString = plainText.trim(); // Trimming the whitespaces, if any and pushing the string without HTML to output variable plainString
})(inputs, outputs);
