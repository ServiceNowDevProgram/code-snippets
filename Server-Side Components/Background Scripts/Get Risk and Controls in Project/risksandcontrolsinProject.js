var asmtGr = new GlideRecord('sn_risk_advanced_risk_assessment_instance');
asmtGr.addQuery('risk_assessment_project','d4eed504c3787210b533bb02b4013121');//Risk Assessment Project Sys Id
asmtGr.query();
while(asmtGr.next()){
    gs.print("Risk: "+asmtGr.risk.name+"\n");//Printing Individual Risk Name
    var asmtResp = new GlideAggregate('sn_risk_advanced_risk_assessment_instance_response');
    asmtResp.addEncodedQuery('assessment_instance_id='+asmtGr.sys_id+'^assessment_type=2^parent_instance_response=NULL');
    asmtResp.query();
    var countCont = asmtResp.getRowCount().toString();
    gs.print("This risk has "+countCont+" control(s) associated as mitigating action. Those are -\n");
    var i=1;
    while(asmtResp.next()){
        gs.print('Control '+i+' : '+asmtResp.control.name+"\n");//Printing Control names for each risk
        i++;
    }
    gs.print('\n');
}
