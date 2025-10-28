
# Script Execution Time Tracker

This snippet helps developers measure how long their server-side scripts take to run in ServiceNow.
Useful for performance optimization and debugging slow background scripts or Script Includes.

## Example Use Case
- Measure performance of a GlideRecord query or function execution.
- Log the execution time to the system logs.

## How It Works
The script uses timestamps before and after execution to measure elapsed time.

## Usage
Wrap your logic between `start` and `stop`, or use the Script Include:

```javascript
var timer = new ExecutionTimeTracker();
// ... your code ...
timer.stop('My Script');
