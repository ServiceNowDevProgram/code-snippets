A business rule that verifies all checklist items are completed before allowing the record to progress to the next status.

The business rule consists of three main parts:

Part A: Looks up all checklists (checklist table) tied to the current record (document = current.sys_id).

Part B: For each checklist, query the checklist_item records:

        Only items in that checklist.

        Only items that are not complete (complete = false).
        
Part C: If any incomplete items exist, an error message is displayed and the action is aborted.
