/**
 * Executes a business rule to find duplicate execution orders in ATF.
 * @Table sys_atf_test
 * @param {GlideRecord} current - The current GlideRecord object.
 * @param {GlideRecord} previous - The previous GlideRecord object. (null when async)
 * @returns {undefined}
 */

(function executeRule(current, previous /*null when async*/) {
var order_array = testDuplicateTestStepExectionOrder(current.sys_id);

if (order_array.length > 0)
	gs.addErrorMessage('WARNING: Test steps with duplicate Execution order: [' + order_array + '].');

})(current, previous);


/**
 * Returns an array of active tests that have at least two active test steps with the same execution order.
 * @param {string} testSysId - The sys_id of the test.
 * @returns {Array} An array of sys_ids or order numbers.
 */

function testDuplicateTestStepExectionOrder (testSysId) {

	//if tests_sys_id has a value then return itself if the test fails
	var result = [];

	var ga = new GlideAggregate('sys_atf_step');

	if (test_sys_id)
		ga.addQuery('test.sys_id', test_sys_id);

	ga.addQuery('active', 'true');

	ga.addAggregate('COUNT');

	ga.groupBy('test');
	ga.groupBy('order');

	ga.query();

	while (ga.next()) {
		if (ga.getAggregate('COUNT') > 1)
			if (test_sys_id)
				result.push(ga.getValue('order'));
			else
				result.push(ga.getValue('test'));
	}

	return result;

}
