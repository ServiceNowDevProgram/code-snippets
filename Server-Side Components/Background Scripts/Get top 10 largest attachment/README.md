# Top 10 Largest Attachments in ServiceNow

This script retrieves and logs the top 10 largest file attachments from the `sys_attachment` table in ServiceNow.

## Script Purpose

- Find the largest attachments stored in the instance.
- Display file name, size in MB, and the related table.

## How It Works

- Queries the `sys_attachment` table.
- Sorts by `size_bytes` in descending order.
- Limits results to 10.
- Converts size to MB and logs details using `gs.info()`.

## Usage

Run this script in a **Background Script** or **Script Include** in ServiceNow.
