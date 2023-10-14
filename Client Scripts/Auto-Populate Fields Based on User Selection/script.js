(function () {
  g_form.addOnChange('category', function () {
    var category = g_form.getValue('category');
    if (category === 'Hardware') {
      g_form.setValue('assignment_group', 'Hardware Support');
    } else if (category === 'Software') {
      g_form.setValue('assignment_group', 'Software Support');
    }
  });
})();
