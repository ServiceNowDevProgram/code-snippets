# Usage
If you wish to update/re-calculate your allocated entitlements on the subscription management dashboard, execute the following two lines of code. You can run this server script either in the background script or maintain it as a fix script and run it on-demand.

```
var summarizer = new SNC.SubscriptionSummarizer();
		             summarizer.runSummary();
```
