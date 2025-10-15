function onSubmit() {
  var ga = new GlideAjax('UserLocationUtils');
  ga.addParam('sysparm_name', 'getUserLocationCoords');
  ga.getXMLAnswer(function(response) {
      var locData = JSON.parse(response);
      if (!locData) {
          g_form.addErrorMessage("No assigned location found for your profile.");
          return false;
      }

      navigator.geolocation.getCurrentPosition(function(position) {
          var userLat = position.coords.latitude;
          var userLng = position.coords.longitude;
          var allowedLat = locData.latitude;
          var allowedLng = locData.longitude;
          var locName = locData.name;

          var R = 6371;
          var dLat = (userLat - allowedLat) * Math.PI / 180;
          var dLng = (userLng - allowedLng) * Math.PI / 180;
          var a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(allowedLat * Math.PI / 180) *
                  Math.cos(userLat * Math.PI / 180) *
                  Math.sin(dLng / 2) ** 2;
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var distance = R * c;

          if (distance > 10) { // 10 km tolerance
              alert("You are " + distance.toFixed(2) + " km away from your registered office: " + locName);
              g_form.addErrorMessage("Location validation failed.");
              return false;
          } else {
              g_form.addInfoMessage("Location validated successfully within range of " + locName);
              return true;
          }
      });
  });
  return false; // Wait for async location validation
}
