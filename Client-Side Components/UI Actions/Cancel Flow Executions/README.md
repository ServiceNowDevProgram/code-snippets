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

Add the given script to your UI Action:


### Example Usage

1. Open the record where you want to cancel the associated flows.
2. Click on the **Cancel Flow** UI Action button.
3. The system will identify and cancel all running flows for the current record.
4. The same can be used in Business rules as well based on trigger conditions


### Visibility for  UI Action

In certain scenarios, it may be necessary to restrict the visibility of this operation to specific user groups. For example, only HR administrators or members of a designated group (e.g., "X Group") should have access to this functionality. These requirements can be addressed by configuring the **Condition** field in the UI Action. You can tailor the conditions to align with your specific use case, ensuring that only authorized users can execute this operation. One edge case about not having an active flow execution can also be handled in the condition which will restrict the visibility if no active flow execution is present.


## Dependencies

- `sn_fd.FlowAPI`

## Category

Client-Side Components / UI Actions 
