var regexCheckerScript = Class.create();
regexCheckerScript.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getFieldforRegex: function() {
        var dRecordSysId = [];
        var grDRecordTable = new GlideRecord('incident'); //ADD YOUR DESIRED TABLE NAME 
        grDRecordTable.addEncodedQuery('active=true'); //ADD YOUR DESIRED QUERY
        grDRecordTable.query();
        while (grDRecordTable.next()) {
            var description = grDRecordTable.getValue('description'); //ADD YOUR DESIRED FIELD HERE
            var re = YOUR REGEX GOES HERE; //ADD YOUR DESIRED REGEX HERE
            if (re.test(description)) {
                dRecordSysId.push(grDRecordTable.sys_id.toString()); //IF MATCHES FIELD IT PUSHES THE SYS_ID TO THE ARRAY
            }
        }
        return dRecordSysId.toString(); //RETURNS ALL THE RECORDS THAT MATCH THE REGEX
    },

    type: 'regexCheckerScript'
});
