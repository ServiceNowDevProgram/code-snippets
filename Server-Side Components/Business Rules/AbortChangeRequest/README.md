# Change Request Limit (ServiceNow)

## Overview
This customization prevents users from creating more than **5 Change Requests** in ServiceNow.

If a user has already created 5 or more requests, the system shows an error and stops the record from being submitted.

# How It Works

1. User creates a Change Request.

2. Script Include counts how many CRs they already have.

3. If count > 5 → Show error → Stop record creation.
