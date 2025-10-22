var quickChange = new GlideRecord('yourtablename'); 
quickChange.addQuery('field_to_filter_on', 'data_to_be_changed'); // adjust query to find the offending records
quickChange.setValue('field_to_change', 'change_you_want'); // setvalue is your friend, but make sure you can use it on the field
quickChange.setWorkflow(false); //Optional to decide if you want other workflows to be invoked as a result
quickChange.updateMultiple(); //notice the lack of query or checking or anything this puppy just goes