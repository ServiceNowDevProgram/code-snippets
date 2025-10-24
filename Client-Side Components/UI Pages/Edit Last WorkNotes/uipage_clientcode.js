fetchLastComment();

function closeDialog() {
    GlideDialogWindow.get().destroy();
    return false;
}

function fetchLastComment() {
    var dialogWindow = GlideDialogWindow.get();
    var incidentSysId = dialogWindow.getPreference('incid');
    var glideAjax = new GlideAjax('UpdateINCworkNotes');
    glideAjax.addParam('sysparm_name', 'getIncLastWorknotes');
    glideAjax.addParam('sysparm_id', incidentSysId);
    glideAjax.getXMLAnswer(setCommentFieldValue);
}

function setCommentFieldValue(answer) {
    var commentField = document.getElementById('commenttext');
    if (commentField) {
        commentField.value = answer || '';
    }
}

function submitComment() {
    var dialogWindow = GlideDialogWindow.get();
    var incidentSysId = dialogWindow.getPreference('incid');
    var newCommentText = document.getElementById('commenttext').value;

    var glideAjax = new GlideAjax('UpdateINCworkNotes');
    glideAjax.addParam('sysparm_name', 'updateCommentsLatest');
    glideAjax.addParam('sysparm_id', incidentSysId);
    glideAjax.addParam('sysparm_newcomment', newCommentText);

    glideAjax.getXMLAnswer(handleSuccessfulSubmit);
    closeDialog();
}

function handleSuccessfulSubmit(answer) {
    window.location.reload();
}
