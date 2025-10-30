// Scheduled Job Script - Run Weekly
// Name: Weekly Cost Optimization Analysis

try {
    var analyzer = new CostOptimizationAnalyzer();
    var results = analyzer.analyze();
    
    if (results) {
        // Store results in a custom table or send email report
        gs.info('Cost optimization analysis completed successfully');

        var emailBody = 'Cost Optimization Report:\n\n';
        emailBody += 'Unused Licenses: ' + results.unusedLicenses.length + '\n';
        emailBody += 'Redundant Integrations: ' + results.redundantIntegrations.length + '\n';
        emailBody += 'Oversized Tables: ' + results.oversizedTables.length + '\n';
        emailBody += 'Potential Savings: ' + results.totalPotentialSavings + '\n';
        
        // below line will send to email
        gs.eventQueue('cost.optimization.report', null, emailBody);
    }
    
} catch (e) {
    gs.error('Scheduled cost analysis failed: ' + e.message);
}
