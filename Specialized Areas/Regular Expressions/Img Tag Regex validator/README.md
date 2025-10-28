**Regex Pattern**
1. <img : looks for <img in text 
2. \w : looks for any word character (equivalent to [a-zA-Z0-9_])
3. \W : looks for any non-word character (equivalent to [^a-zA-Z0-9_])
4. '>' : looks for character >

**How to use**
1. Run this query in background/Fix scripts.
2. The info message will return articles having images. This is very useful information when there are broken images in articles after movement between instances or tools.
3. This can be further enhanced to replace image src if required.
