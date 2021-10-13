/***********************************************************/
Input:
1. String - parent - Parent table name
2. String - child - Child table name

Output:
1. Boolean: 
true - Child table is an extension of parent table
false - Child table is not an extension of parent table

/***********************************************************/

function isTableExtended(parent, child){
    gs.include("j2js");
    var tu = new TableUtils(parent);
    if(tu.tableExists() && tu.hasExtensions()){
        var tableArrayList = tu.getTableExtensions();
        var tableArray = j2js(tableArrayList);
        if(tableArray.indexOf(child) > -1){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
