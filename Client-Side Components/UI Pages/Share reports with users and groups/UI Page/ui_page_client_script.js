function onCancel() {
    var c = gel('cancelled');
    c.value = "true";
    GlideModal.get().destroy();
    return false;
}

function onSubmit() {
    return true;
}
