```markdown
# debugLogger

> A simple environment-aware logging utility for client and server scripts.

**Use case:**  
In one of my projects, we wanted to log messages only in non-production environments without commenting them out each time. This small helper does that elegantly.

```javascript
/**
 * debugLogger(message, level)
 * Logs only if NOT in production.
 * Level can be 'info', 'warn', or 'error'
 */
var debugLogger = (function() {
  var isProd = gs.getProperty('instance_name') === 'prod-instance'; // change per your instance
  return function(msg, level) {
    if (isProd) return;
    level = level || 'info';
    gs[level]('[DEBUG] ' + msg);
  };
})();

// Example usage:
debugLogger('Checking record count...', 'info');
