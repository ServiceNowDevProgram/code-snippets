This Catalog Client Script and Script Include are used with a reference qualifier similar to
javascript: 'disable=false' + session.getClientData('selected_dept');

The scenario is a MRVS with a reference variable to the customer account table.  When an (active) account is selected in the first row, subsequent rows should only be able to select active accounts in the same department as the first account.

The Catalog Client Script will pass the first selected account (if there is one) to a Script Include each time a MRVS row is added or edited.  The Script Include will pass the department name to the reference qualifier.
