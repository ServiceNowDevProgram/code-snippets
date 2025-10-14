Start a flow asynchronously from Workflow Studio using a business rule.
  sn_fd.FlowAPI.getRunner().flow('global.flowName').inBackground().withInputs(inputs).run();
