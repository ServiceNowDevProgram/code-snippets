The purpose is to ensure the Global Search on the portal displays approval record. For instance, a case where user has quite a few approval records and wants to search on basis of the ticket to approve instead of navigating to My To-Dos or My Approvals.
When user will enter the ticket number (for this use case it is RITM) in the global search system will display a record with a tick to the left of the number.
This is added in the HTML file to help differentiate approval record from regular ticekt record. Inention here is when user selects the record with a 'tick' it will take to approval record where Approval action can be taken whilst the one without 'tick' will take to the actual ticket.

This is not only for approvers but even the delegated user will be able to look at the records and action directly.

Replace the 'id=approvals' with relevant custom page, if used for approvals.

Record needs to be created in  sp_search_source table with the HTML & JS script as added to this folder, accordingly.

Once done, ensure to use the Search source by navigating to the Service Portals >> Portals and relevant portal needs to have the above created Search Source added in the related list.

Result as below <img width="433" alt="image" src="https://github.com/Jaspalsinghchot/code-snippets/assets/30924269/7885cb4d-dd36-48c7-94ee-5a79ceb1cee9">

where first one will take us ticket page while the other one is approval record.

