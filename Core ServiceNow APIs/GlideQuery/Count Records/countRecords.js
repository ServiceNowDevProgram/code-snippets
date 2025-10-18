(function() {
  var openCount = new GlideQuery('incident')
      .where('active' true)
      .count();
  gs.info('Open Incidents: ' + openCount):
})();
