# Validate CI selection via GlideAjax with submit guard

## What this solves
End users sometimes pick CIs that are retired or unsupported for fulfilment. This client script validates a selected CI using GlideAjax and prevents submission if the CI fails checks.
This could also be used where some CIs are supported by third parties and prevent use in incorrect forms.

## Where to use
- Catalog Item with a reference variable to `cmdb_ci`
- Add the client script as an onChange on that variable
- Install the Script Include in the same scope

## How it works
- onChange reads the selected CI sys_id
- Calls Script Include via GlideAjax
- Server checks for active CI and support group presence
- Client displays messages and disables submit if invalid

## References
- GlideAjax  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideAjax/concept/c_GlideAjaxAPI.html
- GlideForm client API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideForm/concept/c_GlideFormAPI.html
- GlideRecord  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideRecord/concept/c_GlideRecordAPI.html
