//Example Usage of the Script Include ArrayUtil  
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
