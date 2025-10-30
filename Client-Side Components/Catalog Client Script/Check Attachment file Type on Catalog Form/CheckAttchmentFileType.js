function onSubmit() {
    var arr = [];
    var extension1 = '.txt';
    var extension2 = '.pdf';
    var extension3 = '.docx';
    var names = this.document.getElementsByClassName('get-attachment ng-binding ng-scope');
    for (var i = 0; i < names.length; i++) {
        var val = names[i].innerHTML;
        arr.push(val.toString());
    }

    var countRequired = 1;
    if (window == null) {
        if (this.document.getElementsByClassName('get-attachment').length != countRequired) {
            g_form.addErrorMessage('You can add only one attachment');
            return false;
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if ((arr[j].indexOf(extension1) > -1) || (arr[j].indexOf(extension2) > -1) || (arr[j].indexOf(extension3) > -1)) {
            return true;
        } else {
            g_form.addErrorMessage('Unsupported file format. Please attach files with extensions .txt, .pdf, .doc');
            return false;
        }

    }

}