/**
 * Background script / scheduled script: find hardware assets whose CI status does not match.
 *
 * ServiceNow keeps alm_hardware.install_status and cmdb_ci.install_status in sync through the
 * mapping in alm_asset_ci_state_mapping. Updates that skip business rules (setWorkflow(false),
 * some imports and integrations) break that sync without anyone noticing.
 *
 * The script reads the active mapping (direction "asset_to_ci" or "both"), groups all assets with a
 * CI by asset status, substatus and CI status in one GlideAggregate query, and reports every
 * combination where the CI status is not the one the mapping expects. Read only, it changes nothing.
 */
(function findAssetCiStatusDrift() {

    var ASSET_TABLE = 'alm_hardware';
    var EXTRA_QUERY = ''; // eg. 'company.name=ACME' to check one company only
    var SAMPLES = 5;

    // asset status + substatus -> expected CI install_status
    var expected = {};
    var map = new GlideRecord('alm_asset_ci_state_mapping');
    map.addActiveQuery();
    map.addQuery('synch_direction', 'IN', 'asset_to_ci,both');
    map.query();
    while (map.next()) {
        expected[map.getValue('asset_state') + '|' + (map.getValue('asset_substate') || '')] = map.getValue('configuration_item_status') || '';
    }

    function expectedCiStatus(state, substate) {
        var key = state + '|' + (substate || '');
        if (expected.hasOwnProperty(key)) {
            return expected[key];
        }
        // mapping rows without substate apply to all substates
        return expected.hasOwnProperty(state + '|') ? expected[state + '|'] : null;
    }

    // display value of a choice, with the value, eg. "In use (1)"
    function label(table, values, field) {
        if (!values[field]) {
            return '(empty)';
        }
        var gr = new GlideRecord(table);
        gr.initialize();
        for (var name in values) {
            gr.setValue(name, values[name]);
        }
        return gr.getDisplayValue(field) + ' (' + values[field] + ')';
    }

    var ga = new GlideAggregate(ASSET_TABLE);
    ga.addNotNullQuery('ci');
    if (EXTRA_QUERY) {
        ga.addEncodedQuery(EXTRA_QUERY);
    }
    ga.groupBy('install_status');
    ga.groupBy('substatus');
    ga.groupBy('ci.install_status');
    ga.addAggregate('COUNT');
    ga.query();

    var checked = 0;
    var drifted = 0;
    var unmapped = 0;
    var lines = [];

    while (ga.next()) {
        var state = ga.getValue('install_status');
        var substate = ga.getValue('substatus');
        var ciStatus = ga.getValue('ci.install_status') || '';
        var count = parseInt(ga.getAggregate('COUNT'), 10);
        var want = expectedCiStatus(state, substate);
        checked += count;

        if (want === null) {
            unmapped += count;
            continue;
        }
        if (want === '' || want === ciStatus) {
            continue;
        }

        drifted += count;

        var sample = new GlideRecord(ASSET_TABLE);
        sample.addNotNullQuery('ci');
        if (EXTRA_QUERY) {
            sample.addEncodedQuery(EXTRA_QUERY);
        }
        sample.addQuery('install_status', state);
        if (substate) {
            sample.addQuery('substatus', substate);
        } else {
            sample.addNullQuery('substatus');
        }
        if (ciStatus) {
            sample.addQuery('ci.install_status', ciStatus);
        } else {
            sample.addNullQuery('ci.install_status');
        }
        sample.setLimit(SAMPLES);
        sample.query();
        var tags = [];
        while (sample.next()) {
            tags.push(sample.getValue('asset_tag') || sample.getUniqueValue());
        }

        var assetValues = { install_status: state, substatus: substate };
        lines.push(count + ' x asset ' + label(ASSET_TABLE, assetValues, 'install_status') +
            (substate ? ' / ' + label(ASSET_TABLE, assetValues, 'substatus') : '') +
            ': CI is ' + label('cmdb_ci', { install_status: ciStatus }, 'install_status') +
            ', expected ' + label('cmdb_ci', { install_status: want }, 'install_status') +
            ' | eg. ' + tags.join(', '));
    }

    gs.info('Asset/CI status drift on ' + ASSET_TABLE + ': ' + checked + ' assets with CI checked, ' +
        drifted + ' with a CI status that does not match the mapping, ' + unmapped + ' with a status that has no mapping.\n' +
        lines.join('\n'));
})();
