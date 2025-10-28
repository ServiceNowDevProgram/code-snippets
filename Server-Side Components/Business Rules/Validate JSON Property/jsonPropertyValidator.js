(function executeRule(current, previous /*null when async*/ ) {

    // This BR will check if the property has a valid JSON object and will only allow save if the JSON is syntactically correct
    try {
        var regex =/\s*(['"])([^'"]+)\1\s*[:;]\s*(?:(['"])([^'"]*)\3|true|false|null|\d+)(?:\s*[;,]\s*(['"])([^'"]+)\5\s*[:;]\s*(?:(['"])([^'"]*)\7|true|false|null|\d+))*?\s*\}|\[\{(?:\s*(['"])([^'"]+)\9\s*[:;]\s*(?:(['"])([^'"]*)\11|true|false|null|\d+)(?:\s*[;,]\s*(['"])([^'"]+)\13\s*[:;]\s*(?:(['"])([^'"]*)\15|true|false|null|\d+))*?\s*\}\s*(?:[;,]\s*(?:\{(?:\s*(['"])([^'"]+)\17\s*[:;]\s*(?:(['"])([^'"]*)\19|true|false|null|\d+)(?:\s*[;,]\s*(['"])([^'"]+)\21\s*[:;]\s*(?:(['"])([^'"]*)\23|true|false|null|\d+))*?\s*\})\s*)*)*\s*\])$/;
		
        if (regex.test(current.value)) {
            JSON.parse(current.value);
        }
    } catch (ex) {
        gs.addErrorMessage("Invalid JSON format");
        current.setAbortAction(true);
    }

})(current, previous);
