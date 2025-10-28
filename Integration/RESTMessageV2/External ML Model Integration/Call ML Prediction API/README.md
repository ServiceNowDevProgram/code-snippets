# Integrate ServiceNow with External ML Model API

## Overview
Call an external ML API from ServiceNow to get AI predictions for incidents and auto-update records.

## What It Does
- Sends incident data to external ML API via REST call
- Receives predictions (resolution time, category, priority, etc.)
- Automatically updates incident record with predictions
- Includes error handling and logging

## Use Cases
- Predict how long an incident will take to resolve
- Auto-suggest the right category/priority
- Recommend best assignment group
- Get risk scores for changes

## Files
- `ml_prediction_script_include.js` - Script Include that calls ML API

## How to Use
1. Create Script Include in ServiceNow named `MLPredictionClient`
2. Copy code from `ml_prediction_script_include.js`
3. Update `ML_API_URL` and `API_KEY` with your ML service details
4. Call it from a Business Rule or Client Script to get predictions
5. Store results back in incident fields

## Example Usage
```javascript
var mlClient = new MLPredictionClient();
var prediction = mlClient.predictIncident({
    description: incident.description,
    category: incident.category,
    priority: incident.priority
});

incident.estimated_resolution_time = prediction.predicted_resolution_time;
incident.update();
```

## Requirements
- ServiceNow instance
- External ML API endpoint (REST)
- API key or token
