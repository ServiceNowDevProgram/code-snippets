
# ServiceNow Weekend Checker (Client-Side Utility)

A reusable client-side script to detect weekends (Saturday/Sunday) and modify ServiceNow form behaviour accordingly.

# Overview

This project contains a simple, reusable utility for determining if the current date (based on the user’s browser timezone) falls on a weekend.  
It’s ideal for Client Scripts, Catalog Client Scripts, or Service Portal widgets.

# Features
 
- ✅ Lightweight — no dependencies  
- ✅ Works across all client script contexts  
- ✅ Includes helper method for automatic info messages   

## ⚙️ Usage
Create the Script Include present in the WeekendChecker.js file
Use the Client-Side Script to call GlideAjax and determine if the day/date is a weekend or not.
