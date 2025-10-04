var notificationUtil = Class.create();
notificationUtil.prototype = {
    initialize: function () { },

    //Display Multi-Row Variable Set in a table
    formatMRVS: function (current) {

        var headers = getMrvsHeaders(current);
        var values = getMrvsValues(current, headers.length);
        var result = "";
        result += "<head><style>table, th, td {border: 1px solid black; text-align:left;}</style></head>";
        result += '<body><table style="border-collapse: collapse; width:75%"><tbody>';
        result += headers.html; // Print headers
        result += values; // Print values
        result += "</tbody></table></body>";
        return result;
    },

    type: 'notificationUtil'
};

function getMrvsHeaders(gr) {
    var multiVar = new GlideRecord('sc_multi_row_question_answer');
    multiVar.addQuery('parent_id', gr.sys_id.toString());
    multiVar.addQuery('variable_set', '!=', '');
    multiVar.orderBy('row_index');
    multiVar.orderBy('sc_item_option.order');
    multiVar.query();
    var headers = {
        length: 0,
        html: "",
        arr: []
    };
    while (multiVar.next()) {
        if (headers.arr.indexOf(multiVar.item_option_new.getDisplayValue()) === -1) {
            headers.arr.push(multiVar.item_option_new.getDisplayValue());
            headers.html = headers.html + "<th>" + multiVar.item_option_new.getDisplayValue() + "</th>";
            headers.length++;
        }
    }
    headers.html = "<tr>" + headers.html + "</tr>";
    return headers;
}

function getMrvsValues(gr, headerLength) {
    var multiVar = new GlideRecord('sc_multi_row_question_answer');
    multiVar.addQuery('parent_id', gr.sys_id.toString());
    multiVar.addQuery('variable_set', '!=', '');
    multiVar.orderBy('row_index');
    multiVar.orderBy('sc_item_option.order');
    multiVar.query();
    var values = [];
    while (multiVar.next()) {
        values.push(getDisplayValue(multiVar.value.toString(), multiVar.item_option_new));
    }
    var result = "";
    for (var i = 0; i < values.length; i++) {
        result += i % headerLength == 0 ? "<tr><td> " + values[i] + " </td>" : "<td> " + values[i] + " </td></tr>";
    }
    return result;
}

function getDisplayValue(rawValue, question) {
    var varType = question.type.toString(), varRefTable = question.reference.toString();
    if (varType == 8) { // Type == Reference

        var gr = new GlideRecord(varRefTable);
        gr.get(rawValue);

        return gr.getDisplayValue();
    }

    else if (varType == 3 || varType == 5) { // Type == Multiple Choice or Select Box

        var variableName = question.name.toString();
        var questionID = question.sys_id.toString();

        var qc = new GlideRecord("question_choice");
        qc.addQuery("question", questionID);
        qc.addQuery("value", rawValue);
        qc.query();

        if (qc.next()) {
            return qc.text;
        }
    } else {
        return rawValue;
    }
}