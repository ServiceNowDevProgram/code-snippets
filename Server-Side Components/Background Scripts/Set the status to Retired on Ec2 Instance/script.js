//This Script is used to check if the state is terminated then we will set the Install status to retired of Ec2 Instances(CI's)

var gr = new GlideRecord("cmdb_ci_ec2_instance");
gr.addEncodedQuery('state=terminated^install_status!=7');
gr.orderByDesc('name');
gr.setLimit(10000);
gr.query();
while (gr.next()){
gr.install_status = "7";
  //install_status attribute will be set to "7" which of retired
gr.autoSysField(false);
gr.setWorkflow(false);
gr.update();
}
