/**
 * ATF step "Run Server Side Script" (Jasmine 3.1).
 *
 * Checks that the identification rules for computers still behave as expected:
 * the same device sent twice, or sent again under a new name, must not become a second CI.
 * Run it after upgrades and after changes to identification rules.
 *
 * ATF rolls back the CIs created during the test.
 */
(function (outputs, steps, params, stepResult, assertEqual) {

    // must be a choice value of cmdb_ci.discovery_source
    var DATA_SOURCE = 'ServiceNow';
    var CLASS_NAME = 'cmdb_ci_computer';

    function sendToIre(values) {
        var payload = { items: [{ className: CLASS_NAME, values: values }] };
        var output = JSON.parse(sn_cmdb.IdentificationEngine.createOrUpdateCI(DATA_SOURCE, JSON.stringify(payload)));
        return output.items[0];
    }

    function countBySerial(serial) {
        var ga = new GlideAggregate(CLASS_NAME);
        ga.addQuery('serial_number', serial);
        ga.addAggregate('COUNT');
        ga.query();
        return ga.next() ? parseInt(ga.getAggregate('COUNT'), 10) : 0;
    }

    describe('IRE identification for ' + CLASS_NAME, function () {

        it('creates one CI when the same computer is sent twice', function () {
            var first = sendToIre({ name: 'ATF-IRE-NB-01', serial_number: 'ATFIRE0001' });
            var second = sendToIre({ name: 'ATF-IRE-NB-01', serial_number: 'ATFIRE0001' });

            expect(first.operation).toBe('INSERT');
            expect(['UPDATE', 'NO_CHANGE']).toContain(second.operation);
            expect(second.sysId).toBe(first.sysId);
            expect(countBySerial('ATFIRE0001')).toBe(1);
        });

        it('finds the computer by serial number after it was renamed', function () {
            var first = sendToIre({ name: 'ATF-IRE-NB-02', serial_number: 'ATFIRE0002' });
            var renamed = sendToIre({ name: 'ATF-IRE-NB-02-NEW', serial_number: 'ATFIRE0002' });

            expect(renamed.sysId).toBe(first.sysId);
            expect(countBySerial('ATFIRE0002')).toBe(1);
        });

        it('creates a second CI for a different serial number', function () {
            var first = sendToIre({ name: 'ATF-IRE-NB-03', serial_number: 'ATFIRE0003' });
            var other = sendToIre({ name: 'ATF-IRE-NB-04', serial_number: 'ATFIRE0004' });

            expect(other.operation).toBe('INSERT');
            expect(other.sysId).not.toBe(first.sysId);
        });

        it('rejects a computer without any identifying attribute', function () {
            var result = sendToIre({ asset_tag: 'ATF-IRE-TAG-05', short_description: 'no name, serial or MAC address' });
            var codes = (result.errors || []).map(function (e) {
                return e.error;
            });

            expect(codes).toContain('MISSING_MATCHING_ATTRIBUTES');
        });
    });

})(outputs, steps, params, stepResult, assertEqual);

jasmine.getEnv().execute();
