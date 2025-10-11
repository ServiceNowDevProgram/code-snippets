var eps = new GlideScriptedExtensionPoint().getExtensions("x_snc_etension_p_0.CustomNotificationHandlerInterface");
for (var i = 0; i < eps.length; i++) {
	// checking which extension point works
	gs.info("Does the extension point applies: " + eps[i].handles("Email"));
    if (eps[i].handles("Email")) {
		//invoking the process function
        eps[i].process();
    }
}