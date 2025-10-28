/**
 * Example usage of RESTIntegrationHandler
 * Demonstrates how to implement specific API integrations
 */

// ========================================
// Example 1: Slack Integration
// ========================================
var SlackIntegration = Class.create();
SlackIntegration.prototype = Object.extendsObject(RESTIntegrationHandler, {
    
    initialize: function() {
        RESTIntegrationHandler.prototype.initialize.call(this, 'slack');
    },
    
    /**
     * Send a message to a Slack channel
     * @param {string} channel - Channel ID or name
     * @param {string} text - Message text
     * @param {object} options - Additional options (attachments, blocks, etc.)
     */
    sendMessage: function(channel, text, options) {
        options = options || {};
        
        var payload = {
            channel: channel,
            text: text,
            username: options.username || 'ServiceNow Bot',
            icon_emoji: options.icon || ':robot_face:'
        };
        
        // Add attachments if provided
        if (options.attachments) {
            payload.attachments = options.attachments;
        }
        
        // Add blocks for rich formatting
        if (options.blocks) {
            payload.blocks = options.blocks;
        }
        
        var response = this.post('/chat.postMessage', payload);
        
        if (response.success) {
            gs.info('[Slack] Message sent successfully to ' + channel);
            return {
                success: true,
                messageId: response.data.ts,
                channel: response.data.channel
            };
        } else {
            gs.error('[Slack] Failed to send message: ' + response.error);
            return {
                success: false,
                error: response.error
            };
        }
    },
    
    /**
     * Create an incident notification in Slack
     * @param {GlideRecord} incidentGr - Incident GlideRecord
     */
    notifyIncident: function(incidentGr) {
        var channel = gs.getProperty('x_company.slack.incident_channel', '#incidents');
        
        var attachments = [{
            color: this._getPriorityColor(incidentGr.getValue('priority')),
            title: incidentGr.getValue('number') + ': ' + incidentGr.getValue('short_description'),
            title_link: gs.getProperty('glide.servlet.uri') + 'incident.do?sys_id=' + incidentGr.getUniqueValue(),
            fields: [
                {
                    title: 'Priority',
                    value: incidentGr.getDisplayValue('priority'),
                    short: true
                },
                {
                    title: 'State',
                    value: incidentGr.getDisplayValue('state'),
                    short: true
                },
                {
                    title: 'Assigned To',
                    value: incidentGr.getDisplayValue('assigned_to') || 'Unassigned',
                    short: true
                },
                {
                    title: 'Assignment Group',
                    value: incidentGr.getDisplayValue('assignment_group') || 'Unassigned',
                    short: true
                }
            ],
            footer: 'ServiceNow',
            ts: Math.floor(new Date().getTime() / 1000)
        }];
        
        return this.sendMessage(channel, 'New Critical Incident', {
            attachments: attachments
        });
    },
    
    _getPriorityColor: function(priority) {
        var colors = {
            '1': 'danger',    // Critical - Red
            '2': 'warning',   // High - Orange
            '3': '#439FE0',   // Medium - Blue
            '4': 'good',      // Low - Green
            '5': '#CCCCCC'    // Planning - Gray
        };
        return colors[priority] || '#CCCCCC';
    },
    
    type: 'SlackIntegration'
});

