function onChange(control, oldValue, newValue, isLoading) {
  g_form.getReference("requested_for", function (gr) {
    g_form.setValue("location", gr.location);
  });
}
