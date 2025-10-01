function onCancel() {
    GlideDialogWindow.get().destroy();
    return false;
}
fetchlastcomment();

function fetchlastcomment() {
    var gdw = GlideDialogWindow.get(); // attempting to get the sys_id value
    var sys_id = gdw.getPreference('incid'); // attempting to get the sys_id value
    var ga = new GlideAjax('global.UpdateINCworkNotes');
    ga.addParam('sysparm_name', 'getIncLastWorknotes');
    ga.addParam('sysparm_id', sys_id);

    ga.getXMLAnswer(callback);

    function callback(answer) {
        if (answer) {
            document.getElementById('commenttext').value = answer;
        } else {
            document.getElementById('commenttext').value = '';
        }
    }

}

function onSubmit() {
    var gdw = GlideDialogWindow.get(); // attempting to get the sys_id value
    var sys_id = gdw.getPreference('incid'); // attempting to get the sys_id value
    var ga = new GlideAjax('global.UpdateINCworkNotes');
    ga.addParam('sysparm_name', 'updateCommentsLatest');
    ga.addParam('sysparm_id', sys_id);
    ga.addParam('sysparm_newcomment',  document.getElementById('commenttext').value);

    ga.getXMLAnswer(callback);

    function callback(answer) {
       	window.location.reload();
    }
    GlideDialogWindow.get().destroy();
    return false;
}
