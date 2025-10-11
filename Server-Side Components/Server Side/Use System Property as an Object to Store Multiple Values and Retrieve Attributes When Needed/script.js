var sysProperty = gs.getProperty("multi_value_object");
try {
    var out = JSON.parse(sysProperty); //convert string property value to object
    for (var key in out) {
        if (out[key]) {
            gs.info(key + ":: " + out[key]);
        }
    }
} catch (e) {
    gs.info("Failed to parse property: " + e.message);
}
