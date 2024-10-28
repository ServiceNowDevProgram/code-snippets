var fieldsToAdd = new Set([
  "sys_updated_on",
  "sys_updated_by",
  "sys_created_on",
  "sys_created_by",
]);
var userID = gs.getUserID();
var defaultLists = getDefaultLists();

defaultLists.forEach(function (defaultList) {
  var personalList = getPersonalList(defaultList.name);
  if (personalList) {
    updatePersonalList(personalList, defaultList);
  } else {
    personalList = createPersonalList(defaultList.name);
    addElements(personalList, 0, defaultList.elements);
    addElements(
      personalList,
      defaultList.elements.length,
      Array.from(fieldsToAdd)
    );
  }
});

function getDefaultLists() {
  var lists = [];
  var listGR = new GlideRecord("sys_ui_list");
  listGR.addQuery("view", "Default view");
  listGR.addNullQuery("parent");
  listGR.query();

  while (listGR.next()) {
    lists.push({
      sys_id: listGR.getUniqueValue(),
      name: listGR.getValue("name"),
      elements: getElements(listGR.getUniqueValue()),
    });
  }
  return lists;
}

function getElements(listID) {
  var elements = [];
  var elementGR = new GlideRecord("sys_ui_list_element");
  elementGR.addQuery("list_id", listID);
  elementGR.addQuery("element", "NOT IN", Array.from(fieldsToAdd));
  elementGR.orderBy("position");
  elementGR.query();

  while (elementGR.next()) {
    var element = elementGR.getValue("element");
    if (!fieldsToAdd.has(element)) {
      elements.push(element);
    }
  }
  return elements;
}

function getPersonalList(name) {
  var listGR = new GlideRecord("sys_ui_list");
  listGR.addQuery("name", name);
  listGR.addQuery("sys_user", userID);
  listGR.addQuery("view", "Default view");
  listGR.query();

  return listGR.next() ? listGR : null;
}

function updatePersonalList(personalList, defaultList) {
  deleteElements(personalList.getUniqueValue(), Array.from(fieldsToAdd));
  var position = getPosition(personalList.getUniqueValue());
  addElements(personalList.getUniqueValue(), position, Array.from(fieldsToAdd));
}

function deleteElements(listID, elementsToDelete) {
  var elementGR = new GlideRecord("sys_ui_list_element");
  elementGR.addQuery("list_id", listID);
  elementGR.addQuery("element", "IN", elementsToDelete);
  elementGR.query();

  while (elementGR.next()) {
    elementGR.deleteRecord();
  }
}

function getPosition(listID) {
  var elementGR = new GlideRecord("sys_ui_list_element");
  elementGR.addQuery("list_id", listID);
  elementGR.orderByDesc("position");
  elementGR.query();

  return elementGR.next() ? elementGR.getValue("position") : 0; // Return 0 if no elements found
}

function addElements(listID, position, elements) {
  var elementGR = new GlideRecord("sys_ui_list_element");
  elements.forEach(function (element) {
    elementGR.initialize();
    elementGR.setValue("position", position++);
    elementGR.setValue("list_id", listID);
    elementGR.setValue("element", element);
    elementGR.insert();
  });
}

function createPersonalList(listName) {
  var listGR = new GlideRecord("sys_ui_list");
  listGR.initialize();
  listGR.setValue("name", listName);
  listGR.setValue("sys_user", userID);
  listGR.setValue("view", "Default view");
  return listGR.insert(); // Returns the sys_id of the created list
}
