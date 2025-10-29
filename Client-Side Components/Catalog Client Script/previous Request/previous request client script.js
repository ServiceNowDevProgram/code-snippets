function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') return;

    var ga = new GlideAjax('PreviousRequestsUtils');
    ga.addParam('sysparm_name', 'getPreviousRequests');
    ga.addParam('sysparm_requested_for', newValue);
    ga.getXMLAnswer(function(response) {
        var requests = JSON.parse(response);
        if (requests.length === 0) {
            alert('No previous requests found for this user.');
        } else {
            var message = 'Previous Requests:\n\n';
            requests.forEach(function(req) {
                message += 'Number: ' + req.number + ' | Item: ' + req.item + ' | Date: ' + req.date + '\n';
            });
            if (confirm(message + '\nDo you want to continue?')) {
                // User clicked OK
            } else {
                // User clicked Cancel
                g_form.setValue('requested_for', oldValue);
            }
        }
    });
}
