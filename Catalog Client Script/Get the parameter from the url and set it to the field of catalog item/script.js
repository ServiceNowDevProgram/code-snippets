function onLoad() {
  //https://dev___.service-now.com/sp?id=sc_cat_item&sys_id=sys_id&parameter=parameter url of the catalog item
	var parameter = top.location.href.split("?")[1].split("&").find(function(e){ return e.split('=')[0] == 'parameter';}).split("=")[1];//fetching the parameter from the url
	if (parameter) {
	g_form.setValue('field', parameter); // setting the field value to the parameter value
	}
}
