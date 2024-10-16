//Creating a user interface form that allows users to select a company from a list. The form includes a label prompting 
users to select an "SN Company," and utilizes the lightweight_glide_list2 macro to generate a dropdown list populated with active companies from the core_company table. 
The form also features "OK" and "Cancel" buttons in the modal footer, which trigger the onSubmit() and onCancel() 
functions, respectively, when clicked. This setup facilitates user interaction by enabling the selection of a company, 
which can be crucial for various processes within the ServiceNow platform.


<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

    <g:ui_form>
        <g:evaluate>
            var currRecSysId = RP.getWindowProperties().get('curr_rec_sysid') || '';
        </g:evaluate>

        <input type="hidden" name="curr_rec_sysid" value="$[currRecSysId]" />
        <input type="hidden" id="company_list" name="company_list" value="" />

        <br />
        <br />

        <p><label for="company"><b>SN Company</b></label></p>
        <g:macro_invoke macro="lightweight_glide_list2" id="comId" name="comId" control_name="comCollector" reference="core_company" query="u_active=true" can_write="true" />
        <br />

        <div class="modal-footer">
            <span class="pull-right">
                <g:dialog_buttons_ok_cancel ok="return onSubmit();" cancel="return onCancel();" />
            </span>
        </div>
    </g:ui_form>
</j:jelly>
