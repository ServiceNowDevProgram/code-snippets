# ACL Audit Utility for ServiceNow

## Overview

This script audits Access Control Lists (ACLs) in your ServiceNow instance to identify potential security misconfigurations. It helps ensure that ACLs are properly configured and do not unintentionally expose sensitive data.

## Features

- Detects **inactive ACLs**
- Flags ACLs with **no condition or script**
- Warns about **public read access** (ACLs with no roles assigned)
- Logs findings using `gs.info()` and `gs.warning()` for visibility

## Usage

1. Navigate to **System Definition >Scripts - Background** in your ServiceNow instance.
2. Create a new Script Include named `ACL_Audit_Utility`.
3. Paste the contents of `code.js` into the script field.


## Notes

- This script does not make any changes to ACLs; it only audits and logs findings.
- You can extend the script to send email notifications or create audit records in a custom table.
