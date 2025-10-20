# Bulk Change of Incident Priority Based on Category

A background script that updates incident priorities for active incidents based on predefined category-to-priority mappings.

## Usage

1. Navigate to **System Definition → Scripts - Background**
2. Copy and paste the script content
3. Modify the `priorityMapping` object with your category-to-priority rules
4. Click "Run script"

## What It Does

The script:
1. Defines a mapping between incident categories and priority levels (e.g., 'Network': 1)
2. Queries all active incidents
3. Checks each incident's category against the mapping
4. Updates the incident priority if a match is found
5. Logs each updated incident number and new priority