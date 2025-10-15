User Location Validator
This solution ensures only users within their assigned business location can submit ServiceNow forms. The Script Include (Server-Side Components/Script Includes/Dynamic Location Validation Approach/UserLocationUtils.js) fetches location coordinates from the user’s profile. The Client Script (Client-Side Components/Client Scripts/Dynamic Location Validation Approach/User Location Validator.js) compares these with the actual browser location, blocking submission if the user is outside the allowed area. Update office location in the user record to adjust the validation.

If using a scoped application, ensure cross-scope access is allowed for Script Include calls.
