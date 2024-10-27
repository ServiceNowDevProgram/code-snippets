This utility contains a script include which generates PDF export of knowledge article  and this script include handles all HTML formatting of Knowledge article as well.
Also, this utility will handle any images attached in KB article body.

Sample Script to call this Script Include:

new PolicyPDFHelper().getPDFBase64('b10db60e2fc738101d84d2172799b69c','landscape');

// First paramter is sys_id of KB article from kb_knowledge record
// Second Parameter is PDF Export Mode. Accepted inputs are landscape or portrait.
