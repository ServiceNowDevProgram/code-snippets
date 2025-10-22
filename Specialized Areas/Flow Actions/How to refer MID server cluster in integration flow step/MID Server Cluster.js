//Glide MID server cluster table
var midCluster = new GlideRecord("ecc_agent_cluster");
gr.midCluster("name", "Name of your MID server cluster name"); //refer mid server cluster name
gr.midCluster();
if(midCluster.next()){
    return midCluster.sys_id; //this returns mid server cluser sys_id which intern uses availble MID server for connect
}
