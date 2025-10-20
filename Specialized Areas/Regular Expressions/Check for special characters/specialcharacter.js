function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    // Exit early if the form is loading, in template mode, or the new value is empty
    if (isLoading || newValue === '') {
        return;
    }

    /**
     * Define a regular expression to match disallowed special characters.
     * Breakdown of the pattern:
     * [~@|$^<>*+=;?`'\)\(\[\]]
     * * - Square brackets [] define a character class, meaning "match any one of these characters".
     * - ~ @ | $ ^ < > * + = ; ? ` ' ) ( [ ] : These are the characters being checked.
     * - Characters that have special meaning inside a character class (like `(`, `)`, `[`, `]`) must be escaped with a backslash `\`.
     */
    var disallowedChars = /[~@|$^<>*+=;?`'\)\(\[\]]/;

    var fieldName = '<your_field_name>'; // Replace with the actual field name being validated

    // Check if the new value contains any disallowed characters
    if (disallowedChars.test(newValue)) {
        g_form.clearValue(fieldName);
        g_form.showErrorBox(fieldName, 'Special characters are not allowed.');
    }
}
