# CI health badges component (Now Experience)

## What this solves
Platform engineers want a quick visual of CI health. This Now Experience component fetches a CI’s health score and renders a compact badge: Good, Warning, or Critical.

## Where to use
- Now Experience / UI Builder component
- Include `CiHealthApi` Script Include for server calls from an Action or Data Resource

## How it works
- Client component requests CI health via a simple server API (Script Include)
- Displays a coloured badge with score and last evaluated time
- Props: `ciSysId`

## Configure
- Ensure a health source exists for the CI class you test
- Replace `CiHealthApi` logic if you use a custom health table

## References
- Now Experience framework  
  https://www.servicenow.com/docs/bundle/zurich-employee-service/page/build/workspace-components/concept/now-experience.html
- GlideAjax (if calling Script Include from client)  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideAjax/concept/c_GlideAjaxAPI.html
