if (!current.cat_item.flow_designer_flow.nil() && !current.flow_context.nil()) {
    sn_fd.FlowAPI.cancel(current.flow_context.sys_id.toString(), 'Cancelling Flow');
    var inputs = {
        "request_item": current
    };
    var flowName = current.cat_item.flow_designer_flow.sys_scope.scope.toString() + "." + current.cat_item.flow_designer_flow.internal_name.toString();
    var newContext = sn_fd.FlowAPI.startFlow(flowName, inputs);
    current.flow_context = newContext;
}

current.update();
