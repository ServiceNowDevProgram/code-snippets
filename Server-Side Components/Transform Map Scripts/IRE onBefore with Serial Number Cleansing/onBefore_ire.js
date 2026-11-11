/**
 * onBefore transform script: send each import row through the IRE.
 *
 * Transform map: source = your staging table, target = the CI class (here cmdb_ci_computer).
 * The IRE decides whether the row is a new CI or an existing one and applies the
 * reconciliation rules. The transform map itself writes nothing.
 *
 * Before the row goes to the IRE, the serial number is cleansed (see SerialNumberCleanser.js).
 * A placeholder such as "To be filled by O.E.M." is dropped instead of being sent, so that
 * devices are not identified as the same CI only because they share the placeholder.
 *
 * The outcome (operation, sys_id, errors) is written to the import row comment, and errors
 * also to the import log.
 */
(function runTransformScript(source, map, log, target) {

    // Set first, so the transform map never writes the row itself, even if something below fails.
    // Do not use error = true for a single bad row: in an onBefore script it halts the
    // transformation of the whole import set, while ignore = true only skips the current row.
    ignore = true;

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
    var SERIAL_COLUMN = 'u_serial_number';
    // optional: a stable key from the source system
    var SOURCE_KEY_COLUMN = 'u_source_id';

    var row = source.getValue('sys_import_row');
    var comment;

    try {
        var values = {};
        for (var column in FIELDS) {
            var value = String(source.getValue(column) || '').trim();
            if (value) {
                values[FIELDS[column]] = value;
            }
        }

        var notes = [];
        var rawSerial = source.getValue(SERIAL_COLUMN);
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
        var sourceKey = String(source.getValue(SOURCE_KEY_COLUMN) || '').trim();
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

        comment = 'IRE ' + (result.operation ? result.operation + ' ' + result.sysId : 'ERROR') +
            (notes.length ? ' | ' + notes.join('; ') : '') +
            (errors.length ? ' | ' + errors.join('; ') : '');

        if (errors.length) {
            log.error('Row ' + row + ': IRE ' + errors.join('; '));
        }
    } catch (e) {
        comment = 'IRE ERROR | ' + e;
        log.error('Row ' + row + ': ' + e);
    }

    source.sys_import_state_comment = comment;

})(source, map, log, target);
