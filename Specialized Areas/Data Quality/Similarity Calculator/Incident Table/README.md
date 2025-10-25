# Similarity Calculator for ServiceNow Incidents

## Overview
This utility provides manual similarity scoring between ServiceNow incident records using text analysis, without requiring machine learning. It helps developers and admins find similar incidents by comparing descriptions and calculating similarity scores programmatically.

## How It Works
1. Extracts keywords from incident descriptions
2. Compares keyword overlap between incidents
3. Calculates a similarity score (0-100%)
4. Finds and ranks similar incidents based on score

## Features
- Compare incident descriptions using keyword matching
- Calculate similarity scores between incidents
- Find and rank similar incidents programmatically
- No ML or Predictive Intelligence required

## Use Cases
- Manual clustering of incidents
- Identifying duplicate or related tickets
- Data quality analysis before ML model training
- Root cause analysis and incident triage

## Setup Requirements
- ServiceNow instance with access to the `incident` table
- Script execution permissions (Background Script or Script Include)
- No external dependencies

## Customization
- Adjust keyword extraction logic for your environment
- Change scoring algorithm to use TF-IDF, cosine similarity, etc.
- Filter by assignment group, category, or other fields
