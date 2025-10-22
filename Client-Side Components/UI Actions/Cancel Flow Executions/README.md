# CancelFlow UI Action

A ServiceNow utility that dynamically cancels flows associated with the current record, ensuring seamless process management.

## Challenge

Managing running flows in ServiceNow can be challenging, particularly when multiple flows are tied to a single record. This utility streamlines the process by offering a dynamic solution to identify and cancel running flows, minimizing manual intervention and ensuring seamless operations.

This tool is especially useful in scenarios where you need to halt the current execution and initiate a new flow or process. Additionally, it can be leveraged to forcefully terminate the automation lifecycle when necessary, providing greater control over flow management.

## Description

This UI Action is designed to identify and cancel all running flows associated with the current record in a ServiceNow instance. It provides a user-friendly interface for administrators and developers to manage flow cancellations efficiently. This utility is particularly useful in scenarios where flows need to be terminated to prevent conflicts or errors during record updates.

## Functionality

The CancelFlow UI Action provides the following capabilities:
- Dynamically identifies running flows for the current record.
- Cancels the identified flows programmatically.
- Displays success or error messages to the user for better visibility.
- Ensures smooth handling of flow cancellations without manual intervention.

## Usage Instructions

### UI Action Script

Add the following script to your ServiceNow instance as a UI Action:

```javascript

function cancelRunningFlows() {

  try {
    var grFlowExecution = new GlideRecord("sys_flow_context");
    grFlowExecution.addQuery("source_record", current.sys_id);
    grFlowExecution.query();

    while (grFlowExecution.next()) {
      sn_fd.FlowAPI.cancel(grFlowExecution.getUniqueValue(), "Canceling Flows");
    }
  } catch (error) {
    gs.error("Error cancelling flows: " + error.message);
  }
}


```

### Example Usage

1. Open the record where you want to cancel the associated flows.
2. Click on the **Cancel Flow** UI Action button.
3. The system will identify and cancel all running flows for the current record.
4. The same can be used in Business rules as well based on trigger conditions


## Dependencies

- `sn_fd.FlowAPI`

## Category

Client-Side Components / UI Actions 
