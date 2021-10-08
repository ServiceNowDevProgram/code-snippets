# Add "Copy Variable Name" to Context Menu

Adds code to the element_context UI Macro, allowing for admins to be able to right click a variable name and choose "Copy Variable Name" to quickly get the column name to their clipboard

## where to add

1. In the sys_ui_macro (Macros) table, open the record `element_context`
2. Replace the existing `<j:if test="${jvar_personalize_dictionary == true }" >` block with the block in element context.xml

## full XML for element_context example

This code is from an out-of-box instance with the necessary code, you can replace the existing element_context xml with this:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
  <script>
    var table = "${sysparm_table}";
    var id = "${sysparm_id}";
    var type = "${sysparm_type}";
    var choice = "${sysparm_choice}";
    var count = 0;

    var gcm = new GwtContextMenu('context_personalize_menu');
    gcm.setTableName('${ref}');
    gcm.clear();

    <g:evaluate var="jvar_personalize_dictionary" expression="gs.hasRole('personalize_dictionary')" />
    <g:evaluate var="jvar_personalize_styles" expression="gs.hasRole('personalize_styles')" />
    <g:evaluate var="jvar_personalize_security" expression="gs.hasRole('security_admin')" />
    <g:evaluate var="jvar_personalize_responses" expression="gs.hasRole('personalize_responses')" />
    <g:evaluate var="jvar_personalize_choices" expression="gs.hasRole('personalize_choices')" />
    <g:evaluate var="jvar_field_parts" object="true" jelly="true">
        var fieldParts = jelly.sysparm_id.substring(jelly.sysparm_table.length + 1).split('.');
    </g:evaluate>
    <g:evaluate var="jvar_table_dot_do" jelly="true">
        var tableDo = 'sys_dictionary.do';
        // see if our parent is named 'var__m_...', 
        // in which case we are a variable and need to use the correct .do
        if (fieldParts.length > 1) {
            var parentName = fieldParts[fieldParts.length - 2];
            if (parentName.indexOf('var__m_') == 0) {
                var gr = new GlideRecord('sys_dictionary');
                gr.setDisplayFields(['sys_class_name']);
                gr.addQuery('name', parentName);
                gr.addQuery('element', fieldParts[fieldParts.length - 1]);
                gr.query();
                if (gr.next())
                    tableDo = gr.sys_class_name + ".do";
            }
        }
        tableDo;
    </g:evaluate>
    <g:evaluate var="jvar_field_name">
        fieldParts[fieldParts.length -1];
    </g:evaluate>
    <j:if test="${jvar_personalize_dictionary == true }">
        gcm.addHref("${JS:gs.getMessage('Configure Label')}", 
            "personalizeField('" + id + "', 'sys_documentation.do');");
        gcm.addHref("${JS:gs.getMessage('Configure Dictionary')}", 
            "personalizeField('" + id + "', '" + '${jvar_table_dot_do}' + "');");
        count = 1;
    </j:if>
    <j:if test="${jvar_personalize_styles == true }">
        gcm.addHref("${JS:gs.getMessage('Configure Styles')}",
            "showList('sys_ui_style', 'name.element', '" + id + "');");
        count = 1;
    </j:if>
    <j:if test="${jvar_personalize_security == true}">
       <j:if test="${sysparm_contextual_security == true}">
          gcm.addHref("${JS:gs.getMessage('Configure Security')}", 
              "personalizeSecurity('" + table + "', '" + id + "');");
          gcm.addHref("${JS:gs.getMessage('Show Security Rules')}",
              "listSecurity('" + table + "', '" + id + "');");
          count = 1;
       </j:if>
    </j:if>
    if ((choice != 0 ${AND} type != 'sys_class_name') || type == 'choice') {
        var disabled = needSubDisabled(table, id);
        if (count != 0)
            gcm.addLine();

        if (type.substring(0, 7) == 'journal') {
            <j:if test="${jvar_personalize_responses == true }">
                var c = gcm.addHref("${JS:gs.getMessage('Configure Responses')}",
                    "personalizeResponses('" + id + "');");

                if (disabled == true)
                    gcm._dullItem(c);

                count = 1;
            </j:if>
        } else {
            <g:evaluate var="jvar_personalize_choices_rights">
                var url = 'record/' + '${sysparm_table}' + '.' + '${jvar_field_name}' + '/personalize_choices';
                GlideSecurityManager.get().hasRightsTo(url, gs.getUser());
            </g:evaluate>
            <j:if test="${jvar_personalize_choices == true || jvar_personalize_choices_rights == true }">
                var c = gcm.addHref("${JS:gs.getMessage('Configure Choices')}",
                    "personalizeChoices('" + id + "');");
                if (disabled == true)
                    gcm._dullItem(c);

                count = 1;
            </j:if>
            <j:if test="${jvar_personalize_choices == true }">
                gcm.addHref("${JS:gs.getMessage('Show Choice List')}",
                    "showList('sys_choice', 'name.element', '" + id + "');");
                count = 1;
            </j:if>
        }
    }
    <j:if test="${jvar_personalize_dictionary == true }" >
        // Custom "Copy Field Name"
        gcm.addLine();
        gcm.addHref("${JS:gs.getMessage('Copy Field Name')}", "copyToClipboard('${jvar_field_name}');");
        gcm.addHref("${JS:gs.getMessage('Copy Field Value')}", "copyToClipboard(g_form.getValue('${jvar_field_name}'));");
		gcm.addHref("${JS:gs.getMessage('Copy Field Display Value')}", "copyToClipboard(g_form.getDisplayBox('${jvar_field_name}').value);");
        gcm.addLine();
        gcm.addHref("${JS:gs.getMessage('Show')}" + " - '" + '${jvar_field_name}' + "'",
            "showDictionary('" + table + "', '" + id + "');");
        count = 1;
    </j:if>

    if(showWatchMenu(true) == true) {
        gcm.addHref("${JS:gs.getMessage('Watch')}" + " - '" + '${jvar_field_name}' + "'", "showWatchField('" + id + "');");
        count = 1;
    }

    if(showWatchMenu(false) == true) {
        gcm.addHref("${JS:gs.getMessage('Unwatch')}" + " - '" + '${jvar_field_name}' + "'", "clearWatchField('" + id + "');");
        count = 1;
    }

    if (count == 0)
        gcm = null;

    function needSubDisabled(table, id) {
        var dep = $('ni.dependent_reverse.' + id);
        if (dep ${AND} dep.value) {
            var p = dep.value;
            var d = table + "." + p;
            p = $(d);
            if (p ${AND} p.value == '')
                return true;
        }
    
        return false;
    }

    function isWatch() {
        if (type == 'password' || type == 'password2' || type == 'glide_encrypted')
            return false;
        var isOpticsPluginActive = ${pm.isActive('com.snc.optics_inspector')}; 
        //Debug icon will be displayed for admin or admin impersonated users
        var isAdmin = ${new GlideImpersonate().canImpersonate(gs.getUserID())};
        if (isOpticsPluginActive ${AND} isAdmin) {
            var el = $('label.' + id);
            if (el ${AND} !hasClassName(el, 'foreign'))
                return true;
        }
        return false;
    }

    function showWatchMenu(showWatch) {
        var flag = false;
        // We're checking document location against top to see if the full real estate is available
        // or if we're isolated in a single page (Field Watcher panel not available).
        if (isWatch() ${AND} top.document.location.href != document.location.href) {
            var isWatchActive = ('${sysparm_id}' === '${gs.getSession().getWatchField()}') ? true : false;
            if (showWatch ${AND} !isWatchActive)
                flag = true;
            else if (!showWatch ${AND} isWatchActive)
                flag = true;
        }
        return flag;
    }

  </script>
</j:jelly>
```