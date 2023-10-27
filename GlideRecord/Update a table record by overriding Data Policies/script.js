/*  Description: Update a table record by overriding Data Policies
    	Input Value: Table name, Encoded Query and Strigify JSON data (key should be field name attribute and value)
    	Output Value: Result (Success or Error)
		E.g: overrideDataPolicies('problem','sys_id=38*****************687', {'state':'101','urgency':'3'})
    */
        var keyValues = jsonData;
        var grTable = new GlideRecord(tableName);
        grTable.addEncodedQuery(encodedQuery);
        grTable.query();
        var fields = '';
        while (grTable._next()) {
            for (var key in keyValues) {
                if (gs.nil(fields)) {
                    fields = grTable.setValue(key, keyValues[key]);
                } else {
                    fields = fields + grTable.setValue(key, keyValues[key]);
                }
            }
            grTable.setUseEngines(false); //Method used to override from scoped applications
            var result = grTable.update();
            return result;
        }
