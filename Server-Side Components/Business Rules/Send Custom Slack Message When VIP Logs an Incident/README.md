When a VIP user creates an incident, notify a Slack channel (or send via webhook) with a custom JSON message.
Note : You’d need to set up a Slack Incoming Webhook for this.

This business rule triggers on incident creation and checks if the `caller` has the `vips` flag set to `true`. If so, it constructs a JSON payload with incident details and sends a POST request to a predefined Slack webhook URL using `sn_ws.RESTMessageV2`. The purpose is to notify support teams in real time when a VIP user logs an incident.
