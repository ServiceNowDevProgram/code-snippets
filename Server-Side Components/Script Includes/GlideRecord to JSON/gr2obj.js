var gr2obj = Class.create();
/**
 * A function to convert a glide record to a JSON object
 * @param {GlideRecord} gr
 * @out {Object}
 */
gr2obj = function(gr) {
    // Get the GlideRecord's array of fields
    var fieldArr = new GlideRecordUtil().getFields(gr);
    fieldArr.sort();
    var recordObj = {};
    // For each field get the value
    for (var field in fieldArr) {
        // For a 'boolean' or a 'journal_input' field type, get the display value
        var type = gr.getElement(fieldArr[field]).getED().getInternalType();
        if (type == 'boolean' || type == 'journal_input') {
            recordObj[fieldArr[field]] = gr.getDisplayValue(fieldArr[field]);
        } else if (type == 'reference' && gr.getValue(fieldArr[field])) {
            recordObj[fieldArr[field]] = gr.getDisplayValue(fieldArr[field]);
            // if reference field sys_id is needed, uncomment the next line
            // recordObj[fieldArr[field]] = gr.getValue(fieldArr[field]);
        } else {
            recordObj[fieldArr[field]] = gr.getValue(fieldArr[field]);
        }
    }
    return recordObj;
};