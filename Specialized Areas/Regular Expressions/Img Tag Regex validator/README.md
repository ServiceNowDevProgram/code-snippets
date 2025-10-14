**Regex Pattern**
<img : looks for <img in text 
\w : looks for any word character (equivalent to [a-zA-Z0-9_])
\W looks for any non-word character (equivalent to [^a-zA-Z0-9_])
> : looks for character >

**How to use**
1. Run this query in background/Fix scripts.
2. The info message will return articles having images. This is very useful information when there are broken images in articles after movement between instances or tools.
3. This can be further enhanced to replace image src if required.
