This Before Update business rule acts as a safeguard in a Change management process, 
ensuring that critical changes(those marked as high impact or high risk)
are properly documented before progressing to key implementation stages.

**BR Type**: 'Before', 'Update'
**Table**: Change Request (change_request)
**Condition**: 'State' 'changes to' 'Scheduled' OR 'State' 'changes to' 'Implement'

**What It Does**:
-The BR triggers before a change request record is updated, specifically when the state changes to either Scheduled or Implement.

-It checks whether the change is classified as high impact or high risk.

-If the change meets either of those criteria, it verifies that at least two attachments are present on the record. 
 These attachments are expected to be essential supporting documents like an Implementation Plan or Backout Procedure.

-If the required documentation is missing, the rule blocks the state change and displays an error message to the user, 
 preventing the change from moving forward until compliance is met.
