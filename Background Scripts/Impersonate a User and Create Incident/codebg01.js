var user=new GlideUser();
user.setUserByID('itil');
gs.print("Impersonated User : "+user.getDisplayName());
var gr=new GlideRecord("incident");
gr.initialize();
gr.short_description="Incident Created by Impersonated User";
gr.insert();
gs.print("Created Incident by "+ user.getDisplayName());
