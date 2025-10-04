How often you come across cases where any version update to workflow breaks some other element of the existing workflow in PRD. Consider a case where more than one developer works on workflow and the updates are not in sync. When pushed to PRD breaks the workflow and as the issue is in PRD all you need to do is a break-fix at the soonest.
The idea is to return to a stable, known version of the workflow to ensure continuity and productivity, while investigating or fixing the problems in the newer version and thus reverting to previous working version of workflow is the only resort.

Use this as a background script/fix script and execute by merely changing the sys_id of workflows from 'wf_workflow_version' table.
