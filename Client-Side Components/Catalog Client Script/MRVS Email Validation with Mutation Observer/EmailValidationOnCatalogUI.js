/**
 * This is a client script that validates the email address in the MRVS field.
 * It uses MutationObserver to observe the changes in the MRVS field.
 * UseCase: Validate the email address in the catalog whenever user is going to add another email, 
 * and show an error message if a duplicate email address is found. 
 */
function onLoad() {
    var document = document || top.document;

    var duplicateErrorMessageStatus = false; //adding this as corner case as observer will be called multiple times

    setTimeout(function () {
        var tbody = document.querySelector("#user_details > div > tbody");

        if (tbody) {
            var observer = new MutationObserver(function (m, o) {

                var users = g_form.getValue('user_details');

                var hasDuplicateEmails = validateUserDetails();

                if (!users || hasDuplicateEmails) {
                    if (hasDuplicateEmails && !duplicateErrorMessageStatus) {
                        g_form.addErrorMessage('Duplicate email address found');
                        duplicateErrorMessageStatus = true;
                    }
                    //disable the submit button
                } else {
                    duplicateErrorMessageStatus = false;
                    g_form.clearMessages();
                    //enable the submit button
                }

            });
            observer.observe(tbody, {
                attributes: true,
                childList: true,
                subtree: true
            });
        }
    }, 3000);

}

// MRVS contains the user details in the form of JSON
function validateUserDetails() {
    var userDetailsMRVS = g_form.getValue('user_details');
    if (userDetailsMRVS) {
        var multiRowData = JSON.parse(userDetailsMRVS);
        var emailSet = new Set();

        for (var i = 0; i < multiRowData.length; i++) {
            var row = multiRowData[i];

            var email = row.email.trim().toLowerCase();

            if (emailSet.has(email)) {

                return true;
            }
            emailSet.add(email);
        }
    }
    return false;
}