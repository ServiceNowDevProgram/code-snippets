# Weekly Licensed User Access Review (90-Day Inactivity)

# Overview
This scheduled job runs weekly and automatically revokes access for licensed users who have been inactive/last login for more than 90 days.  
It ensures license compliance, cost control, and adherence to security policies.

# Objective
To identify active users holding licensed roles who have not logged into ServiceNow within the past 90 days and revoke their access by removing them from their respective groups.

# Configuration Summary
1. Threshold - 90 days since last login
2. Frequency - Weekly
3. Licensed Roles Checked - 'itil', 'sys_approver', 'admin', 'business_stakeholder'
4. Groups Managed - ITIL Group, Approver Group, Admin Group, Business Stakeholder Group
