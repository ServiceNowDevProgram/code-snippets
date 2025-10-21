// Background Script usage example for RestGetWithBackoff
(function() {
  var helper = new RestGetWithBackoff();
  var data = helper.getAll({
    endpoint: 'https://api.example.com/v1/things?limit=100',
    headers: { 'Authorization': 'Bearer ${token}' },
    maxRetries: 4,
    baseDelayMs: 750
  });
  gs.info('Fetched ' + data.length + ' items total');
})();
