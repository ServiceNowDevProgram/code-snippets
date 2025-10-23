# VA Conversation Analyzer

A background script that generates comprehensive analytics reports on Virtual Agent conversations, providing insights into usage patterns, topic performance, and user engagement.

## ⚠️ Important Note

This script analyzes data from the ServiceNow Virtual Agent (VA) `sys_cs_conversation` table. 


## What It Does

The script:
1. Analyzes all Virtual Agent conversations within a specified time period (default: 30 days)
2. Generates statistics on topic usage, completion rates, and abandonment patterns
3. Breaks down conversation data by department, time of day, and user engagement
4. Identifies topics with high abandonment rates that may need improvement
5. Provides actionable recommendations based on the data
6. Calculates user engagement metrics including power users vs. casual users

## Use Cases

- **Topic Performance Review**: Identify which topics are most/least effective
- **Service Improvement**: Find topics with high abandonment for optimization
- **Resource Planning**: Understand when and how users interact with VA
- **Executive Reporting**: Generate comprehensive VA usage reports
- **User Behavior Analysis**: Understand your user base's engagement patterns
- **ROI Measurement**: Track VA adoption and success metrics

## Sample Output

```
=== VA Conversation Analysis Report ===
Analyzing conversations from last 30 days

Total Conversations: 1,247

=== Topic Statistics ===

Top Topics by Conversation Count:
-----------------------------------
Password Reset
  Total: 324 | Completed: 298 | Abandoned: 26 | Abandon Rate: 8.0% | Unique Users: 215

Software Request
  Total: 187 | Completed: 165 | Abandoned: 22 | Abandon Rate: 11.8% | Unique Users: 134

Topics with High Abandonment (>30%):
-------------------------------------
⚠️ VPN Setup - 42.3% abandonment (11/26)
⚠️ Printer Configuration - 35.7% abandonment (5/14)

=== Department Statistics ===

IT: 456 conversations (36.6%)
HR: 298 conversations (23.9%)
Finance: 189 conversations (15.2%)

=== Time of Day Statistics ===

Morning (6am-12pm): 423 (33.9%)
Afternoon (12pm-5pm): 587 (47.1%)
Evening (5pm-10pm): 201 (16.1%)
Night (10pm-6am): 36 (2.9%)

=== User Engagement Statistics ===

Total Unique Users: 542
Power Users (5+ conversations): 89
Casual Users (<5 conversations): 453
Average Conversations per User: 2.3

=== Overall Statistics ===

Total Conversations: 1,247
Completed: 1,089 (87.3%)
Abandoned: 158 (12.7%)
Average Daily Conversations: 41.6


## Configuration Options

### Adjust Analysis Time Period
```javascript
// At the top of the script, modify:
var config = {
    daysToAnalyze: 30,  // Change to 7, 14, 60, 90, etc.
    includeAbandoned: true,
    includeCompleted: true,
    minConversations: 5
};
```

### Focus on Specific Topics
```javascript
// Add after line 15 (conversations.query()):
conversations.addQuery('topic', 'specific_topic_sys_id');
```

### Filter by Department
```javascript
// Add department filter:
conversations.addQuery('user.department', 'IT');
```

## Prerequisites

- **ServiceNow Virtual Agent** plugin enabled (com.glide.cs)
- Access to `sys_cs_conversation` table
- Background script execution rights


