
# CMDB Configuration Items Training Data Quality Analyzer

## Overview
This script analyzes the quality of CMDB Configuration Item (CI) data in ServiceNow to assess readiness for Predictive Intelligence (PI) model training. It provides statistics and actionable insights to help ServiceNow developers and admins improve data quality before building machine learning models.

## Purpose
- Evaluate completeness and quality of key CMDB fields
- Identify operational status distribution across CIs
- Highlight data issues that could impact PI model performance
- Support preparation of balanced, representative training datasets

## Features
- Dynamically discovers and counts unique operational status values
- Reports the number of CIs in each operational state
- Checks for missing or default operational status values
- Outputs summary statistics to ServiceNow system logs
- Easily customizable for additional CMDB fields or metrics

## Setup Requirements
1. **ServiceNow Instance** with Predictive Intelligence plugin enabled
2. **Script Execution Permissions**: Run as a background script or Script Include with access to the `cmdb_ci` table
3. **No external dependencies**: Uses standard ServiceNow APIs (GlideRecord, GlideAggregate)
4. **Sufficient Data Volume**: At least 50 CIs recommended for meaningful analysis

## How It Works
1. **Operational Status Analysis**: Counts CIs by each operational status value found in your data
2. **Summary Output**: Prints counts and distinct states to system logs
3. **Data Quality Insights**: Helps identify imbalances, missing values, or underused states
4. **Customizable Logic**: Easily extend to analyze other CMDB fields or add mapping for status codes

