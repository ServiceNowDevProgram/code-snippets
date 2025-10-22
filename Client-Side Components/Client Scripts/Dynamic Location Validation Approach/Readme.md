**User Location Validator**
This script restricts form submissions based on the physical location of the user. The current location is obtained using the browser’s geolocation API (latitude and longitude), and is then compared against the user's assigned business location stored in ServiceNow.

**How It Works**
- The **server-side Script Include**(UserLocationUtils.js) fetches the assigned business location’s latitude, longitude, and name for the logged-in user.
- The **client-side script**(User Location Validator.js) uses the browser API to obtain the current latitude and longitude of the user at form submission.
- It calculates the distance between these two points using the **Haversine formula**, which accounts for the spherical shape of the Earth.
- The key constant `earthRadiusKm = 6371` defines the Earth's radius in kilometers and is essential for accurate distance calculation.
- If the user’s current location is outside the predefined radius (default 10 km), the form submission is blocked with an error message showing the distance and allowed location.
- If the user is within range, a confirmation info message is displayed and the submission proceeds.

**Sample Output**
- **Success:** "Location validated successfully within range of Headquarters."
- **Failure:** "You are 15.23 km away from your registered location: Headquarters."

**Usage Notes**
- Requires user consent for geolocation access in the browser.
- The script uses descriptive variable names for clarity and maintainability.
- Suitable for scenarios requiring geo-fencing compliance or location-based workflow restrictions.
