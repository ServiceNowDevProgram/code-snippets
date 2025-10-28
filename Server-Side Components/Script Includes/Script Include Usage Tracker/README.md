#  Script Include Usage Tracker

A utility Script Include to help ServiceNow developers identify where a specific Script Include is being referenced across the instance. This is especially useful during refactoring, cleanup, or impact analysis.

##  Features

- Scans multiple tables for references to a given Script Include.
- Outputs a list of locations including table name, record name, and sys_id.
- Easily extendable to include more tables or fields.

##  Installation

1. Navigate to **System Definition > Script Includes** in your ServiceNow instance.
2. Click **New** and paste the code from `ScriptIncludeUsageTracker.js`.
3. Save and make sure the Script Include is **Client Callable = false**.

##  Usage

You can run the Script Include from a background script or another Script Include like this:
var tracker = new ScriptIncludeUsageTracker();
tracker.findUsage('MyScriptInclude');
