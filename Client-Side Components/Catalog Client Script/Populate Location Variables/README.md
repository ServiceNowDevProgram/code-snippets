# Auto-populate Location Variables in ServiceNow Catalog Items

## Overview

This solution automatically populates location-related variables (Location, City, State, and Country) in Service Catalog items based on the logged-in user's profile information.

## Prerequisites

- Users must have their location field populated in their user profile (`sys_user.location`)
- Location records (`cmn_location`) must have city, state, and country fields configured

## Components

### 1. Script Include
- **Name:** LocationUtilsAjax
- **Type:** Client Callable
- **Purpose:** Retrieves user location details from server

### 2. Catalog Client Script
- **Type:** onLoad
- **Purpose:** Fetches logged-in user's location data and populates catalog variables

## Installation Steps

### Step 1: Create Script Include

1. Navigate to **System Definition > Script Includes**
2. Click **New**
3. Set **Name:** `LocationUtilsAjax`
4. Check **Client callable**
5. Paste the Script Include code
6. Click **Submit**

### Step 2: Create Catalog Variables

Create these variables in your catalog item:

- `location` - Single Line Text
- `city` - Single Line Text
- `country` - Single Line Text
- `state` - Single Line Text

### Step 3: Create Catalog Client Script

1. Open your **Catalog Item**
2. Go to **Related Links > Configure > Catalog Client Scripts**
3. Click **New**
4. Set **Type:** `onLoad`
5. Paste the Catalog Client Script code
6. Click **Submit**

## Testing

1. Ensure test user has location set in their profile
2. Log in as test user and open the catalog item
3. Verify variables are automatically populated
4. Check browser console (F12) for any errors

## Configuration Notes

- Variable names in the script must match your catalog variable names exactly (case-sensitive)
- Make variables **Read-only** if users shouldn't modify them

## Security

- Script validates user input
- Only retrieves data for the current logged-in user
- No sensitive data exposure beyond user profile

---

**Version:** 1.0 | **Date:** 2025-10-25
