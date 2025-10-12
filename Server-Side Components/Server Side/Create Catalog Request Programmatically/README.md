# Create Service Catalog Request Programmatically

## Description
This snippet demonstrates how to programmatically create a Service Catalog request using the CartJS API from server-side code. It bypasses the Service Portal interface and directly adds items to a cart, populates variables, and completes the checkout process.

## Use Cases
- Automated hardware provisioning workflows
- Integration endpoints that trigger catalog requests
- Business Rules that create catalog items based on conditions
- Scheduled Jobs that batch-create catalog requests
- UI Actions that automate catalog submissions
- Custom approval processes that generate follow-up requests

## Prerequisites
- Service Catalog Scoped API plugin enabled (com.glideapp.servicecatalog.scoped.api)
- Valid catalog item sys_id
- Variable names must match exactly as defined in the catalog item

## Key Features
- Populates catalog item variables dynamically
- Automatically checks out the cart
- Returns request ID and number for reference
- Can be used in any server-side context (Business Rules, Script Includes, etc.)

## Notes
- Two-step checkout setting affects the return value
- If two-step checkout is enabled, returns cart_id
- If two-step checkout is disabled, returns request_id and request_number
- Replace placeholder sys_ids with actual values from your instance
