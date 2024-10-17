function Checkgrps() {
    var arr = []; //empty arr
    var gr = new GlideRecord("sys_user_group"); //querying group table
    gr.addActiveQuery(); //filtering only active groups
    gr.query();
    while (gr.next()) {
        if (gr.manager.active == false || gr.manager.nil()) { //dot-walking to check manager's active status and also checking if the group does'nt have a manager assigned or not
            arr.push(gr.name.toString() + " "); //pushing all the group names into an array
        }
    }
    gs.info("Groups with inactive or no manager: " + arr); //
    return arr; //returns the arr with all the group names
}

Checkgrps(); //calling the function to execute the script