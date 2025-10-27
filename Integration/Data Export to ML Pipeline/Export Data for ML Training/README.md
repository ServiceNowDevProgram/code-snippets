# Export ServiceNow Data to ML Pipeline

## Overview
This snippet shows how to export incident data from ServiceNow and feed it into an external ML pipeline for analysis and predictions.

## What It Does
- **Script Include**: Queries incidents from ServiceNow
- **Scripted REST API**: Exposes data as JSON endpoint
- **Python Script**: Consumes data, preprocesses it, and runs basic ML operations
- **Result Storage**: Sends predictions back to ServiceNow

## Use Cases
- Predict incident resolution time
- Classify tickets automatically
- Detect anomalies in service data
- Smart assignment recommendations

## Files
- `data_export_script_include.js` - Server-side Script Include to query incident data
- `export_data_rest_api.js` - Scripted REST API to expose data as JSON endpoint

## How to Use
1. Create a Script Include in ServiceNow named `MLDataExporter` using `data_export_script_include.js`
2. Create a Scripted REST API with base path `/api/ml_export` and resource `/incidents` using `export_data_rest_api.js`
3. Call the endpoint: `GET /api/ml_export/incidents?limit=100`
4. External ML systems can fetch formatted incident data via this REST endpoint

## Requirements
- ServiceNow instance with REST API access
- Python 3.8+ with requests library
- API credentials (username/password or OAuth token)
