The CommandInjectionChecker is a ServiceNow Script Include designed to detect potential command injection attacks in user-supplied strings. It scans for common shell metacharacters and patterns (e.g., ;, |, &, $(), `) using regex, providing a boolean result to flag suspicious inputs. This utility enhances security in server-side automation without relying on external libraries, following ServiceNow best practices for input validation.

Example on how to use it:

var checker = new CommandInjectionChecker();

// Safe input
if (!checker.containsCommandInjection('Normal text')) {
    gs.info('Input is clean.');
}

// Suspicious input
if (checker.containsCommandInjection('ls; rm -rf /')) {
    gs.error('Command injection detected - blocking action.');
}