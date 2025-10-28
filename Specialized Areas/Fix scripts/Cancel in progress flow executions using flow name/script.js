var gr = new GlideRecord("sys_flow_context"); 
gr.addQuery("name", "NAME OF FLOW TO CANCEL HERE"); //Replace "NAME OF FLOW TO CANCEL HERE" with the name of the flow which you need to cancel
gr.query(); 
while (gr.next()) { 
sn_fd.FlowAPI.cancel(gr.getUniqueValue(), 'Canceling In progress Flows'); 
} 
