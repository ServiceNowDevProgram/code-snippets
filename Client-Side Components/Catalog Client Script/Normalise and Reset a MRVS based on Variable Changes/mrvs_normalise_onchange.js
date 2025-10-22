function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading) return;

  var MRVS_NAME = 'MY_MRVS';                 // your MRVS variable name
  var COLUMNS_TO_CLEAR = ['env', 'owner'];   // MRVS column names to clear
  var UNIQUE_KEY = 'hostname';               // MRVS column that should be unique
  var SORT_BY = 'hostname';                  // MRVS column to sort by

  try {
    var raw = g_form.getValue(MRVS_NAME);
    var rows = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(rows)) rows = [];

    // Clear specified columns
    rows.forEach(function(row) {
      COLUMNS_TO_CLEAR.forEach(function(col) { if (row.hasOwnProperty(col)) row[col] = ''; });
    });

    // Deduplicate by UNIQUE_KEY
    if (UNIQUE_KEY) {
      var seen = {};
      rows = rows.filter(function(row) {
        var key = String(row[UNIQUE_KEY] || '').toLowerCase();
        if (!key || seen[key]) return false;
        seen[key] = true;
        return true;
      });
    }

    // Sort (case-insensitive)
    if (SORT_BY) {
      rows.sort(function(a, b) {
        var A = String(a[SORT_BY] || '').toLowerCase();
        var B = String(b[SORT_BY] || '').toLowerCase();
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
      });
    }

    g_form.setValue(MRVS_NAME, JSON.stringify(rows));
  } catch (e) {
    console.error('MRVS normalise failed', e);
  }
}
