var categoriesList = [];

function GetAllTheCategoriesRelatedToAKnowledgeBase(parentID, categoriesList) {

    if (!parentID)
        return;

    var catGr = new GlideRecord('kb_category');
    catGr.addQuery('parent_id', parentID);
    catGr.query();
    while (catGr.next()) {
        categoriesList.push(catGr.getValue('sys_id'));
        gs.info(catGr.getValue('label'));
        GetAllTheCategoriesRelatedToAKnowledgeBase(catGr.getValue('sys_id'), categoriesList);
    }
    return categoriesList;

}
gs.info(GetAllTheCategoriesRelatedToAKnowledgeBase('a7e8a78bff0221009b20ffffffffff17' /*replace with your Knowledge Base Sysid*/ , categoriesList));
