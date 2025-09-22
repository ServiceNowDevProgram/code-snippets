answer = (function transformEntry(source) {

    var grServer = new GlideRecord('cmdb_ci_server');

    if (source.u_mac_address != '' && grServer.get('mac_address', source.u_mac_address)) {
        return grServer.sys_id;
    } else if (source.u_serial_number != '' && grServer.get('serial_number', source.u_serial_number)) {
        return grServer.sys_id;
    } else if (source.u_name != '' && grServer.get('name', source.u_name)) {
        return grServer.sys_id;
    } else {
        // No match. Create a new record
        return -1;
    }

})(source);
