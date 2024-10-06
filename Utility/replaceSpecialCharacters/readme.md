
Overview
The replaceSpecialCharacters function is designed to replace HTML special character entities in a string with their corresponding unescaped characters. 
This is particularly useful when handling strings with encoded HTML entities that need to be rendered as their actual characters, such as replacing &amp; with & or &lt; with <.

What it does:
Replaces common HTML entities such as &amp;, &lt;, and &gt; with their corresponding unescaped versions.

How It Works
The function utilizes a regular expression to find encoded HTML entities in the text and replaces them based on a predefined map of common entity-to-character conversions.

Key Components:
Regular Expression (re): The regex /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|#96|#64|#43|#61|nbsp|#160|copy|#169|reg|#174|euro|#8364|pound|#163|yen|#165);/g matches a variety of HTML entity codes, such as:

&amp;, &#38; (for &)
&lt;, &#60; (for <)
&gt;, &#62; (for >)
&quot;, &#34; (for ")
Unescaped Map (unescaped): The unescaped object defines the mapping of HTML entities to their unescaped characters. For example:

'&amp;': '&'
'&lt;': '<'
'&copy;': '©'
Replacement Logic: The function calls replace() on the input string (txt), replacing any matches found by the regular expression with their corresponding unescaped characters from the map.
