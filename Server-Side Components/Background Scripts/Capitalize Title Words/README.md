This script will take a string and capitalize words that are not part of an exclusion list.
The first and last words will always be capitalized even if normally excluded, according to MLA Format.

This is great for providing more consistently formatted Titles and Short Descriptions, especially when you have those users who just LOVE to exclusively use lowercase for everything.

You can use this code in a Business Rule (on insert) to make the modifications and provide more consistent formatting where applicable.

You can add to or remove from the list of excluded words via the "excludedWords" array in the "processTitle" function.

Set the "title" variable to the text you want to format. Often this will be a Short Description or similar field. Or you can call the "processTitle" function and pass in the string

*** An example run ***

Before String:
the ultimate short description of the 21st century

After String:
The Ultimate Short Description of the 21st Century
