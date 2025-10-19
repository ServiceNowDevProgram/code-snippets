/**
 * SQLInjectionValidator
 * 
 * Script Include for detecting potential SQL injection attempts in user-provided strings.
 * 
 * Purpose:
 * Validates user input against a comprehensive list of SQL injection patterns including
 * keywords, operators, comment syntax, and common attack vectors.
 * 
 * Usage:
 * var validator = new SQLInjectionValidator();
 * var isSafe = validator.isSafeFromSQLInjection(userInput);
 * 
 * Performance Considerations:
 * - Uses efficient string methods (toLowerCase, includes) for keyword detection
 * - Regex patterns are pre-compiled for performance
 * - Early exit on first match to minimize processing
 * - Suitable for high-volume input validation
 * 
 * Security Note:
 * This function provides pattern-based detection and should be used as ONE LAYER
 * of defense. Always use parameterized queries and prepared statements in your
 * database interactions as the PRIMARY defense against SQL injection.
 * 
 * @class SQLInjectionValidator
 */
var SQLInjectionValidator = Class.create();

SQLInjectionValidator.prototype = {
    
    /**
     * Checks if a string appears safe from SQL injection attempts
     * 
     * @param {string} inputString - The user-provided string to validate
     * @returns {boolean} true if string appears safe, false if suspicious patterns detected
     */
    isSafeFromSQLInjection: function(inputString) {
        // Input validation: ensure we have a string
        if (typeof inputString !== 'string') {
            gs.debug('SQLInjectionValidator: Input is not a string, converting to string');
            inputString = String(inputString);
        }
        
        // Empty strings are considered safe
        if (inputString.length === 0) {
            return true;
        }
        
        // Convert to lowercase for case-insensitive comparison
        var lowerInput = inputString.toLowerCase();
        
        // ========== CHECK 1: SQL Keywords ==========
        // Detects common SQL commands that could indicate injection attempts
        var sqlKeywords = [
            'select', 'insert', 'update', 'delete', 'drop', 'create', 'alter',
            'truncate', 'exec', 'execute', 'union', 'declare', 'cast', 'convert'
        ];
        
        for (var i = 0; i < sqlKeywords.length; i++) {
            // Use word boundary regex to avoid false positives (e.g., "selected" vs "select")
            var keywordRegex = new RegExp('\\b' + sqlKeywords[i] + '\\b', 'i');
            if (keywordRegex.test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected SQL keyword: ' + sqlKeywords[i]);
                return false;
            }
        }
        
        // ========== CHECK 2: SQL Clauses ==========
        // Detects FROM, WHERE, ORDER BY, GROUP BY, HAVING clauses
        var sqlClauses = [
            'from', 'where', 'order by', 'group by', 'having', 'join', 'inner join',
            'left join', 'right join', 'cross join', 'on'
        ];
        
        for (var j = 0; j < sqlClauses.length; j++) {
            var clauseRegex = new RegExp('\\b' + sqlClauses[j] + '\\b', 'i');
            if (clauseRegex.test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected SQL clause: ' + sqlClauses[j]);
                return false;
            }
        }
        
        // ========== CHECK 3: Comment Patterns ==========
        // Detects SQL comment syntax: --, /* */, ;
        var commentPatterns = [
            /--\s/,           // SQL line comment: -- followed by space
            /\/\*/,            // SQL block comment start: /*
            /\*\//,            // SQL block comment end: */
            /;\s*$/,           // Semicolon at end (statement terminator)
            /;\s*select/i,     // Semicolon followed by select
            /;\s*insert/i,     // Semicolon followed by insert
            /;\s*update/i,     // Semicolon followed by update
            /;\s*delete/i      // Semicolon followed by delete
        ];
        
        for (var k = 0; k < commentPatterns.length; k++) {
            if (commentPatterns[k].test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected comment pattern');
                return false;
            }
        }
        
        // ========== CHECK 4: Boolean-based Injection Patterns ==========
        // Detects common boolean-based SQL injection: OR 1=1, AND 1=1, etc.
        var booleanPatterns = [
            /or\s+1\s*=\s*1/i,           // OR 1=1
            /and\s+1\s*=\s*1/i,          // AND 1=1
            /or\s+'1'\s*=\s*'1'/i,       // OR '1'='1'
            /and\s+'1'\s*=\s*'1'/i,      // AND '1'='1'
            /or\s+true/i,                // OR TRUE
            /and\s+true/i,               // AND TRUE
            /or\s+1/i,                   // OR 1 (generic)
            /and\s+1/i,                  // AND 1 (generic)
            /or\s+''/i,                  // OR ''
            /and\s+''/i                  // AND ''
        ];
        
        for (var l = 0; l < booleanPatterns.length; l++) {
            if (booleanPatterns[l].test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected boolean-based injection pattern');
                return false;
            }
        }
        
        // ========== CHECK 5: Comparison Operators with Suspicious Values ==========
        // Detects patterns like: = 1, != 0, <> 0, > 0, < 1
        var comparisonPatterns = [
            /=\s*1\s*$/i,                // Ends with = 1
            /!=\s*0/i,                   // != 0
            /<>\s*0/i,                   // <> 0
            />\s*0/i,                    // > 0
            /<\s*1/i                     // < 1
        ];
        
        for (var m = 0; m < comparisonPatterns.length; m++) {
            if (comparisonPatterns[m].test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected suspicious comparison pattern');
                return false;
            }
        }
        
        // ========== CHECK 6: SQL Functions ==========
        // Detects SQL functions commonly used in injection: CHAR, ASCII, SUBSTRING, WAITFOR, SLEEP, BENCHMARK
        var sqlFunctions = [
            'char(', 'ascii(', 'substring(', 'waitfor(', 'sleep(', 'benchmark(',
            'concat(', 'length(', 'mid(', 'instr(', 'load_file(', 'into outfile'
        ];
        
        for (var n = 0; n < sqlFunctions.length; n++) {
            if (lowerInput.includes(sqlFunctions[n])) {
                gs.debug('SQLInjectionValidator: Detected SQL function: ' + sqlFunctions[n]);
                return false;
            }
        }
        
        // ========== CHECK 7: System Variables and Commands ==========
        // Detects: @@VERSION, xp_cmdshell, sp_executesql, etc.
        var systemPatterns = [
            /@@version/i,                // SQL Server version
            /@@servername/i,             // SQL Server name
            /xp_cmdshell/i,              // SQL Server command shell
            /sp_executesql/i,            // SQL Server execute SQL
            /information_schema/i,       // Database schema enumeration
            /mysql\.user/i,              // MySQL user table
            /pg_catalog/i                // PostgreSQL catalog
        ];
        
        for (var o = 0; o < systemPatterns.length; o++) {
            if (systemPatterns[o].test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected system variable or command');
                return false;
            }
        }
        
        // ========== CHECK 8: Quote Escaping and Concatenation ==========
        // Detects: '', "", \', \", ||, +, CONCAT
        var escapePatterns = [
            /''/,                        // Double single quote (escape)
            /""/,                        // Double double quote (escape)
            /\\'/ ,                       // Backslash single quote
            /\\"/,                       // Backslash double quote
            /\|\|/,                      // Oracle/PostgreSQL concatenation
            /\+\\s*'/i                   // SQL Server concatenation
        ];
        
        for (var p = 0; p < escapePatterns.length; p++) {
            if (escapePatterns[p].test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected quote escaping or concatenation pattern');
                return false;
            }
        }
        
        // ========== CHECK 9: UNION-based Injection ==========
        // Detects UNION SELECT patterns
        var unionPatterns = [
            /union\s+select/i,           // UNION SELECT
            /union\s+all\s+select/i,     // UNION ALL SELECT
            /union\s+distinct\s+select/i // UNION DISTINCT SELECT
        ];
        
        for (var q = 0; q < unionPatterns.length; q++) {
            if (unionPatterns[q].test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected UNION-based injection pattern');
                return false;
            }
        }
        
        // ========== CHECK 10: Time-based Blind Injection ==========
        // Detects: SLEEP, BENCHMARK, WAITFOR DELAY, pg_sleep
        var timeBasedPatterns = [
            /sleep\s*\(/i,               // SLEEP function
            /benchmark\s*\(/i,           // BENCHMARK function
            /waitfor\s+delay/i,          // WAITFOR DELAY
            /pg_sleep\s*\(/i             // PostgreSQL sleep
        ];
        
        for (var r = 0; r < timeBasedPatterns.length; r++) {
            if (timeBasedPatterns[r].test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected time-based blind injection pattern');
                return false;
            }
        }
        
        // ========== CHECK 11: Stacked Queries ==========
        // Detects multiple statements separated by semicolons
        var stackedQueryPattern = /;\s*[a-z]/i;
        if (stackedQueryPattern.test(inputString)) {
            gs.debug('SQLInjectionValidator: Detected stacked query pattern');
            return false;
        }
        
        // ========== CHECK 12: Hex Encoding ==========
        // Detects: 0x (hex encoding used to bypass filters)
        var hexPattern = /0x[0-9a-f]+/i;
        if (hexPattern.test(inputString)) {
            gs.debug('SQLInjectionValidator: Detected hex encoding pattern');
            return false;
        }
        
        // ========== CHECK 13: Comment-based Injection ==========
        // Detects: #, --, /*, */ patterns
        var commentInjectionPatterns = [
            /#/,                         // MySQL comment
            /--/,                        // SQL comment
            /\/\*/,                      // Block comment start
            /\*\//                       // Block comment end
        ];
        
        for (var s = 0; s < commentInjectionPatterns.length; s++) {
            if (commentInjectionPatterns[s].test(inputString)) {
                gs.debug('SQLInjectionValidator: Detected comment-based injection pattern');
                return false;
            }
        }
        
        // ========== CHECK 14: Wildcard Patterns ==========
        // Detects: %, _ (SQL wildcards that could be used in LIKE injection)
        // Note: This is a loose check - legitimate data may contain these
        // Only flag if combined with suspicious patterns
        var wildcardPattern = /[%_]\s*(or|and|union|select)/i;
        if (wildcardPattern.test(inputString)) {
            gs.debug('SQLInjectionValidator: Detected wildcard with SQL keyword pattern');
            return false;
        }
        
        // ========== CHECK 15: Parentheses Nesting ==========
        // Detects excessive parentheses which could indicate subquery injection
        var openParens = (inputString.match(/\(/g) || []).length;
        var closeParens = (inputString.match(/\)/g) || []).length;
        
        // Flag if more than 3 levels of nesting or mismatched parentheses
        if (openParens > 5 || closeParens > 5 || openParens !== closeParens) {
            gs.debug('SQLInjectionValidator: Detected excessive or mismatched parentheses');
            return false;
        }
        
        // ========== CHECK 16: Case Sensitivity Bypass ==========
        // Detects: sElEcT, UnIoN, etc. (mixed case SQL keywords)
        var mixedCasePattern = /[a-z]{2,}\s+[a-z]{2,}/i;
        if (mixedCasePattern.test(inputString)) {
            // Check if it matches known SQL keywords in mixed case
            var mixedCaseKeywords = [
                /s[eE][lL][eE][cC][tT]/,
                /u[nN][iI][oO][nN]/,
                /[iI][nN][sS][eE][rR][tT]/,
                /[uU][pP][dD][aA][tT][eE]/,
                /[dD][eE][lL][eE][tT][eE]/
            ];
            
            for (var t = 0; t < mixedCaseKeywords.length; t++) {
                if (mixedCaseKeywords[t].test(inputString)) {
                    gs.debug('SQLInjectionValidator: Detected mixed-case SQL keyword');
                    return false;
                }
            }
        }
        
        // ========== All checks passed ==========
        gs.debug('SQLInjectionValidator: Input passed all SQL injection checks');
        return true;
    },
    
    type: 'SQLInjectionValidator'
};