Table Size Retriever – ServiceNow
Overview

This script retrieves the size of any table in your ServiceNow instance in gigabytes and provides a fallback estimate if metadata is not available. It also logs the total number of records in the table.

This is useful for instance management, capacity planning, and gaining insights into table sizes without manually inspecting each table.

Features

Retrieves the official table size from the sys_physical_table_stats table if available.

Falls back to a size estimate based on record count when metadata is missing.

Logs the number of records in the table.

Can be used with any table by changing the tableName variable.

Fully compatible with Background Scripts.

Configuration

Table Name: Set the tableName variable to the table you want to check.

var tableName = 'task'; // Replace with any table name

How It Works

Queries the sys_physical_table_stats table for the specified table name.

If the table exists in metadata, retrieves the size in gigabytes.

If metadata is not available, estimates the table size based on record count (assuming 1 KB per record).

Logs the table size (official or estimated) in GB.

Separately retrieves and logs the total number of records in the table.

Usage

Navigate to System Definition → Scripts – Background in your ServiceNow instance.

Copy and paste the script.

Update the tableName variable as needed.

Click Run Script.

Check the system logs to view the table size and record count.
