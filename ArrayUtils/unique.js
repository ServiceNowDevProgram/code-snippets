//ArrayUtil API is a useful utility in ServiceNow with useful functions for working with JavaScript arrays
//Below is an example of using unique method to make items in an array unique
  var obj=[];	
	var arrayUtil = new ArrayUtil();
	var gr= new GlideRecord('incident');	
	gr.addOrderBy('category');
	gr.query();
	while(gr.next()){			
		obj.push(gr.getValue('category'));
	}
	obj = arrayUtil.unique(obj);
	gs.info(obj);
