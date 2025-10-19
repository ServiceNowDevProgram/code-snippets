<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
    <g:evaluate var="jvar_items" expression="RP.getWindowProperties().get('items')" />
    <hr>
    </hr>
    <!--Select Order Guide Name-->
    <label>Select Order Guide</label>
    <g:ui_reference name="order_guide" id="order_guide" table="sc_cat_item_guide" completer="AJAXTableCompleter" style="width:180px" />
    <hr>
    </hr>
    <hr>
    </hr>
    <!--Select varaible set name -->
    <label>Select Variable Set</label>
    <g:ui_reference name="var_set" id="var_set" table="item_option_new_set" completer="AJAXTableCompleter" style="width:180px" />
    <hr>
    </hr>
    <button style="margin-top:4px;background-color:crimson;color:white" onclick="addItems('${jvar_items}')"> Add to Order Guide</button>
</j:jelly>

//Client Script of UI page

function addItems(catItems) {
    var og = document.getElementById("order_guide").value;
    var varSet = document.getElementById("var_set").value;

    var orderG = new GlideAjax('AddtoOG');
    orderG.addParam('sysparm_name', 'addToOrderGuide');
    orderG.addParam('sysparm_itemList', catItems);
    orderG.addParam('sysparm_og', og);
    orderG.addParam('sysparm_set', varSet);
    orderG.getXML(addOrderGuide);
}

function addOrderGuide(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    alert(answer);
    GlideDialogWindow.get().destroy();
}
