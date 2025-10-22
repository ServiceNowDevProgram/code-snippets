# Dynamic Approval Routing Based on Organizational Hierarchy

## Overview

This Script Include provides a dynamic way to determine approval routing based on a user's organizational hierarchy, including their manager, department head, and role-based approvers. It is designed to be used in workflows, business rules, or Flow Designer actions to automate complex approval chains.

## Features

- Retrieves a user's manager as an approver.
- Adds department head if available.
- Includes role-based approvers (e.g., Finance Head for users with `finance_approver` role).
- Easily extendable for other roles or organizational logic.

## Usage

### Script Include: `ApprovalRouter`

Call the `getApprovers(userId)` method to retrieve a list of approver `sys_id`s.

```javascript
var router = new ApprovalRouter();
var approvers = router.getApprovers(current.requested_for.toString());

gs.info('Approvers: ' + approvers.join(', '));
