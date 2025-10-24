function onSubmit() {
  // Check if the browser supports geolocation
  if ("geolocation" in navigator) {
    // Request current user position
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentLatitude = position.coords.latitude;   // Current user latitude
      var currentLongitude = position.coords.longitude; // Current user longitude

      // Allowed business location coordinates fetched from server
      var allowedLatitude = locData.latitude;
      var allowedLongitude = locData.longitude;
      var locationName = locData.name;

      // Earth's radius in kilometers - constant used in distance calculation formula
      var earthRadiusKm = 6371;

      // Convert degree differences to radians
      var deltaLatitude = (currentLatitude - allowedLatitude) * Math.PI / 180;
      var deltaLongitude = (currentLongitude - allowedLongitude) * Math.PI / 180;

      // Haversine formula components
      var a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
              Math.cos(allowedLatitude * Math.PI / 180) *
              Math.cos(currentLatitude * Math.PI / 180) *
              Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      // Calculate distance in kilometers between current and allowed locations
      var distanceKm = earthRadiusKm * c;

      // Check if user's current distance exceeds tolerance (e.g., 10 km)
      if (distanceKm > 10) {
        alert("You are " + distanceKm.toFixed(2) + " km away from your registered location: " + locationName);
        g_form.addErrorMessage("Location validation failed: Submission outside the allowed radius.");
        return false; // Cancel form submission
      } else {
        g_form.addInfoMessage("Location validated successfully within range of " + locationName);
        return true; // Allow form submission
      }
    }, function(error) {
      alert("Geolocation error: " + error.message);
      return false; // Stop submission if geolocation fails
    });

    // Prevent form submission while waiting for async geolocation result
    return false;
  } else {
    g_form.addErrorMessage("Geolocation is not supported by your browser.");
    return false; // Block if geolocation API unsupported
  }
}
