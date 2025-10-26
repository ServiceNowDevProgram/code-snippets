# Attachment Size Audit

A ServiceNow background script that analyzes your instance's attachment storage and identifies which tables consume the most space and locate oversized files.

## Overview

This read-only script scans all attachments in your instance and provides:
- Total storage used across all attachments
- Storage breakdown by source table (kb_knowledge, sc_task, incident, etc.)
- List of the 25 largest individual attachments

The script does not modify or delete any data—it only reads and reports findings.

## How It Works

The script runs through three main steps:

1. **Calculate Total Storage** - Sums all attachment sizes to give your total storage footprint
2. **Break Down by Table** - Groups attachments by source table to identify which applications consume the most storage
3. **Find Largest Files** - Identifies individual attachments larger than your threshold and lists them in descending order

## Configuration

Before running, adjust these variables at the top of the script:

- `TOP_N_ATTACHMENTS` (default: 25) - Number of largest files to display
- `MIN_SIZE_MB` (default: 5) - Only show attachments larger than this size in MB
- `USE_COMPRESSED_SIZE` (default: true) - Use actual disk size (true) or logical file size (false)

## Prerequisites

- Admin role to execute background scripts
- Global scope (or scoped app with sys_attachment visibility)
- Read access to sys_attachment table
- Access to System Logs to view results

## How to Run

1. Navigate to **System Definition → Scripts - Background**
2. Click **New** and paste the script
3. Optionally adjust configuration variables
4. Click **Execute**
5. View results in **System Diagnostics → System Log** (search for "Attachment Size Audit")

## Sample Output

```
=== Attachment Size Audit Started ===
Using size field: SIZE_COMPRESSED

Total Attachment Storage: 415.28 MB

=== Storage Usage by Table (Descending) ===
invisible.sys_store_app           : 175.29 MB
sys_upgrade_manifest              : 49.39 MB
ZZ_YYsn_wn_media                  : 33.50 MB
ZZ_YYdb_image                     : 28.99 MB
sys_sg_mobile_builder_config      : 25.36 MB
ZZ_YYhelp_content                 : 21.00 MB
incident                          : 1.18 MB
kb_knowledge                      : 75.54 KB

=== Top 25 Largest Attachments (>5 MB) ===
[ 68.47 MB ] sncencZZYY.fd254d9443a161100967247e6bb8f200_3_1_3.zip | Table: invisible.sys_store_app | Record: fd254d9443a161100967247e6bb8f200
[ 24.72 MB ] upgrade_manifest.csv | Table: sys_upgrade_manifest | Record: d5ee366b47203210ca05a464116d4328
[ 24.66 MB ] upgrade_manifest.csv | Table: sys_upgrade_manifest | Record: 9ee610ffe17a22108bb2327e625886d0
[ 17.77 MB ] image | Table: ZZ_YYhelp_content | Record: 19d642e347203210ca05a464116d4369
[ 11.63 MB ] sncencZZYY.a77e3ede4df92010f87774ecf02d44f3_28_1_1.zip | Table: invisible.sys_store_app | Record: a77e3ede4df92010f87774ecf02d44f3

=== Attachment Size Audit Complete ===
```

## Use Cases

- **Storage Planning** - Understand current attachment storage and plan for capacity growth
- **Cost Optimization** - Identify storage hotspots for cloud instances to reduce costs
- **Performance Issues** - Find large attachment tables that may be slowing queries
- **Cleanup Strategy** - Identify which tables and files should be targeted for archival or deletion
- **Pre-Upgrade Preparation** - Run before major upgrades to identify optimization opportunities

## Future Enhancement Opportunities

- **Generate Cleanup Script** - Create a companion script to delete old or orphaned attachments with DRY_RUN mode
- **Orphaned Attachment Detection** - Identify attachments where parent records have been deleted
- **File Age Analysis** - Track attachments older than 30/90/365 days to support retention policies
- **File Type Breakdown** - Categorize attachments by extension (PDF, DOCX, MP4, etc.)
- **Email Notifications** - Send automated summaries to storage admins with key metrics
- **Dashboard Widget** - Create PA widget to visualize storage trends over time
- **Scheduled Reporting** - Set up as scheduled job to track growth monthly
- **Duplicate Detection** - Find duplicate attachments on same records for cleanup opportunities

## Safety & Performance

- **Read-only operation** - No data is modified or deleted
- **No infinite loops** - Explicit limits on record processing
- **Timeout prevention** - Efficient aggregate queries for large datasets
- **Sub Pro Testing** - Test in sub-production environments first


## Authors
Masthan Sharif Shaik ( <a href="https://www.linkedin.com/in/nowsharif/" target="_blank">LinkedIn</a> ,  <a href="https://www.servicenow.com/community/user/viewprofilepage/user-id/668622" target="_blank">SN Community</a> )

## Version History:
* 0.1
    * Initial Release
