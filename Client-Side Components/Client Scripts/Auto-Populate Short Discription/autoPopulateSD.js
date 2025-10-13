// Client Script to Auto-Populate Short Description based on Category

function onChangeCategory() {
    var category = g_form.getValue('category');
    var currentShortDesc = g_form.getValue('short_description');

    var prefixMap = {
        'Hardware': 'Hardware Issue - ',
        'Software': 'Software Issue - ',
        'Network': 'Network Issue - ',
        'Other': 'Other Issue - '
    };

    if (prefixMap[category]) {
        g_form.setValue('short_description', prefixMap[category] + currentShortDesc);
    }
}
