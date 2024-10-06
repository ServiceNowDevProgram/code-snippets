replaceSpecialCharacters: function(txt) {
    var re = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|#96|#64|#43|#61|nbsp|#160|copy|#169|reg|#174|euro|#8364|pound|#163|yen|#165);/g;
    
    // Expanded map of HTML entity codes to their unescaped equivalents
    var unescaped = {
        '&amp;': '&',
        '&#38;': '&',
        '&lt;': '<',
        '&#60;': '<',
        '&gt;': '>',
        '&#62;': '>',
        '&apos;': "'",
        '&#39;': "'",
        '&quot;': '"',
        '&#34;': '"',
        '&#64;': '@',
        '&#61;': '=',
        '&#96;': '`',
        '&#43;': '+',
        '&nbsp;': ' ',  // non-breaking space
        '&#160;': ' ',  // non-breaking space
        
    };

    // Replace special characters based on the match
    return txt.replace(re, function(m) {
        return unescaped[m];
    });
}
