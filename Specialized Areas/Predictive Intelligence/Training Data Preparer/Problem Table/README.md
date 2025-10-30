# Training Data Quality Analyzer for ServiceNow Predictive Intelligence (Problem)

## Overview
This script analyzes the quality of problem data in ServiceNow to determine readiness for Predictive Intelligence (PI) model training. It provides detailed statistics and quality metrics to help ServiceNow developers and admins identify and address data issues before starting ML training jobs.

## Purpose
- Assess completeness and quality of key fields in problem records
- Identify common data issues that could impact PI model performance
- Provide actionable insights for improving training data

## Features
- Checks completeness of important fields (e.g., short_description, description, category, assignment_group, close_notes, state)
- Lists all fields and ancestor tables for the problem table
- Outputs results to the ServiceNow system logs

## Setup Requirements
1. **ServiceNow Instance** with Predictive Intelligence plugin enabled
2. **Script Execution Permissions**: Run as a background script or Script Include with access to the `problem` table
3. **No external dependencies**: Uses only standard ServiceNow APIs (GlideRecord, GlideAggregate)
4. **Sufficient Data Volume**: At least 50 closed problems recommended for meaningful analysis

## How It Works
1. **Field Existence Check**: Dynamically verifies that each key field exists on the problem table or its parent tables
2. **Statistics Gathering**: Collects counts for total and filled key fields
3. **Field Listing**: Lists all fields (including inherited fields) and ancestor tables
4. **Log Output**: Prints all results and warnings to the ServiceNow logs for review

## Customization
- Adjust the `keyFields` array in the script to match your organization's data requirements
- Add or remove fields and statistics as needed

## Security & Best Practices
- Do not run in production without review
- Ensure no sensitive data is exposed in logs
- Validate script results in a sub-production environment before using for model training
