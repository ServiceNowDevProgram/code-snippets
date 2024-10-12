# Inactive User Cleanup Utility for ServiceNow

This utility is designed for ServiceNow administrators to help maintain user accounts by automatically deactivating users who have not logged in for a specified number of days. 
It's a Script Include that can be scheduled to run at regular intervals or executed manually.

## Features

- Identifies users who have been inactive for a given number of days.
- Deactivates these users to keep the user list current and secure.
- Logs all deactivation actions for auditing purposes.

## Prerequisites

Before you begin using this utility, ensure that you have the necessary permissions to modify user records in ServiceNow.

## Installation

1. Navigate to `System Definition > Script Includes` in your ServiceNow instance.
2. Click on `New` to create a new Script Include.
3. Give it a name, such as `InactiveUserCleanup`.
4. Copy and paste the code from the `InactiveUserCleanup.js` file into the `Script` field.
5. Save the new Script Include.

## Usage

To use the `InactiveUserCleanup` utility:

1. Create an instance of the `InactiveUserCleanup` class in a background script, business rule, or scheduled job.
2. Call the `deactivateInactiveUsers` method with the number of days of inactivity as the parameter.

Example for a background script:

```javascript
var cleanup = new InactiveUserCleanup();
cleanup.deactivateInactiveUsers(90); // Deactivate users who have been inactive for 90 days
