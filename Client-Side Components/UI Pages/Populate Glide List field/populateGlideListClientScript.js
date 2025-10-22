    var splitted = ['0c441abbc6112275000025157c651c89', '820351a1c0a8018b67c73d51c074097c']; //Two arrays are defined: splitted contains unique identifiers (likely Sys IDs), and displayText contains the corresponding display names for each identifier. For example, the first identifier corresponds to "3Com" and the second to "Acer."
    var displayText = ['3Com', 'Acer'];
    for (var z = 0; z < splitted.length; z++) {
        var selEl = document.getElementById('select_0comCollector'); //This line retrieves the HTML select element with the ID select_0comCollector. This element is where the new options will be added.
        var optEl = document.createElement('option');
        var txtNd1 = document.createTextNode([displayText[z]]); //A text node is created using the corresponding display name from the displayText array, indexed by z. This node will be the visible text for the option.
        optEl.setAttribute('value', [splitted[z]]); //The value of the newly created option is set to the corresponding identifier from the splitted array, indexed by z.
        optEl.appendChild(txtNd1);
        selEl.appendChild(optEl); //The fully constructed option element is appended to the dropdown select element, making it visible in the user interface.
    }
