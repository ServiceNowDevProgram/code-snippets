//Serverside code for Menu Item -



(function() {
   

    var userID = gs.getUserID(); //Logged in user 
    var gr = new GlideRecord('sn_hr_core_profile');
    gr.addQuery('user', userID);
    gr.query();

    if (gr.next()) {
        data.saltype = gr.getValue('employee_class').toString();
        console.log(data.saltype);
    }

    // Widget Header Stuff

    data.imgImage = options.header_image;
    data.imgTitle = options.header_title;

    // Menu Item 1

    data.item_1_TITLE = options.item_1_title;
    data.item_1_IMG = options.item_1_img;
    data.item_1_URL = options.item_1_url;
    data.item_1_TARGET = options.item_1_target;

   
    // Menu Item 2

    data.item_3_TITLE = options.item_3_title;
    data.item_3_IMG = options.item_3_img;
    data.item_3_URL = options.item_3_url;
    data.item_3_TARGET = options.item_3_target;

   
   
})();


