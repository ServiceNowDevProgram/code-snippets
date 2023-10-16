var flag = 0; //initial flag to 0
  var glideCluster = new GlideRecord('ecc_agent_cluster_member_m2m'); //m2m table stores cluser and all the midserver relation
  glideCluster.addQuery('cluster', "sys_id of the cluster"); //replace "sys_id of the cluster" with sys_id of the MID server cluster
  glideCluster.query();
  while(glideCluster.next()){
    if(glideCluster.agent.status=='Up'){
      outputs.flag = 1;  //if any one MID server is up proceed next step in the integration
      break;
    }
    //else returns 0 and no MID server are up inside the cluster, abort integration logic and report to the concerened team.
