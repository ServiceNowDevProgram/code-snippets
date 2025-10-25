# Training Data Quality Analyzer for ServiceNow Predictive Intelligence (Change Requests)

## Overview
This script analyzes the quality of change request data in ServiceNow to determine readiness for Predictive Intelligence (PI) model training. It provides detailed statistics and quality metrics to help ServiceNow developers and admins identify and address data issues before starting ML training jobs.

## Purpose
- Assess completeness and quality of key fields in change request records
- Identify common data issues that could impact PI model performance
- Provide actionable insights for improving training data

## Features
- Checks completeness of important fields (e.g., short_description, description, category, risk, assignment_group, implementation_plan, test_plan, backout_plan, close_notes)
- Analyzes text quality for description, implementation/test/backout plans, and close notes
- Evaluates category diversity and closure times
- Calculates an overall data quality score
- Outputs results to the ServiceNow system logs

## Setup Requirements
1. **ServiceNow Instance** with Predictive Intelligence plugin enabled
2. **Script Execution Permissions**: Run as a background script or Script Include with access to the `change_request` table
3. **No external dependencies**: Uses only standard ServiceNow APIs (GlideRecord, GlideAggregate, GlideDateTime)
4. **Sufficient Data Volume**: At least 50 closed change requests recommended for meaningful analysis

## How It Works
1. **Field Existence Check**: Dynamically verifies that each key field exists on the change_request table or its parent tables
2. **Statistics Gathering**: Collects counts for total, closed, and recent change requests
3. **Completeness Analysis**: Calculates the percentage of records with each key field filled
4. **Text Quality Analysis**: Measures average length and quality of description, implementation/test/backout plans, and close notes
5. **Category Distribution**: Reports on the spread and diversity of change request categories
6. **Closure Time Analysis**: Evaluates how quickly change requests are closed
7. **Quality Scoring**: Combines all metrics into a single overall score
8. **Log Output**: Prints all results and warnings to the ServiceNow logs for review

## Customization
- Adjust the `keyFields` array in the config section to match your organization's data requirements
- Modify thresholds for text length, closure time, and completeness as needed
- Increase `sampleSize` for more detailed analysis if you have a large dataset