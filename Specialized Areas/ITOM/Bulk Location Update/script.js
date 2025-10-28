function convertIPtoNumber(ip){
    return ip.split('.').reduce(function(ipInt, octet) { return (ipInt * 256) + parseInt(octet, 10);}, 0);
}

var locationIps = {};
var locationInfo = {};
var hash = {};

// 'cmdb_ci_ip_network_subnet' contains the subnet data along with location of the subnet
var grLocation = new GlideRecord('cmdb_ci_ip_network_subnet');
grLocation.query();
while(grLocation.next()){
	var location = grLocation.location.toString();
	var hashKey = grLocation.u_starting_ip.toString()+":"+grLocation.u_ending_ip.toString();
	hash[hashKey] = [convertIPtoNumber(grLocation.u_starting_ip.toString()),convertIPtoNumber(grLocation.u_ending_ip.toString())];
	locationIps[hashKey] = location;
	if(!locationInfo.hasOwnProperty(location)){
		locationInfo[location] = [];
	}
}


gs.include('j2js');
var ciClassesProperty = gs.getProperty('nonDiscovery.location.update').split(','); // This property contains the CI classes for which all the classes which are extending from the mentioned classes get the location updated. Ex: cmdb_ci_server, cmdb_ci_rubrik_node,etc.
var ciClasses = [];
var arrUtils = new ArrayUtil();
for(var ip in ciClassesProperty){
	var tableUtil = new TableUtils(ciClassesProperty[ip]);
    arrUtils.push(ciClassesProperty[ip]);
	arrUtils.concat(ciClasses,j2js(tableUtil.getTableExtensions()));
}

var ciLocationData = new GlideRecord('cmdb_ci');
ciLocationData.addEncodedQuery('sys_class_nameIN'+ciClasses.toString()+'^locationISEMPTY^ip_addressISNOTEMPTY^install_status!=7^operational_status!=2');
ciLocationData.query();
var ipDict = {};
while(ciLocationData.next()){
	var ciIp = ciLocationData.ip_address.toString();
	var ciInt = convertIPtoNumber(ciIp);
	ipDict[ciInt] = ciIp;
}

for(var ipVal in ipDict){
	for(var ipKey in hash){
		var ips = hash[ipKey];
		if(ips[0] <= ipVal && ipVal <= ips[1]){
			locationInfo[locationIps[ipKey]].push(ipDict[ipVal]);
			break;
		}
	}
}

for(var locationKey in locationInfo){
	var ciUpdate = new GlideRecord('cmdb_ci');
	ciUpdate.addEncodedQuery('sys_class_nameIN'+ciClasses.toString()+'^locationISEMPTY^install_status!=7^operational_status!=2^ip_addressIN'+locationInfo[locationKey].toString());
	ciUpdate.query();
	ciUpdate.setValue('location',locationKey);
	ciUpdate.setWorkflow(false);
	ciUpdate.updateMultiple();
}