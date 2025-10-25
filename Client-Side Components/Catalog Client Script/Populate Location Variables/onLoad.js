// ========================================
// CATALOG CLIENT SCRIPT
// ========================================
// Name: Auto-populate Location Variables
// Type: onLoad
// UI Type: Desktop (or All)
// Applies to: [Your Catalog Item]
// ========================================

function onLoad() {
    // Get current logged-in user's ID
    var userId = g_user.userID;
    
    // Call Script Include to get user's location information
    var ga = new GlideAjax('LocationUtilsAjax');
    ga.addParam('sysparm_name', 'getUserLocation');
    ga.addParam('sysparm_user_id', userId);
    ga.getXMLAnswer(function(response) {
        if (response) {
            var locationData = JSON.parse(response);
            
            // Populate catalog variables
            if (locationData.location) {
                g_form.setValue('location', locationData.location);
            }
            if (locationData.city) {
                g_form.setValue('city', locationData.city);
            }
            if (locationData.state) {
                g_form.setValue('state', locationData.state);
            }
            if (locationData.country) {
                g_form.setValue('country', locationData.country);
            }
        }
    });
}