// ========================================
// Example 2: GitHub Integration
// ========================================
var GitHubIntegration = Class.create();
GitHubIntegration.prototype = Object.extendsObject(RESTIntegrationHandler, {
    
    initialize: function() {
        RESTIntegrationHandler.prototype.initialize.call(this, 'github');
    },
    
    /**
     * Create an issue in GitHub repository
     * @param {string} owner - Repository owner
     * @param {string} repo - Repository name
     * @param {object} issueData - Issue data (title, body, labels, assignees)
     */
    createIssue: function(owner, repo, issueData) {
        var endpoint = '/repos/' + owner + '/' + repo + '/issues';
        
        var payload = {
            title: issueData.title,
            body: issueData.body || '',
            labels: issueData.labels || [],
            assignees: issueData.assignees || []
        };
        
        if (issueData.milestone) {
            payload.milestone = issueData.milestone;
        }
        
        var response = this.post(endpoint, payload);
        
        if (response.success) {
            gs.info('[GitHub] Issue created: ' + response.data.html_url);
            return {
                success: true,
                issueNumber: response.data.number,
                url: response.data.html_url,
                id: response.data.id
            };
        } else {
            gs.error('[GitHub] Failed to create issue: ' + response.error);
            return {
                success: false,
                error: response.error
            };
        }
    },
    
    /**
     * Get repository information
     * @param {string} owner - Repository owner
     * @param {string} repo - Repository name
     */
    getRepository: function(owner, repo) {
        var endpoint = '/repos/' + owner + '/' + repo;
        var response = this.get(endpoint, null, { useCache: true });
        
        if (response.success) {
            return {
                success: true,
                name: response.data.name,
                description: response.data.description,
                stars: response.data.stargazers_count,
                forks: response.data.forks_count,
                language: response.data.language,
                url: response.data.html_url
            };
        } else {
            return {
                success: false,
                error: response.error
            };
        }
    },
    
    /**
     * List pull requests for a repository
     * @param {string} owner - Repository owner
     * @param {string} repo - Repository name
     * @param {string} state - PR state (open, closed, all)
     */
    listPullRequests: function(owner, repo, state) {
        var endpoint = '/repos/' + owner + '/' + repo + '/pulls';
        var params = {
            state: state || 'open',
            per_page: 100
        };
        
        var response = this.get(endpoint, params, { useCache: true });
        
        if (response.success) {
            var prs = response.data.map(function(pr) {
                return {
                    number: pr.number,
                    title: pr.title,
                    state: pr.state,
                    author: pr.user.login,
                    url: pr.html_url,
                    created_at: pr.created_at
                };
            });
            
            return {
                success: true,
                pullRequests: prs,
                count: prs.length
            };
        } else {
            return {
                success: false,
                error: response.error
            };
        }
    },
    
    type: 'GitHubIntegration'
});

// ========================================
// Example 3: Jira Integration
// ========================================
var JiraIntegration = Class.create();
JiraIntegration.prototype = Object.extendsObject(RESTIntegrationHandler, {
    
    initialize: function() {
        RESTIntegrationHandler.prototype.initialize.call(this, 'jira');
    },
    
    /**
     * Create a Jira issue
     * @param {object} issueData - Issue data
     */
    createIssue: function(issueData) {
        var payload = {
            fields: {
                project: {
                    key: issueData.projectKey
                },
                summary: issueData.summary,
                description: issueData.description || '',
                issuetype: {
                    name: issueData.issueType || 'Task'
                }
            }
        };
        
        // Add optional fields
        if (issueData.priority) {
            payload.fields.priority = { name: issueData.priority };
        }
        
        if (issueData.assignee) {
            payload.fields.assignee = { name: issueData.assignee };
        }
        
        if (issueData.labels) {
            payload.fields.labels = issueData.labels;
        }
        
        var response = this.post('/rest/api/2/issue', payload);
        
        if (response.success) {
            gs.info('[Jira] Issue created: ' + response.data.key);
            return {
                success: true,
                issueKey: response.data.key,
                issueId: response.data.id,
                url: this.baseUrl + '/browse/' + response.data.key
            };
        } else {
            gs.error('[Jira] Failed to create issue: ' + response.error);
            return {
                success: false,
                error: response.error
            };
        }
    },
    
    /**
     * Search for Jira issues using JQL
     * @param {string} jql - JQL query string
     * @param {number} maxResults - Maximum results to return
     */
    searchIssues: function(jql, maxResults) {
        var params = {
            jql: jql,
            maxResults: maxResults || 50,
            fields: 'summary,status,assignee,priority,created,updated'
        };
        
        var response = this.get('/rest/api/2/search', params, { useCache: true });
        
        if (response.success) {
            var issues = response.data.issues.map(function(issue) {
                return {
                    key: issue.key,
                    summary: issue.fields.summary,
                    status: issue.fields.status.name,
                    assignee: issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned',
                    priority: issue.fields.priority ? issue.fields.priority.name : 'None',
                    created: issue.fields.created,
                    updated: issue.fields.updated
                };
            });
            
            return {
                success: true,
                issues: issues,
                total: response.data.total
            };
        } else {
            return {
                success: false,
                error: response.error
            };
        }
    },
    
    /**
     * Add comment to Jira issue
     * @param {string} issueKey - Jira issue key (e.g., PROJ-123)
     * @param {string} comment - Comment text
     */
    addComment: function(issueKey, comment) {
        var endpoint = '/rest/api/2/issue/' + issueKey + '/comment';
        var payload = {
            body: comment
        };
        
        var response = this.post(endpoint, payload);
        
        if (response.success) {
            gs.info('[Jira] Comment added to ' + issueKey);
            return {
                success: true,
                commentId: response.data.id
            };
        } else {
            return {
                success: false,
                error: response.error
            };
        }
    },
    
    type: 'JiraIntegration'
});

