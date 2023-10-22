(function executeRule(current, previous /*null when async*/ ) {

    var currGrp, prevGrp;
    currGrp = current.assignment_group;
    prevGrp = previous.assignment_group;

    if (prevGrp != '477a05d153013010b846ddeeff7b1225' && currGrp == '0a52d3dcd7011200f2d224837e6103f2') {
        if (prevGrp != '477a05d153013010b846ddeeff7b1225' && currGrp == '0a52d3dcd7011200f2d224837e6103f2') {
            gs.addErrorMessage("Assigment to the group 'Application Development' has been restricted. Please assign the ticket to either of the groups: 'App Engine Admins' or 'Capacity Mgmt' ");
            current.setAbortAction(true);
        }
    }
})(current, previous);
