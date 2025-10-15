//Create a new string field called 'Fix Notes(u_fix_notes)' in the problem table.
//Select the 'calculated' checkbox in the field dictionary, and add the code to the script section.
//This would be helpful if you want to export HTML fields in a report.
(function calculatedFieldValue(current) {
    var htmlText = current.fix_notes; // Getting the value of the current fix notes (HTML field)
    var decodedText = htmlText.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        }).replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>').trim();
    return decodedText;
})(current);

