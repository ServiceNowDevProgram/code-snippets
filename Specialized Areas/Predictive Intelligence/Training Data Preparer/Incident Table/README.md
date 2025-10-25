# Training Data Quality Analyzer for ServiceNow Predictive Intelligence

## Overview
This script analyzes the quality of incident data in ServiceNow to determine readiness for Predictive Intelligence (PI) model training. It provides detailed statistics and quality metrics to help ServiceNow developers and admins identify and address data issues before starting ML training jobs.

## Purpose
- Assess completeness and quality of key fields in incident records
- Identify common data issues that could impact PI model performance
- Provide actionable insights for improving training data

## Features
- Checks completeness of important fields (e.g., short_description, description, category, subcategory, close_notes, assignment_group)
- Analyzes text quality for description and close notes
- Evaluates category diversity and resolution times
- Calculates an overall data quality score
- Outputs results to the ServiceNow system logs

## Setup Requirements
1. **ServiceNow Instance** with Predictive Intelligence plugin enabled
2. **Script Execution Permissions**: Run as a background script or Script Include with access to the `incident` table
3. **No external dependencies**: Uses only standard ServiceNow APIs (GlideRecord, GlideAggregate, GlideDateTime)
4. **Sufficient Data Volume**: At least 50 resolved/closed incidents recommended for meaningful analysis

## How It Works
1. **Field Existence Check**: Dynamically verifies that each key field exists on the incident table or its parent tables
2. **Statistics Gathering**: Collects counts for total, resolved, and recent incidents
3. **Completeness Analysis**: Calculates the percentage of records with each key field filled
4. **Text Quality Analysis**: Measures average length and quality of description and close notes
5. **Category Distribution**: Reports on the spread and diversity of incident categories
6. **Resolution Time Analysis**: Evaluates how quickly incidents are resolved
7. **Quality Scoring**: Combines all metrics into a single overall score
8. **Log Output**: Prints all results and warnings to the ServiceNow logs for review

## Customization
- Adjust the `keyFields` array in the config section to match your organization's data requirements
- Modify thresholds for text length, resolution time, and completeness as needed
- Increase `sampleSize` for more detailed analysis if you have a large dataset

## Security & Best Practices
- Do not run in production without review
- Ensure no sensitive data is exposed in logs
- Validate script results in a sub-production environment before using for model training
