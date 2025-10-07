function onChange(control, oldValue, newValue, isLoading) {
  g_form.getReference("requested_for", function (gr) {
    g_form.setValue("department", gr.department);
    g_form.setValue("email", gr.email);
    g_form.setValue("phone", gr.phone);
  });
}
