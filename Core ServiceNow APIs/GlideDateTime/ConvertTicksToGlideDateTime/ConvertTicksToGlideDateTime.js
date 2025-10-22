/*
    Parameters:
    	ticks : Number
    
    Returns:
        - GlideDateTime Object
*/
function convertTicksToGlideDateTime(ticks){
    if(gs.nil(ticks)){
        return new GlideDateTime(); //Return today if ticks is empty
    }
    
    // Return the max date if ticks starts with '9'
    var ticks_string = ticks.toString();
    if (ticks_string.startsWith('9')){
        return new GlideDateTime("2100-12-31 23:59:59");
    }

    var ticks = ticks - (11644475008000 * 10000); //Trim the offset
    var ms = ticks / 10000; //Convert to Milli seconds
    var gdt = new GlideDateTime();
    gdt.setNumericValue(ms);
    return gdt;
}
