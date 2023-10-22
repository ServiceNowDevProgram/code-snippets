********** UI Action Code **********
  //Client callable : true
  //OnClick : fetchHTML();
  //table : incident
  
  function fetchHTML() {
	var dialog = new GlideDialogWindow("my_page"); 
    dialog.setTitle('Fetch table fields');
	dialog.setSize('600', '600');
    dialog.setPreference("sysparm_sys_id", g_form.getUniqueValue());
    dialog.render();
}

********** End of UI Action code **********
  
********** UI Page code **********
// Name of ui page : my_page
  
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
<g:evaluate var="jvar_sysId" expression="RP.getWindowProperties().get('sysparm_sys_id')" />
<g:evaluate jelly = "true"  object="true">

var gr_inc = new GlideRecord('incident');
gr_inc.addQuery('sys_id', jelly.jvar_sysId);
gr_inc.query();
gr_inc;
</g:evaluate>
<div>
<h2>Fetch Incident fields in UI Page</h2>	
  <body>
        <div>
            <p>	
				    <j:while test="${gr_inc.next()}">  
				    <div>
	                    <h2>Caller </h2>
 <p>The Caller is : <span value="${gr_inc.sys_id}">${gr_inc.caller_id.getDisplayValue()}</span></p>
	                </div>
					<div>
						<h2>Incident Short Description</h2>
				        <p value="${gr_inc.sys_id}">${gr_inc.short_description()}</p>
					</div>
					<div>	
						<h2>Incident Description</h2>
				        <p value="${gr_inc.sys_id}">${gr_inc.description()}</p>
				    </div>
				   
				</j:while> <!-- The entire content needs to be written inside this while loop.-->
                <!-- End -->
			</p> <!-- Any content outside this p tag will not fetch the Incident fields -->
        </div>
    </body>	
</div>
</j:jelly>

********** End of UI Page code **********
