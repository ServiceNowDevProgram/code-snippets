## GlideTableDescriptor

When a table is extended, that it creates all new sys_dictionary records for all the fields on the base table instead with just one single sys_dictionary entry. These entries are referred to as “cloned descendant elements” and you need to edit the “first element” in order to modify them. 
You can also programatically interact with them using a “glideElementDescriptor() method on the related “GlideTableDescriptor” object. Here we using “getFirstTableName()” to find out where it was descended from.  



