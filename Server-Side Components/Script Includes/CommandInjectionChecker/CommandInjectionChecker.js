/**
 * CommandInjectionChecker
 * 
 * A ServiceNow Script Include that provides security utilities for detecting
 * command injection attack patterns in user input strings.
 * 
 * PURPOSE:
 * This utility class is designed to identify potentially malicious command
 * injection payloads by analyzing input strings for common shell metacharacters
 * and command substitution patterns. It serves as a first-line defense against
 * command injection attacks in server-side scripts.
 * 
 * USAGE:
 * var checker = new CommandInjectionChecker();
 * var isSuspicious = checker.containsCommandInjection(userInput);
 * if (isSuspicious) {
 *     gs.warn('Potential command injection detected in input');
 * }
 * 
 * SECURITY NOTES:
 * - This checker detects PATTERNS, not guaranteed exploits
 * - Use this as ONE layer of defense, not the only layer
 * - Always validate and sanitize user input at multiple levels
 * - Consider using parameterized queries and proper escaping
 * - Log suspicious inputs for security auditing
 * - Never trust user input, even after this check passes
 * 
 */
var CommandInjectionChecker = Class.create();

CommandInjectionChecker.prototype = {
    initialize: function() {

        // Regex pattern to detect command-injection attempts.
        // This pattern matches the following items in the input string:
        // 1) Command separators:
        //      - semicolon: `;`
        //      - single pipe: `|`   (common shell pipe)
        //      - logical OR chaining: `||`
        //      - logical AND chaining: `&&`
        //    Note: this pattern matches both single `|` and the double `||`, and it
        //    matches `&&` for logical AND chaining.
        //
        // 2) Command substitution starts:
        //      - `$(`   e.g. `$(command)`
        //      - `${`   some shells/templating forms use this
        //      - `$[`   other less-common forms or obfuscation using bracket notation
        //
        // 3) Backtick execution:
        //      - `` ` ``  (backtick command substitution)
        //
        // 4) Escaped separators (literal backslash before separator):
        //      - `\;`  (escaped semicolon)
        //      - `\|`  (escaped pipe)
        //
        // 5) Line control characters that can be used to inject or terminate commands:
        //      - newline: `\n`
        //      - carriage return: `\r`
        //
        // 6) Null byte:
        //      - `\x00` (NULL byte — written as `\x00` in the regex; commonly shown as `\0`)
        this.injectionPattern = /[;\n\r\x00`]|(\|\||&&)|\$\(|\$\{|\$\[|\\;|\\\||\|/;

        // Type metadata for ServiceNow framework
        this.type = 'CommandInjectionChecker';
    },

    containsCommandInjection: function(input) {
        // INPUT VALIDATION
        // Handle null or undefined input - return false (safe default)
        if (input === null || input === undefined) {
            gs.debug('CommandInjectionChecker: Null or undefined input provided');
            return false;
        }
        // Handle empty string - return false (safe default)
        if (input.length === 0) {
            return false;
        }
        // INJECTION DETECTION
        // Test the input against the compiled regex pattern
        // Reset the regex lastIndex to ensure proper matching
        this.injectionPattern.lastIndex = 0;

        // Perform the pattern match
        var hasInjectionPattern = this.injectionPattern.test(input);
        // LOGGING FOR SECURITY AUDITING
        if (hasInjectionPattern) {
            // Log suspicious input for security monitoring
            // Truncate very long inputs to prevent log flooding
            var truncatedInput = input.length > 100 ?
                input.substring(0, 100) + '...' :
                input;

            gs.warn('CommandInjectionChecker: Potential command injection detected in input: ' +
                truncatedInput);
        }
        return hasInjectionPattern;
    },
    type: 'CommandInjectionChecker'
};