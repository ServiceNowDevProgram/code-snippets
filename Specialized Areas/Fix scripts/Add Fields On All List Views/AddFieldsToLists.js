var fieldsToAdd = ['sys_updated_on', 'sys_updated_by', 'sys_created_on', 'sys_created_by'];
var userID = gs.getUserID();
var defaultLists = getDefaultLists();

for(var i = 0; i < defaultLists.length; i++){
    var personalList = getPersonalList(defaultLists[i].name);
    if(personalList){
        deleteElements(personalList.getUniqueValue(), fieldsToAdd);
        var position = getPosition(personalList.getUniqueValue());
        addElements(personalList.getUniqueValue(), position, fieldsToAdd);   
    }else{
        personalList = createPersonalList(defaultLists[i].name);
        addElements(personalList, 0, defaultLists[i].elements);
        addElements(personalList, defaultLists[i].elements.length + 1, fieldsToAdd);
    }
}

function getDefaultLists(){
    var lists = [];
    var listGR = new GlideRecord('sys_ui_list');
    listGR.addQuery('view', 'Default view');
    listGR.addNullQuery('parent');
    listGR.query();
    while(listGR.next()){
        var list = {};
        list.sys_id = listGR.getUniqueValue();
        list.name = listGR.getValue('name');
        list.elements = getElements(listGR.getUniqueValue(), fieldsToAdd);
        lists.push(list);
    }
    return lists;
}

function getElements(listID, fields){
    var elements = [];
    var elementGR = new GlideRecord('sys_ui_list_element');
    elementGR.addQuery('list_id', listID);
	elementGR.addQuery('element', 'NOT IN', fields);
    elementGR.orderBy('position');
    elementGR.query();
    while(elementGR.next()){
        if(fieldsToAdd.indexOf(elementGR.getValue('element') == -1)){
            elements.push(elementGR.getValue('element'));
        }
    }
    return elements;
}

function getPersonalList(name){
    var listGR = new GlideRecord('sys_ui_list');
    listGR.addQuery('name', name);
    listGR.addQuery('sys_user', userID);
    listGR.addQuery('view', 'Default view');
    listGR.query();
    if(listGR.next()){
        return listGR;
    }
    else{return null;}
}

function deleteElements(listID, elementsToDelete){
    var elementGR = new GlideRecord('sys_ui_list_element');
    elementGR.addQuery('list_id', listID);
    elementGR.addQuery('element', 'IN', elementsToDelete);
    elementGR.query();
    while(elementGR.next()){
        elementGR.deleteRecord();
    }
}

function getPosition(listID){
    var elementGR = new GlideRecord('sys_ui_list_element');
    elementGR.addQuery('list_id', listID);
    elementGR.orderByDesc('position');
    elementGR.query();
    if(elementGR.next()){
        return elementGR.getValue('position');
    }
}

function addElements(listID, position, elements){
    var elementGR = new GlideRecord('sys_ui_list_element');
    for(var i = 0; i < elements.length; i++){
        elementGR.initialize();
        elementGR.setValue('position', position);
        elementGR.setValue('list_id', listID);
        elementGR.setValue('element', elements[i]);
        elementGR.insert();
        position++;
    }
}

function createPersonalList(listName){
    var listGR = new GlideRecord('sys_ui_list');
    listGR.initialize();
    listGR.setValue('name', listName);
    listGR.setValue('sys_user', userID);
    listGR.setValue('view', 'Default view');
    var list = listGR.insert();
    return list;
}
