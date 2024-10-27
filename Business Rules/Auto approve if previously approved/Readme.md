The purpose of this BR is to avoid redundant approval actions if the ticket is sent to same approver.
This should be a Before Insert Business rule that runs on the Approval table.
Replace the table name accordingly in line 3 of the code to limit it to particular table. For instance, there may be need for auto-approval only for RITMs and not for Change requests.
