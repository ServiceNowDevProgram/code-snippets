******HTML*****
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
	<g:ui_form>
<div style="font-size:18px;">
	<p style="margin-bottom:15px; margin-bottom:10px;"> Please go through this knowledge&#160;<a href ="www.google.com">article</a>&#160;before raising a priority incident</p>
<button class="btn btn-success" style="margin-right:10px;" onclick="proceedFurther()" type="button">Proceed</button>
<button class="btn btn-danger" onclick="cancelAlert()" type="button">Cancel</button> 
	</div>
 </g:ui_form>
</j:jelly>
****************

**Client Script**
function cancelAlert(){
GlideDialogWindow.get().destroy();
}
function proceedFurther(){
g_form.save();
}
