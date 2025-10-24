# ServiceNow Portfolio Commitments Loader

Bulk link service commitments to portfolio offerings with dry-run validation.

## Overview

This background script automates linking service commitments across multiple offerings in a ServiceNow portfolio. Instead of manually adding commitments one by one, you can process entire portfolios in seconds.

The script checks if commitments exist before creating them, skips duplicates, and includes a dry-run mode so you can see exactly what will be updated before running it live.

## What It Does

- Loops through all services in a defined portfolio
- Gets all offerings for each service
- Adds service commitments from a configured array
- Checks if commitments already exist (avoids duplicates)
- Can simulate changes first (dry-run mode) to see impact
- Generates a summary of what was processed

## Key Features

- **Dry-run mode** - Preview changes without touching the database
- **Duplicate prevention** - Doesn't add the same commitment twice
- **Auto-create commitments** - Creates commitments if they don't exist
- **Detailed logging** - See exactly what the script did
- **Error handling** - Continues if something fails on one record
- **Easy to customize** - Can be modified to target specific services or use different commitments per service

## Getting Started

### Before You Run

1. Note your portfolio's `sys_id`
   - Go to Service Portfolio module
   - Open your portfolio
   - Copy the sys_id from the the list

2. Know the names of your service commitments
   - Go to Service Commitment table
   - Copy the exact names you want to add (case matters)


### How It Works

The script:

Validates your configuration
Queries for all services in the portfolio
For each service, gets all offerings
For each offering:
Finds or creates the service commitment
Checks if it's already linked
Creates the relationship (or shows what it would do in dry-run)
Shows you a summary of what was processed
Configuration Options

Setting	Default	What It Does
PORTFOLIO_SYS_ID	Required	The portfolio to process
SERVICE_COMMITMENTS_TO_ADD	Required	Commitments to add
DRY_RUN	true	If true, just show what would happen
FILTER_OPERATIONAL_ONLY	false	If true, only process operational items
SKIP_EXISTING	true	If true, don't add duplicate links
