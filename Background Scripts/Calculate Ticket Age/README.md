# Calculate Ticket Age Script

## Overview
This script retrieves incidents from the ServiceNow `incident` table that are neither resolved nor closed. It calculates the age of each ticket in days based on the creation date and prints the result.

## Purpose
The primary purpose of this script is to help Administrators / Developers identify how long tickets have been open. This can assist in prioritizing issues that need attention and improving overall incident management.

## How It Works
1. **Query the Incident Table**: The script queries the `incident` table, filtering out tickets that are in the "Resolved" (state 7) and "Closed" (state 8) states.
2. **Calculate Age**: For each incident, it calculates the age in days by comparing the current date with the ticket's creation date.
3. **Output**: The age of each ticket is printed to the system logs.

## Script Breakdown
- **GlideRecord**: Used to query the `incident` table.
- **GlideDateTime**: Used to manipulate date and time values for accurate calculations.
- **gs.print()**: Outputs the ticket age to the system logs.

## Usage
To use this script:
1. Copy the script into your ServiceNow Background Script Editor.
2. Run the script.
3. View the output

## Note
This script can be modified for any tables by changing the GlideRecord target and adapting the filter conditions as needed.

