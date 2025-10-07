This Script Include is used with a Catalog Client Script and reference qualifier similar to
javascript: 'disable=false' + session.getClientData('selected_dept');

The scenario is a MRVS with a reference variable to the customer account table.  When an (active) account is selected in the first row, subsequent rows should only be able to select active accounts in the same department as the first account.

This Script Include will populate the department name from the account in the session data for the reference qualifier to use.
