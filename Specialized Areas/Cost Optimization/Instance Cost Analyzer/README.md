# ServiceNow Instance Cost Optimization Analyzer

## Description
Analyzes ServiceNow instance usage to identify cost optimization opportunities including unused licenses, redundant integrations, and oversized tables.

## Use Case
- Identify unused user licenses for cost savings
- Find redundant or duplicate integrations
- Locate oversized tables affecting performance and storage costs
- Generate cost optimization reports for management

## Features
- **License Analysis**: Finds inactive users with expensive licenses
- **Integration Audit**: Identifies duplicate or unused REST/SOAP integrations
- **Storage Analysis**: Locates tables consuming excessive storage
- **Cost Reporting**: Generates actionable cost-saving recommendations

## Implementation

### 1. Script Include (cost_analyzer.js)
Create a Script Include named `CostOptimizationAnalyzer`

### 2. Scheduled Job (scheduled_job.js)
Run weekly analysis and generate reports

### 3. System Properties
- `cost.analyzer.license.threshold` = 90 (days of inactivity)
- `cost.analyzer.table.size.threshold` = 1000000 (records)
- `cost.analyzer.integration.threshold` = 30 (days unused)

## Output
Returns JSON object with:
```json
{
  "unusedLicenses": [{"user": "john.doe", "license": "itil", "lastLogin": "2024-01-15"}],
  "redundantIntegrations": [{"name": "Duplicate LDAP", "type": "REST", "lastUsed": "2024-02-01"}],
  "oversizedTables": [{"table": "sys_audit", "recordCount": 5000000, "sizeGB": 12.5}],
  "totalPotentialSavings": "$15,000/month"
}
