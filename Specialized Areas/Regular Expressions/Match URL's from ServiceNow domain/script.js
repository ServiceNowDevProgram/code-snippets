//Regex to match URL's which are in ServiceNow domain 
//Matching pages from servicenow.com

//Regex expression to match ServiceNow URL's
var regSN = /^(http(s):\/\/)?([^.]+\.)?servicenow\.com(\/.*)$/;

//Array with examples to test regex
var examples = ['http://www.servicenow.com/', 'https://servicenow.com/dev', 'https://developer.servicenow.com/blog.do?p=/post/hacktoberfest-2021/', 'www.servicenow.com/products/predictive-intelligence.html', 'https://github.com/ServiceNowDevProgram/code-snippets', 'hacktoberfest.digitalocean.com/profile'];

//Testing different pages URL's to check if they are from ServiceNow domain
for (index in examples) {
    if (regSN.test(examples[index])) {
        gs.info('SN URL: ' + examples[index]);
    } else {
        gs.info('NOT SN URL: ' + examples[index]);
    }
}
