/**
 * Async/Await and Promises in ServiceNow ECMAScript 2021
 *
 * This example demonstrates how to use async/await and Promises in ServiceNow
 * server-side scripts. These features make asynchronous code more readable and
 * easier to manage compared to traditional callback patterns.
 *
 * Note: This requires ECMAScript 2021 mode enabled on your scoped application.
 */

// Example 1: Basic Promise
(function executeRule(current, previous /*null when async*/) {

    // Creating a simple promise that resolves after checking incident count
    function getIncidentCount() {
        return new Promise((resolve, reject) => {
            try {
                var inc_gr = new GlideRecord('incident');
                inc_gr.addQuery('active', true);
                inc_gr.query();
                var count = inc_gr.getRowCount();
                resolve(count);
            } catch (error) {
                reject('Error fetching incidents: ' + error);
            }
        });
    }

    // Using the promise with .then()
    getIncidentCount()
        .then(count => {
            current.work_notes = 'Total active incidents: ' + count;
        })
        .catch(error => {
            gs.error(error);
        });

})(current, previous);


// Example 2: Async/Await - Much cleaner syntax
(function executeRule(current, previous /*null when async*/) {

    // Helper function to get incident data asynchronously
    async function fetchIncidentData(incidentNumber) {
        return new Promise((resolve, reject) => {
            var inc_gr = new GlideRecord('incident');
            if (inc_gr.get('number', incidentNumber)) {
                resolve({
                    number: inc_gr.getValue('number'),
                    short_description: inc_gr.getValue('short_description'),
                    priority: inc_gr.getValue('priority'),
                    state: inc_gr.getValue('state')
                });
            } else {
                reject('Incident not found: ' + incidentNumber);
            }
        });
    }

    // Using async/await for cleaner code
    async function processIncident() {
        try {
            const incident = await fetchIncidentData(current.getValue('number'));
            current.work_notes = 'Processed: ' + incident.short_description;
        } catch (error) {
            gs.error(error);
            current.work_notes = 'Error processing incident';
        }
    }

    processIncident();

})(current, previous);


// Example 3: Multiple Async Operations with Promise.all()
(function executeRule(current, previous /*null when async*/) {

    // Function to get count by state
    function getIncidentsByState(state) {
        return new Promise((resolve) => {
            var inc_gr = new GlideRecord('incident');
            inc_gr.addQuery('state', state);
            inc_gr.query();
            resolve({
                state: state,
                count: inc_gr.getRowCount()
            });
        });
    }

    // Execute multiple queries in parallel
    async function getStatistics() {
        try {
            const results = await Promise.all([
                getIncidentsByState('1'), // New
                getIncidentsByState('2'), // In Progress
                getIncidentsByState('6')  // Resolved
            ]);

            let summary = results.map(r =>
                `State ${r.state}: ${r.count} incidents`
            ).join('\n');

            current.work_notes = 'Incident Statistics:\n' + summary;
        } catch (error) {
            gs.error('Error fetching statistics: ' + error);
        }
    }

    getStatistics();

})(current, previous);


// Example 4: Sequential Async Operations
(function executeRule(current, previous /*null when async*/) {

    // Simulating API calls or time-consuming operations
    async function step1() {
        return new Promise((resolve) => {
            // Simulate getting user info
            var user_gr = new GlideRecord('sys_user');
            if (user_gr.get(current.getValue('caller_id'))) {
                resolve('User: ' + user_gr.getValue('name'));
            }
        });
    }

    async function step2(userInfo) {
        return new Promise((resolve) => {
            // Simulate getting assignment group
            var group_gr = new GlideRecord('sys_user_group');
            if (group_gr.get(current.getValue('assignment_group'))) {
                resolve(userInfo + '\nGroup: ' + group_gr.getValue('name'));
            }
        });
    }

    async function step3(previousInfo) {
        return new Promise((resolve) => {
            // Simulate getting related incidents
            var inc_gr = new GlideRecord('incident');
            inc_gr.addQuery('caller_id', current.getValue('caller_id'));
            inc_gr.addQuery('sys_id', '!=', current.getValue('sys_id'));
            inc_gr.query();
            resolve(previousInfo + '\nRelated incidents: ' + inc_gr.getRowCount());
        });
    }

    // Execute steps sequentially
    async function processSequentially() {
        try {
            const result1 = await step1();
            const result2 = await step2(result1);
            const result3 = await step3(result2);

            current.work_notes = 'Sequential Processing:\n' + result3;
        } catch (error) {
            gs.error('Sequential processing error: ' + error);
        }
    }

    processSequentially();

})(current, previous);


// Example 5: Error Handling with Async/Await
(function executeRule(current, previous /*null when async*/) {

    async function riskyOperation() {
        return new Promise((resolve, reject) => {
            var inc_gr = new GlideRecord('incident');

            // Simulate a condition that might fail
            if (inc_gr.get('number', 'INC0000001')) {
                resolve('Success: Found incident');
            } else {
                reject(new Error('Failed to find incident'));
            }
        });
    }

    async function safeExecution() {
        try {
            const result = await riskyOperation();
            current.work_notes = result;
        } catch (error) {
            // Graceful error handling
            gs.error('Caught error: ' + error.message);
            current.work_notes = 'Operation failed, but handled gracefully';
        } finally {
            // This block always executes
            gs.info('Operation completed');
        }
    }

    safeExecution();

})(current, previous);


// Example 6: Promise.race() - First to Complete Wins
(function executeRule(current, previous /*null when async*/) {

    function queryTable(table, limit) {
        return new Promise((resolve) => {
            var gr = new GlideRecord(table);
            gr.setLimit(limit);
            gr.query();
            resolve({
                table: table,
                count: gr.getRowCount()
            });
        });
    }

    async function raceQueries() {
        try {
            // Whichever query completes first will be returned
            const winner = await Promise.race([
                queryTable('incident', 100),
                queryTable('problem', 100),
                queryTable('change_request', 100)
            ]);

            current.work_notes = `Fastest query: ${winner.table} with ${winner.count} records`;
        } catch (error) {
            gs.error('Race error: ' + error);
        }
    }

    raceQueries();

})(current, previous);


// Example 7: Chaining Promises
(function executeRule(current, previous /*null when async*/) {

    function getIncident(number) {
        return new Promise((resolve, reject) => {
            var inc_gr = new GlideRecord('incident');
            if (inc_gr.get('number', number)) {
                resolve(inc_gr);
            } else {
                reject('Incident not found');
            }
        });
    }

    function getCaller(callerId) {
        return new Promise((resolve, reject) => {
            var user_gr = new GlideRecord('sys_user');
            if (user_gr.get(callerId)) {
                resolve(user_gr.getValue('name'));
            } else {
                reject('User not found');
            }
        });
    }

    // Chaining promises together
    getIncident(current.getValue('number'))
        .then(incident => {
            return getCaller(incident.getValue('caller_id'));
        })
        .then(callerName => {
            current.work_notes = 'Caller: ' + callerName;
        })
        .catch(error => {
            gs.error('Chain error: ' + error);
        });

})(current, previous);