******HTML*****
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

	<style>
		.hide{
			visibility: hidden;
		}
		.show{
			visibility: visible;
		}
	</style>

	<label for="collapsibleTitle">Title</label>
    <input type="text" class="form-control" id="collapsibleTitle" placeholder="Your collapsible title goes here" />

	<br />

	<label for="collapsibleContent">Content body</label>
    <textarea class="form-control" id="collapsibleContent" rows="3"></textarea>

	<br />

	<div class="alert alert-danger hide" id="alert" role="alert">
		<b>Title</b> and <b>Content body</b> should not be empty.
	</div>

	<br/>
	
	<button type="button" class="btn btn-primary" style="float: right;" onclick="updateForm()">Add collapsible</button>
</j:jelly>
****************

**Client Script**
function updateForm() {
    $j("#alert").removeClass("show");
    $j("#alert").addClass("hide");

    var title = $j("#collapsibleTitle").val();
    var content = $j("#collapsibleContent").val();

    if (title.trim() == "" || content.trim() == "") {
        $j("#alert").removeClass("hide");
        $j("#alert").addClass("show");

        return;
    }

    var articleText = g_form.getValue("text");
    var collapsibleElement = "<details style='width: 100%; border: 1px solid #ccc;'><summary style='cursor: pointer; padding: 15px; background: #e8e8e8;'>" + title.trim() + "</summary><div style='padding: 15px;'>" + content.trim() + "</div></details>";

	g_form.setValue("text", articleText + collapsibleElement);
	GlideDialogWindow.get().destroy()
}