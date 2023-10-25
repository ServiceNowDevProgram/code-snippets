var incGr = new GlideRecord("incident");
 incGr.addActiveQuery();
 incGr.Query();
 while(incGr.next()) {
        incGr.incident_state.setValue(IncidentState.CLOSED); // close all active incident
        incGr.active.setValue(true);
        incGr.update();
}
