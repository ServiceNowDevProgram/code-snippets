function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '')
        return;
    //Query the short description field

    var x = g_form.getValue('short_description');
    var shortDescription = x.toLowerCase();



    //Define a mapping of keywords to assignment groups
    var keywordMapping = {
        "network": "network",
        "ip": "network",
        "software": "software",
        "adobe": "software",
        "outlook": "software",
        "hardware": "hardware",
        "laptop": "hardware",
        "printer": "hardware",
        "database": "database",
        "oracle": "database",
        "how": "inquiry",
        "support": "inquiry",

    };

    //Loop through the keywords and check if they are present in the short description
    for (var keyword in keywordMapping) {
        if (shortDescription.indexOf(keyword) !== -1) {
            //Set the Category based on the matching keyword
            g_form.setValue('category', keywordMapping[keyword]);
            break;
        }
    }
}
