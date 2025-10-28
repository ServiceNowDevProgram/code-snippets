function setAttachmentMandatory(isMandatory) {

    var isSuccess = false;
    
    try {
        angular.element("#sc_cat_item").scope().c.data.sc_cat_item.mandatory_attachment = isMandatory;
        isSuccess = true;
    } catch (e) {
        console.log('setAttachmentMandatory() failed: ' + e);
    }

    return isSuccess;
}