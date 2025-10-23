function cancelRunningFlows() {

  try {
    var grFlowExecution = new GlideRecord("sys_flow_context");
    grFlowExecution.addQuery("source_record", current.sys_id);
    grFlowExecution.query();

    while (grFlowExecution.next()) {
      sn_fd.FlowAPI.cancel(grFlowExecution.getUniqueValue(), "Canceling Flows");
    }
  } catch (error) {
    gs.error("Error cancelling flows: " + error.message);
  }
}


