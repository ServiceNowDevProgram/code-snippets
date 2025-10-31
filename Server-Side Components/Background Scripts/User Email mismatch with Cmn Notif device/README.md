# Email Mismatch Checker

## Description

This ServiceNow background script checks for mismatches between notification devices and user records based on email addresses.

It looks for active `cmn_notif_device` records that:
- Have a non-null `email_address`
- Are linked to a user
- Are of type "Email"
- Are named "Primary Email"

Then it verifies if a matching user exists in the `sys_user` table with the same email. If no match is found, the mismatch is logged.

## How to Use

1. Go to **Scripts > Background** in your ServiceNow instance.
2. Paste the script.
3. Run the script.
4. Check the system logs for mismatch details.

## Output

Logs the number of mismatches and details like:
Mismatch: Device=<device_name>, Device Email=<email_address>
