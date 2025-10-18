API Token Expiry Warning Script
**Overview**
This script provides proactive monitoring and alerting for OAuth API tokens stored in the ServiceNow oauth_credential table. It identifies tokens nearing expiry within a configurable countdown window and sends notification emails to administrators, helping prevent sudden integration failures due to expired credentials.
**Problem Solved**
API tokens used for integrations have expiration timestamps after which they become invalid. Without early warnings, tokens can expire unnoticed, causing integration outages, failed API calls, and increased support incidents. This solution enables administrators to receive timely alerts allowing proactive token renewal and smoother integration continuity.
