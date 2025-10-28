*****************HTML Section Start*****************
<style>
    /* dialog styles */
    .dialog_content {
        width: 100%;
        height: 100px;
        vertical-align: middle;
        min-width: 300px;
        padding: 0 10px 10px 10px;
    }

    .dialog_buttons {
        display: inline;
        text-align: right;
        vertical-align: bottom;
        white-space: nowrap;
    }

    .modal-header {
        background-color: #d9edf7;
        color: #31708f;
    }

    .modal-content {
        border-color: #bce8f1;
        border-width: medium !important;
    }
</style>
<g:ui_form onsubmit="return invokePromptCallBack();">
    <g2:evaluate>
        var infoText = "${RP.getWindowProperties().get('infoText')}";
        infoText = new GlideStringUtil().unEscapeHTML(infoText);
        var warning = "${RP.getWindowProperties().get('warning')}";
        warning = new GlideStringUtil().unEscapeHTML(warning);
        var alertType = "${RP.getWindowProperties().get('alertType')}";
    </g2:evaluate>
    <j2:if test="$[alertType == 'warning']">
        <style>
            .modal-header {
                background-color: #fcf8e3;
                color: #8a6d3b;
            }

            .modal-content {
                border-color: #faebcc;
                border-width: medium !important;
            }
        </style>
    </j2:if>
	<j2:if test="$[alertType == 'danger']">
        <style>
            .modal-header {
                background-color: #f2dede;
                color: #a94442;
            }

            .modal-content {
                border-color: #ebccd1;
                border-width: medium !important;
            }
        </style>
    </j2:if>
	<j2:if test="$[alertType == 'success']">
        <style>
            .modal-header {
                background-color: #dff0d8;
                color: #3c763d;
            }

            .modal-content {
                border-color: #d6e9c6;
                border-width: medium !important;
            }
        </style>
    </j2:if>
    <table border="0" width="100%">
        <tr>
            <td>
                <table border="0" width="100%">
                    <tr>
                        <td class="dialog_content" id="bodycell"></td>
                    </tr>
                    <tr>
                        <td class="dialog_buttons">
                            <g:dialog_button_ok ok="invokePromptCallBack();" ok_type="button" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</g:ui_form>
*****************HTML Section End*****************

*****************Client Script Start*****************
function unescapeHTML(html) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = html; // Set the HTML content
    return textarea.value; // Return the unescaped text
}

var infoText = "${RP.getWindowProperties().get('infoText')}";
infoText = unescapeHTML(infoText); // Unescape the HTML

// Now set the title to your dialog or display it
document.getElementById('bodycell').innerHTML = infoText; // Assuming there's a titleCell in your HTML

function invokePromptCallBack() {
    var gdw = GlideDialogWindow.get();
    gdw.destroy();
    return false;
}

var gdw = GlideDialogWindow.get();
gel('ok_button').focus();
*****************Client Script Start*****************
