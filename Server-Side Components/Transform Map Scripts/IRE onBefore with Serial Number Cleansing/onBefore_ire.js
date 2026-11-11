/**
 * onBefore transform script: send each import row through the IRE.
 *
 * Transform map: source = your staging table, target = the CI class (here cmdb_ci_computer).
 * The transform map itself writes nothing (ignore = true). The IRE decides whether the
 * row is a new CI or an existing one and applies the reconciliation rules.
 *
 * Before the row goes to the IRE, the serial number is cleansed (see SerialNumberCleanser.js).
 * A placeholder such as "To be filled by O.E.M." is dropped instead of being sent, because
 * the IRE would otherwise match every device with that placeholder to the same CI.
 *
 * The outcome (operation, sys_id, errors) is written to the import row comment, so the
 * import log shows per row what happened.
 */
(function runTransformScript(source, map, log, target) {

    // Must be a choice value of cmdb_ci.discovery_source
    var DATA_SOURCE = 'ServiceNow';
    var CLASS_NAME = 'cmdb_ci_computer';

    // staging column -> CI field
    var FIELDS = {
        u_name: 'name',
        u_asset_tag: 'asset_tag',
        u_mac_address: 'mac_address',
        u_ip_address: 'ip_address'
    };

    var values = {};
    for (var column in FIELDS) {
        var value = String(source.getValue(column) || '').trim();
        if (value) {
            values[FIELDS[column]] = value;
        }
    }

    var notes = [];
    var rawSerial = source.getValue('u_serial_number');
    var serial = new SerialNumberCleanser().cleanse(rawSerial);
    if (serial) {
        values.serial_number = serial;
    } else if (rawSerial) {
        notes.push('serial number "' + rawSerial + '" ignored (placeholder)');
    }

    var item = {
        className: CLASS_NAME,
        values: values
    };

    // With a stable key from the source system, the next import finds the CI by this key first
    var sourceKey = String(source.getValue('u_source_id') || '').trim();
    if (sourceKey) {
        item.sys_object_source_info = {
            source_name: DATA_SOURCE,
            source_native_key: sourceKey
        };
    }

    var output = JSON.parse(sn_cmdb.IdentificationEngine.createOrUpdateCI(DATA_SOURCE, JSON.stringify({ items: [item] })));
    var result = output.items[0];

    var errors = (result.errors || []).map(function (e) {
        return e.error + ': ' + e.message;
    });

    source.sys_import_state_comment = 'IRE ' + (result.operation ? result.operation + ' ' + result.sysId : 'ERROR') +
        (notes.length ? ' | ' + notes.join('; ') : '') +
        (errors.length ? ' | ' + errors.join('; ') : '');

    if (errors.length) {
        error = true;
        error_message = errors.join('; ');
        log.error('IRE: ' + error_message);
    } else {
        // the IRE has written the CI, the transform map must not write it again
        ignore = true;
    }

})(source, map, log, target);
