# RESTMessageV2 GET with backoff, telemetry, and simple pagination

## What this solves
External APIs frequently throttle with HTTP 429 or intermittently return 5xx. This helper retries safely, honours Retry-After, logs simple telemetry, and follows a links.next pagination model.

## Where to use
Script Include can be called from Scheduled Jobs, Flow Actions, Business Rules, or Background Scripts.

## How it works
- Executes RESTMessageV2 requests
- On 429 or 5xx, sleeps using Retry-After or exponential backoff
- Collects minimal telemetry about attempts and total sleep time
- Appends items from json.items and follows json.links.next

## References
- RESTMessageV2 API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/RESTMessageV2/concept/c_RESTMessageV2API.html
- Direct RESTMessageV2 example  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/RESTMessageV2/reference/r_DirectRESTMessageV2Example.html
- Inbound rate limiting and Retry-After header  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/integrate/inbound-rest/concept/inbound-REST-API-rate-limiting.html
