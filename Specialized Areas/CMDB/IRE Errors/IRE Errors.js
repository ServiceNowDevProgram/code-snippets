var ireErrorMessagesObj = {
    "IDENTIFICATION_RULE_MISSING": { count: 0, desc: "Identity Rule Missing for table [xyz]" },
    "MISSING_MATCHING_ATTRIBUTES": { count: 0, desc: "In payload missing minimum set of input values for criterion (matching) attributes from identify rule for table [xyz]." },
    "NO_CLASS_NAME_FOR_INDEPENDENT_CI": { count: 0, desc: "Cannot have 'sys_class_name' as a key field in an Independent Identity Rule on 'xyz'" },
    "IDENTIFICATION_RULE_FOR_LOOKUP_MISSING": { count: 0, desc: "Identity Rule for table [xyz] missing Lookup Rule for class [abc]" },
    "IDENTIFICATION_RULE_FOR_RELATED_ITEM_MISSING": { count: 0, desc: "Identity Rule for table [xyz] missing Related Rule for class [abc]" },
    "NO_LOOKUP_RULES_FOR_DEPENDENT_CI": { count: 0, desc: "Cannot have Lookup Rule for a Dependent Identity Rule on 'xyz'" },
    "INVALID_INPUT_DATA": { count: 0, desc: "Invalid payload: invalid sys_id or invalid data_source or invalid relationship in cmdb_rel_ci etc.." },
    "DUPLICATE_RELATIONSHIP_TYPES": { count: 0, desc: "Duplicate relationship type records exists with name [xyz] in table [cmdb_rel_type] having sys_ids: [abc]" },
    "DUPLICATE_PAYLOAD_RECORDS": { count: 0, desc: "Found duplicate items in the payload (index 0 and 1), using className [xyz] and fields [abc]." },
    "LOCK_TIMEOUT": { count: 0, desc: "Failed to acquire synchronization lock for xyz" },
    "MULTIPLE_DUPLICATE_RECORDS": { count: 0, desc: "Found duplicate records in table [xyz] using fields [abc]" },
    "REQUIRED_ATTRIBUTE_EMPTY": { count: 0, desc: "Missing mandatory field [xyz] in table [abc]. Add input value for mandatory field in payload" },
    "MISSING_DEPENDENCY": { count: 0, desc: "In payload no relations defined for dependent class [xyz] that matches any containment/hosting rules: [abc]." },
    "METADATA_RULE_MISSING": { count: 0, desc: "No containment or hosting rules defined for dependent class [xyz]." },
    "MULTIPLE_DEPENDENCIES": { count: 0, desc: "Found multiple dependent relation items [xyz] and [abc] in payload OR Multiple paths leading to the same destination: xyz -> abc" },
    "ABANDONED": { count: 0, desc: "Abandoning processing payload item 'xyz', since its depends on payload item 'abc' has errors. See Docs site for details." },
    "MULTI_MATCH": { count: 0, desc: "Duplicate dependent records found having relationship [xyz] with same CI (className:[abc], sysId:[def]). See Docs site for details." },
    "QUALIFICATION_LOOP": { count: 0, desc: "Qualification chain has loop that contains relation 'xyz'." },
    "TYPE_CONFLICT_IN_QUALIFICATION": { count: 0, desc: "Invalid payload, qualification chain has multiple possible paths for payload items: 'xyz' and 'abc'" },
    "RECLASSIFICATION_NOT_ALLOWED": { count: 0, desc: "CI Reclassification not allowed from class: [xyz] to [abc]." },
    "DUPLICATE_RELATED_PAYLOAD": { count: 0, desc: "Found duplicate Related items (0 and 1) in the payload index 1 using fields xyz." },
    "DUPLICATE_LOOKUP_PAYLOAD": { count: 0, desc: "Found duplicate Lookup items (0 and 1) in the payload index 1 using fields xyz" },
    "INSERT_NOT_ALLOWED_FOR_SOURCE": { count: 0, desc: "Insert into [xyz] is blocked for data source [abc] by IRE data source rule." }
};

var sysLogQuery = 'sourceSTARTSWITHiden^level=2^source=identification_engine';
var sysLog = new GlideRecord('syslog');
// change me: set the limit or query by date range
sysLog.setLimit(10);
sysLog.addEncodedQuery(sysLogQuery);
sysLog.query();

while (sysLog.next()) {
    Object.keys(ireErrorMessagesObj).forEach(function (key) {
        if (sysLog.message.indexOf(key) > -1) {
            ireErrorMessagesObj[key].count++;
        }
    });
}

out = 'count,error,description\n';
Object.keys(ireErrorMessagesObj).forEach(function (key) {
    if (ireErrorMessagesObj[key].count > 0) {
        out += ireErrorMessagesObj[key].count + ',' + key + ',' + ireErrorMessagesObj[key].desc + '\n';
    }
});

gs.info(out)
