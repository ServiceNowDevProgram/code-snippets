function cancel() {
    GlideDialogWindow.get().destroy();
	return false;

}

function actionOK() {
    var emp = gel('quicksearch_assign').value;
    var doc = gel('quicksearch_doc').value;
    var cas = gel('quicksearch_case').value;
    var eid = gel('quicksearch_emp').value;
    //alert(emp);    

}
