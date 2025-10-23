function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading) return;

  var MRVS_NAME = 'MY_MRVS';
  var COLUMNS_TO_CLEAR = ['env', 'region'];

  var rows = [];
  try { rows = JSON.parse(g_form.getValue(MRVS_NAME) || '[]'); } catch (e) {}
  if (!Array.isArray(rows)) rows = [];

  rows.forEach(function(row) {
    COLUMNS_TO_CLEAR.forEach(function(col) { if (row.hasOwnProperty(col)) row[col] = ''; });
  });

  g_form.setValue(MRVS_NAME, JSON.stringify(rows));
}

