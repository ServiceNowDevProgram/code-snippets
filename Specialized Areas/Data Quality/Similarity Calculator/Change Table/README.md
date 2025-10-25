# Similarity Calculator for ServiceNow Change Requests

## Overview
This utility provides manual similarity scoring between ServiceNow change request records using text analysis, without requiring machine learning. It helps developers and admins find similar changes by comparing descriptions and calculating similarity scores programmatically.

## How It Works
1. Extracts keywords from change request descriptions
2. Compares keyword overlap between change requests
3. Calculates a similarity score (0-100%)
4. Finds and ranks similar change requests based on score

## Features
- Compare change request descriptions using keyword matching
- Calculate similarity scores between change requests
- Find and rank similar changes programmatically
- No ML or Predictive Intelligence required

## Use Cases
- Manual clustering of change requests
- Identifying duplicate or related changes
- Data quality analysis before ML model training
- Change impact analysis and triage

## Setup Requirements
- ServiceNow instance with access to the `change_request` table
- Script execution permissions (Background Script or Script Include)
- No external dependencies

## Customization
- Adjust keyword extraction logic for your environment
- Change scoring algorithm to use TF-IDF, cosine similarity, etc.
- Filter by assignment group, category, or other fields
