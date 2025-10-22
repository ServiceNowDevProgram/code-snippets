# VIP Caller Incidents Background Script

## Description
This background script fetches all incidents where the caller is marked as a VIP user
and prints the incident number and short description in the logs.

## Usage
1. Go to **System Definition > Scripts - Background** in ServiceNow.
2. Paste the script into the editor.
3. Click **Run Script**.
4. Check the output in the logs.

## Prerequisites
- The User table must have a **VIP checkbox** (`vip` field).
- The Incident table must have a `caller_id` reference field.

