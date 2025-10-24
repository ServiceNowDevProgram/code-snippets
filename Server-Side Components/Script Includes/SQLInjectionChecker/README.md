 SQLInjectionValidator
 
 Script Include for detecting potential SQL injection attempts in user-provided strings.
 
 Purpose:
 Validates user input against a comprehensive list of SQL injection patterns including
 keywords, operators, comment syntax, and common attack vectors.
 
 Usage:
 var validator = new SQLInjectionValidator();
 var isSafe = validator.isSafeFromSQLInjection(userInput);
 
 Performance Considerations:
 - Uses efficient string methods (toLowerCase, includes) for keyword detection
 - Regex patterns are pre-compiled for performance
 - Early exit on first match to minimize processing
 - Suitable for high-volume input validation
 
 Security Note:
 This function provides pattern-based detection and should be used as ONE LAYER
 of defense. Always use parameterized queries and prepared statements in your
 database interactions as the PRIMARY defense against SQL injection.