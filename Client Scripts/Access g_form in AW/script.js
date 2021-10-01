function getGlideFormAW() {
    document.getElementsByTagName("sn-workspace-content")[0].shadowRoot.querySelectorAll("now-record-form-connected")[0]

    var firstContentChild = document.getElementsByTagName("sn-workspace-content")[0].shadowRoot
        .querySelectorAll(".chrome-tab-panel.is-active")[0].firstChild;

    var snWorkspaceFormEl;
    if (firstContentChild.tagName == "NOW-RECORD-FORM-CONNECTED") {
        snWorkspaceFormEl = firstContentChild.shadowRoot.querySelectorAll(".sn-workspace-form")[0];
    } else {
        snWorkspaceFormEl = firstContentChild.shadowRoot.querySelectorAll("now-record-form-connected")[0]
            .shadowRoot.querySelectorAll(".sn-workspace-form")[0];
    }
    if (!snWorkspaceFormEl) throw "Couldn't find sn-workspace-form";

    var reactInternalInstanceKey = Object.keys(snWorkspaceFormEl).find(function (objKey) {
        if (objKey.indexOf("__reactInternalInstance$") >= 0) {
            return true;
        }
        return false;
    });
    return snWorkspaceFormEl[reactInternalInstanceKey].return.stateNode.props.glideEnvironment._gForm;
}