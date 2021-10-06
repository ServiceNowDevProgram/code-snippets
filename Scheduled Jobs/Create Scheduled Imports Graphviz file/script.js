// Create Scheduled Imports Graphviz file

function get_dotItem(id, name, style) {
    var return_string = '';
    return_string += '"' + id + '"';
    return_string += ' [label="' + name + '"';
    if (style) {
        return_string += ' style="' + style + '"';
    }
    return_string += ']';
    return return_string;
}

function print_dotFile(itemsandrelations) {
    var standard_options =
        ' \
        graph [ \
        # rankdir = "LR" \
        ]; \
        node [ \
         fontsize = "10" \
         shape = "box" \
         fixedsize = false \
         width=1.8 \
        ];';

    return 'digraph g {' + standard_options + '\n' + itemsandrelations + '}';
}

function get_dotRelation(parent_id, child_id) {
    return '"' + child_id + '"->"' + parent_id + '"';
}

var grSIS = new GlideRecord('scheduled_import_set');
//grSIS.addEncodedQuery("active=true");
//grSIS.addEncodedQuery("nameLIKEcmdb");
grSIS.orderBy('run_time');
grSIS.setLimit(100);
grSIS.query();
var dotfile_content = '';
while (grSIS.next()) {
    if (grSIS.getValue('active') == true) {
        dotfile_content += get_dotItem(grSIS.getValue('sys_id'), grSIS.getValue('name')) + "\n";
    } else {
        dotfile_content += get_dotItem(grSIS.getValue('sys_id'), grSIS.getValue('name'), "dotted") + "\n";
    }
    if (grSIS.getValue('parent')) {
        dotfile_content += get_dotRelation(grSIS.getValue('sys_id'), grSIS.getValue('parent')) + "\n";
    }
}

gs.info('Graphviz File:\n' + print_dotFile(dotfile_content));
