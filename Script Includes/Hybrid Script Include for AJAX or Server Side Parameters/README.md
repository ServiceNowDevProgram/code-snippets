This example shows how one could code a script include that might be called in two different scenarios. One being a client AJAX call, and the other being a server side call, from another script include perhaps.

Example usage:
Client script AJAX call:

        var ajax = new GlideAjax('example_hybrid_parameters');
        ajax.addParam('sysparm_name', 'exampleHybrid');
        ajax.addParam('sysparm_parm1', parm1);
        ajax.addParam('sysparm_parm2', parm2);
        ajax.addParam('sysparm_parm3', parm3);
        ajax.addParam('sysparm_parm4', parm4);
        ajax.getXMLAnswer(exampleResponse);

    Call from server side script:

        var pr = new example_hybrid_parameters();
        result = pr.checkPrereq(parm1, parm2, parm3, parm4);
        return result;
