# Cleanup Orphaned and Stale Workflow Contexts

**Purpose:** Automated maintenance script to identify and cancel stale or orphaned workflow contexts in ServiceNow

## Overview

This fix script addresses a common ServiceNow instance health issue where workflow contexts remain stuck in "Executing" state indefinitely due to orphaned parent records or incomplete workflow execution. Over time, these stale contexts accumulate and can impact system performance, reporting accuracy, and workflow metrics. The script systematically identifies problematic workflow contexts based on configurable criteria and cancels them to maintain instance hygiene.

## Detailed Description

### What Problem Does This Solve?

In ServiceNow environments, workflow contexts (`wf_context` table) occasionally become "stuck" in an executing state when:

1. **Parent Record Deletion:** The record that initiated the workflow gets deleted before workflow completion
2. **Workflow Design Issues:** Improperly designed workflows without proper completion logic
3. **System Errors:** Database issues, timeouts, or system failures interrupt workflow execution
4. **Data Integrity Problems:** Missing or corrupted table references in the context record

These orphaned workflows continue to show as "executing" indefinitely, creating false metrics and consuming system resources during workflow engine operations.

### How It Works

The script operates through a systematic validation and cleanup process:

#### **Phase 1: Configuration & Initialization**
- Establishes a time threshold (default: 180 days) to identify long-running workflows
- Calculates the cutoff date by subtracting the threshold from the current date
- Sets up batch processing limits to prevent transaction timeouts
- Initializes counters for tracking processed, cancelled, and orphaned workflows

#### **Phase 2: Identification**
The script queries the `wf_context` table for workflows matching these criteria:
- **State:** Currently in "executing" status
- **Age:** Created more than 180 days ago (configurable)
- **Batch Limit:** Processes up to 500 records per execution (configurable)

#### **Phase 3: Validation**
For each identified workflow context, the script performs validation checks:

1. **Reference Validation:** Verifies the workflow has valid table and record ID references
   - If either `table` or `id` field is empty → Mark for cancellation
   - Reason: "Missing table or record reference"

2. **Parent Record Validation:** Checks if the parent record still exists
   - Queries the parent table using the stored record ID
   - If record cannot be retrieved → Mark for cancellation
   - Reason: "Parent record no longer exists"

#### **Phase 4: Cleanup Execution**
For workflows marked for cancellation:
- **Dry Run Mode (Default):** Logs findings without making changes
- **Execution Mode:** When `DRY_RUN = false`:
  - Sets workflow state to "cancelled"
  - Calls `setWorkflow(false)` to prevent triggering additional workflows during the update
  - Updates the workflow context record
  - Increments cancellation counter

#### **Phase 5: Reporting**
Generates comprehensive execution logs including:
- Threshold date applied
- Execution mode (dry run vs. actual)
- Total workflows processed
- Number of orphaned workflows identified
- Number of workflows cancelled (if executed)
- Individual workflow details with cancellation reasons

## Configuration Variables

### `DAYS_THRESHOLD`
- **Type:** Integer
- **Default:** 180
- **Purpose:** Defines how old a workflow must be (in days) to be evaluated for cleanup
- **Recommendation:** Start with 180 days; adjust based on your organization's longest-running legitimate workflows

### `BATCH_SIZE`
- **Type:** Integer
- **Default:** 500
- **Purpose:** Limits the number of records processed in a single execution to prevent database transaction timeouts
- **Recommendation:** Keep at 500 for most instances; reduce to 250-300 if you experience timeout errors

### `DRY_RUN`
- **Type:** Boolean
- **Default:** `true`
- **Purpose:** Safety mechanism that logs findings without making actual changes
- **Critical:** Always run in dry run mode first to review what would be affected

## Prerequisites & Dependencies

### Required Access
- **Admin Role:** Required to execute background scripts and modify workflow contexts
- **Table Access:** Read/write access to `wf_context` table

### Scope Requirements
- Should be executed in **Global scope**
- Can be run as a Fix Script or Background Script

### Testing Requirements
- **Mandatory:** Test in non-production environment first
- Verify workflows being cancelled are truly orphaned
- Review dry run logs before actual execution

## Execution Instructions

### Step 1: Prepare the Script
1. Copy the script to a Background Script or Fix Script module
2. Review and adjust configuration variables based on your requirements
3. Ensure `DRY_RUN = true` for initial execution

### Step 2: Dry Run Execution
1. Execute the script in dry run mode
2. Review the System Logs for identified workflows
3. Validate that workflows marked for cancellation are legitimate candidates
4. Note the "Total Processed" and "Orphaned Workflows Found" counts

### Step 3: Actual Execution
1. Set `DRY_RUN = false` in the script
2. Re-execute the script
3. Monitor execution logs
4. Verify workflows are successfully cancelled in the `wf_context` table

### Step 4: Schedule (Optional)
For ongoing maintenance, consider:
- Creating a scheduled job to run this monthly or quarterly
- Adjusting `DAYS_THRESHOLD` to a lower value for regular maintenance (e.g., 90 days)
- Implementing notifications for cleanup execution results

## Use Cases

### Common Scenarios for This Script

1. **Instance Health Maintenance:** Regular cleanup as part of quarterly instance maintenance activities
2. **Pre-Upgrade Cleanup:** Clearing stale data before major version upgrades
3. **Performance Optimization:** Reducing wf_context table bloat when workflow reports show high executing counts
4. **Data Migration Cleanup:** After bulk record deletions or data migrations that leave orphaned workflows
5. **Workflow Redesign Projects:** Cleaning up contexts from deprecated or redesigned workflows

## Best Practices

### Safety Measures
- Always start with dry run mode enabled
- Test in sub-production environments first
- Document workflows being cancelled before execution
- Schedule during low-usage maintenance windows

### Monitoring
- Review System Logs after each execution
- Compare before/after counts in the wf_context table
- Verify no legitimate long-running workflows are impacted
- Monitor workflow execution metrics post-cleanup

### Maintenance Schedule
- Run quarterly for preventive maintenance
- Run immediately if you notice unusually high executing workflow counts
- Adjust `DAYS_THRESHOLD` based on your environment's workflow patterns

## Technical Considerations

### Performance Impact
- **Batch Processing:** Limits database load through `BATCH_SIZE` control
- **Query Efficiency:** Uses indexed fields (state, sys_created_on) for optimal performance
- **Transaction Management:** `setWorkflow(false)` prevents cascade operations

### Data Integrity
- **No Data Loss:** Only cancels workflows; doesn't delete parent records
- **Audit Trail:** All cancellations are logged in System Logs
- **Reversibility:** Cancelled workflows remain in the table for audit purposes

### Limitations
- Processes only one batch per execution; may need multiple runs for large datasets
- Focuses on orphaned workflows; doesn't detect all types of stuck workflows
- Requires manual verification for workflows without obvious orphaning issues

## Support & Enhancement Ideas

### Potential Enhancements
1. Add email notification summarizing cleanup results
2. Implement additional validation for workflows stuck in activities
3. Create reporting dashboard for workflow health metrics
4. Add support for archiving cancelled contexts to secondary table
5. Include validation for workflows without any executing activities

***

This script is a practical maintenance tool that helps keep your ServiceNow instance healthy by addressing a common technical debt issue with workflow contexts, improving system performance and data accuracy.

## Authors
Masthan Sharif Shaik ( <a href="https://www.linkedin.com/in/nowsharif/" target="_blank">LinkedIn</a> ,  <a href="https://www.servicenow.com/community/user/viewprofilepage/user-id/668622" target="_blank">SN Community</a> )

## Version History:
* 0.1
    * Initial Release
