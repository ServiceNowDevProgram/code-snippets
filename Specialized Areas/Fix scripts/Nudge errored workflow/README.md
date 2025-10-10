# Workflow recovery script

This script provides a quick and dirty fix for resuming a stuck or misrouted workflow in ServiceNow. It manually forces a workflow context to resume execution from a specified activity, bypassing errors or incorrect transitions.

## Purpose

Workflows in ServiceNow can occasionally get stuck due to:
- Misconfigured transitions
- Script errors
- Unexpected data conditions

This script allows you to manually resume execution from a desired activity within a workflow context.

## How to

Change the value of the variables in the script to the [wf_context] sys_id (wfContextId) and the [wf_activity] sys_id (wfActivityId)