// ========================================
// Usage Examples
// ========================================

// Example 1: Send Slack notification
function sendSlackNotification() {
    var slack = new SlackIntegration();
    
    // Simple message
    var result = slack.sendMessage('#general', 'Hello from ServiceNow!');
    
    if (result.success) {
        gs.info('Message sent successfully');
    }
}

// Example 2: Notify critical incident to Slack
function notifyCriticalIncident(incidentSysId) {
    var incGr = new GlideRecord('incident');
    if (incGr.get(incidentSysId)) {
        var slack = new SlackIntegration();
        slack.notifyIncident(incGr);
    }
}

// Example 3: Create GitHub issue from ServiceNow incident
function createGitHubIssueFromIncident(incidentSysId) {
    var incGr = new GlideRecord('incident');
    if (incGr.get(incidentSysId)) {
        var github = new GitHubIntegration();
        
        var issueData = {
            title: incGr.getValue('number') + ': ' + incGr.getValue('short_description'),
            body: 'ServiceNow Incident: ' + incGr.getValue('number') + '\n\n' +
                  'Description: ' + incGr.getValue('description') + '\n\n' +
                  'Priority: ' + incGr.getDisplayValue('priority') + '\n' +
                  'Link: ' + gs.getProperty('glide.servlet.uri') + 'incident.do?sys_id=' + incidentSysId,
            labels: ['servicenow', 'incident', 'priority-' + incGr.getValue('priority')],
            assignees: ['devops-team']
        };
        
        var result = github.createIssue('myorg', 'myrepo', issueData);
        
        if (result.success) {
            // Update incident with GitHub issue link
            incGr.work_notes = 'GitHub issue created: ' + result.url;
            incGr.update();
        }
    }
}

// Example 4: Sync ServiceNow incident to Jira
function syncIncidentToJira(incidentSysId) {
    var incGr = new GlideRecord('incident');
    if (incGr.get(incidentSysId)) {
        var jira = new JiraIntegration();
        
        var issueData = {
            projectKey: 'SUPPORT',
            summary: incGr.getValue('short_description'),
            description: 'ServiceNow Incident: ' + incGr.getValue('number') + '\n\n' +
                        incGr.getValue('description'),
            issueType: 'Bug',
            priority: mapPriorityToJira(incGr.getValue('priority')),
            labels: ['servicenow', incGr.getValue('number')]
        };
        
        var result = jira.createIssue(issueData);
        
        if (result.success) {
            // Store Jira key in incident
            incGr.correlation_id = result.issueKey;
            incGr.work_notes = 'Jira issue created: ' + result.url;
            incGr.update();
            
            gs.info('Incident synced to Jira: ' + result.issueKey);
        }
    }
}

function mapPriorityToJira(snPriority) {
    var priorityMap = {
        '1': 'Highest',
        '2': 'High',
        '3': 'Medium',
        '4': 'Low',
        '5': 'Lowest'
    };
    return priorityMap[snPriority] || 'Medium';
}
