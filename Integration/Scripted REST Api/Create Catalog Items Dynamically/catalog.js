// Scenario : As a ServiceNow Admin or Developer managing dozens of similar request forms (like “Request Laptop”, “Request Mobile”, “Request Access”, etc.).
// Manually creating each catalog item is repetitive.

// This code will Automate Catalog Item Creation with a Single REST Call
//Script: POST /api/x_demo/catalog_creator/create

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var body = request.body.data;
    var result = {};

    try {
        // 1. Create Catalog Item
        var catItem = new GlideRecord('sc_cat_item');
        catItem.initialize();
        catItem.name = body.name;
        catItem.short_description = body.short_description || '';
        catItem.description = body.description || '';
        catItem.category = getCategorySysId(body.category);
        catItem.owning_group = getOwner(body.owner);
        catItem.active = true;
        var catSysId = catItem.insert();

        result.catalog_sys_id = catSysId;

        // 2. Create Variables
        if (body.variables && body.variables.length > 0) {
            for (var i = 0; i < body.variables.length; i++) {
                var v = body.variables[i];

                var variable = new GlideRecord('item_option_new');
                variable.initialize();
                variable.cat_item = catSysId;
                variable.name = v.name.toLowerCase().replace(/ /g, '_');
                variable.question_text = v.name;
                variable.type = getType(v.type);
                variable.order = (i + 1) * 100;
                var varSysId = variable.insert();

                // Add choices for select box variables
                if (v.choices && v.choices.length > 0) {
                    var choices = v.choices.split(',');
                    for (var j = 0; j < choices.length; j++) {
                        var choice = new GlideRecord('question_choice');
                        choice.initialize();
                        choice.question = varSysId;
                        choice.value = choices[j].trim();
                        choice.label = choices[j].trim();
                        choice.insert();
                    }
                }
            }
        }

        result.message = "Catalog item created successfully!";
        response.setStatus(201);

    } catch (e) {
        gs.error("Error creating catalog item: " + e);
        result.message = e.toString();
        response.setStatus(500);
    }

    response.setBody(result);


    function getCategorySysId(categoryName) {
        var cat = new GlideRecord('sc_category');
        cat.addQuery('title', categoryName);
        cat.query();
        if (cat.next()) return cat.sys_id;
        return null;
    }

    function getOwner(ownerName) {
        var usr = new GlideRecord('sys_user');
        usr.addQuery('user_name', ownerName);
        usr.query();
        if (usr.next()) return usr.sys_id;
        return gs.getUserID();
    }

    function getType(typeName) {
        var map = {
            "single_line_text": 1,
            "multi_line_text": 2,
            "select_box": 3,
            "reference": 8,
            "checkbox": 5
        };
        return map[typeName] || 1;
    }

})(request, response);

//Example JSON
//{
  "name": "Request New Laptop",
  "category": "Hardware",
  "short_description": "Laptop provisioning form",
  "description": "Allows employees to request a new laptop.",
  "owner": "admin",
  "variables": [
    {
      "name": "Laptop Model",
      "type": "select_box",
      "choices": "Dell,HP,Lenovo"
    },
    {
      "name": "RAM Size",
      "type": "select_box",
      "choices": "8GB,16GB,32GB"
    },
    {
      "name": "Business Justification",
      "type": "multi_line_text"
    }
  ]
}

