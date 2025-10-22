var productDescriptions =
    "Product A (Code: ABC-123) costs $29.99.\n" +
    "Product B (Code: DEF-456) costs $39.50.";

var productPattern = /Code:\s*([A-Z]{3}-\d{3})\)\s*costs\s*\$(\d+(\.\d{2})?)/g;

var match;
while ((match = productPattern.exec(productDescriptions)) !== null) {
    var productCode = match[1];
    var price = match[2];

    gs.info('Product Code: ' + productCode + ', Price: $' + price);
}
