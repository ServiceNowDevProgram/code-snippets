function onChange(control, oldValue, newValue, isLoading) {
  
  
        // Do nothing when loading the form or no change in the category.  
	      if(isLoading || newValue == oldValue){
     	      return;
    	  }

        //Hide Subcategory if the selction of category is 'None'.
        if (newValue == '') {
            g_form.setMandatory('subcategory', false);
            g_form.setDisplay('subcategory', false);
        }
        //Clear the subcategory before adding new options values.
        g_form.clearOptions('subcategory');

        //Get the list of Subcategories based on the selection of Category value.
        var ajax_query = new GlideAjax('DynamicListAjax');
        ajax_query.addParam('sysparm_name', 'getList');
        ajax_query.addParam('sysparm_table', 'incident');
        ajax_query.addParam('sysparm_dependent', newValue);
        ajax_query.addParam('sysparm_element', 'subcategory');
        ajax_query.getXML(loadSubCategory);

        function loadSubCategory(response) {

            var answer = response.responseXML.documentElement.getAttribute("answer");
            //add the choice list to the subcategory if exist.
            if (answer) {
                answer = Array.from(new Set(answer.split(','))).toString();
                var subcat_list = answer.split(",");

                g_form.addOption('subcategory', '', '-- None --');
              
                //add the list of options retrieved to the Subactegory field
                for (var i = 0; i < returned_subcat_list.length; i++) {
                    if (returned_subcat_list[i] != "") {
                        var value_label_pair = subcat_list[i].split(':');
                        g_form.addOption('subcategory', value_label_pair[0], value_label_pair[1]);
                    }
                }
                g_form.setDisplay('subcategory', true);
                g_form.setMandatory('subcategory', true);
            } else { // hide subcategory if no choice list exist
                g_form.setMandatory('subcategory', false);
                g_form.setDisplay('subcategory', false);
            }
        }

    }
