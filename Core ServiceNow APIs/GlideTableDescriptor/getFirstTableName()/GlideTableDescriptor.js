var td = GlideTableDescriptor.get(dictionaryGR.getValue("name"));
var ed = td.getElementDescriptor(dictionaryGR.getValue("element"));  
gs.print(ed.getFirstTableName()); //using “getFirstTableName()” to find out where it was descended from.  


