var randomNumberGenerator = Math.floor(Math.random() * (10000 - 1) + 1);
var regionSelect = '<select_one_of_the_regions_based_on_mid_cluster>';
var ip_list = '';   // all IP addresses which needs to be added to discovery schedule in a comma-separated fashion.

var midCluster = {      // Add more clusters based on region if required, I have taken example where there are 4 regions like europe, asia, norwalk, las vegas, etc.
    'europe': gs.getProperty('discover.europe.cluster'),
    'norwalk': gs.getProperty('discover.norwalk.cluster'),
    'las_vegas': gs.getProperty('discover.las_vegas.cluster'),
    'asia': gs.getProperty('discover.asia.cluster')
};

var gds = new GlideRecord('discovery_schedule');
gds.initialize();
gds.name = randomNumberGenerator.toString();
gds.discover = 'CIs';
gds.run_as = JSON.parse(gs.getProperty('discover.mid_user'))[midCluster[regionSelect.toString()]];
gds.active = true;
gds.mid_select_method = 'specific_cluster';
gds.mid_cluster = midCluster[regionSelect.toString()];
gds.disco_run_type = 'on_demand';
gds.shazzam_batch_size = 1000;
gds.shazzam_cluster_support = true;
gds.use_snmp_version = 'all';
var discovery_schedule_id = gds.insert();


var gdi = new GlideRecord('discovery_range_item');
gdi.initialize();
gdi.name = randomNumberGenerator.toString() + '-' + regionSelect.toString();
gdi.active = true;
gdi.type = 'IP Address List';
gdi.schedule = discovery_schedule_id;
var discovery_range_set = gdi.insert();


var ipItems = [];
var grIp = new GlideRecord('discovery_range_item_ip');
var ips = ip_list;
var ip_list = ips.split(',');
for (var i = 0; i < ip_list.length; i++) {
    grIp.initialize();
    grIp.item_parent = discovery_range_set;
    grIp.ip_address = ip_list[i];
    var itemUniqVal = grIp.insert();
    ipItems.push(itemUniqVal.toString());
}

var discoverGr = new GlideRecord('discovery_schedule');
discoverGr.addEncodedQuery('sys_id=' + discovery_schedule_id);
discoverGr.query();
var discoveryStatus = '';
if (discoverGr.next()) {
    var discovery = new global.Discovery();
    discoveryStatus = discovery.discoverNow(discoverGr);
}

