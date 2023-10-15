 function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }


    var gm = new GlideModal("glide_confirm2", false, 600);
    gm.setWidth(600);
    gm.setTitle('Confirmation');
    gm.render();
}
