function getGlideFormAW() {
    function collectDeepElements(selector) {
        var results = [];
        var queue = [document];
        var visited = [];

        while (queue.length > 0) {
            var node = queue.shift();
            if (!node || visited.indexOf(node) >= 0) {
                continue;
            }
            visited.push(node);

            if (node.querySelectorAll) {
                var matches = node.querySelectorAll(selector);
                for (var i = 0; i < matches.length; i++) {
                    results.push(matches[i]);
                }
            }

            var descendants = [];
            if (node.querySelectorAll) {
                descendants = node.querySelectorAll("*");
            } else if (node.children) {
                descendants = node.children;
            }
            for (var j = 0; j < descendants.length; j++) {
                if (descendants[j] && descendants[j].shadowRoot) {
                    queue.push(descendants[j].shadowRoot);
                }
            }
        }

        return results;
    }

    function fromSnFormDataConnected() {
        var connected = collectDeepElements("sn-form-data-connected");
        for (var i = 0; i < connected.length; i++) {
            var gForm = connected[i] && connected[i].nowRecordFormBlob && connected[i].nowRecordFormBlob.gForm;
            if (gForm) {
                return gForm;
            }
        }
        return null;
    }

    function fromSnWorkspaceForm() {
        var workspaceForms = collectDeepElements(".sn-workspace-form");
        for (var i = 0; i < workspaceForms.length; i++) {
            var snWorkspaceFormEl = workspaceForms[i];
            var reactInternalInstanceKey = Object.keys(snWorkspaceFormEl).find(function (objKey) {
                return objKey.indexOf("__reactInternalInstance$") >= 0;
            });
            var reactNode = reactInternalInstanceKey && snWorkspaceFormEl[reactInternalInstanceKey];
            if (reactNode && reactNode.return && reactNode.return.stateNode
                && reactNode.return.stateNode.props
                && reactNode.return.stateNode.props.glideEnvironment
                && reactNode.return.stateNode.props.glideEnvironment._gForm) {
                return reactNode.return.stateNode.props.glideEnvironment._gForm;
            }
        }
        return null;
    }

    return fromSnFormDataConnected() || fromSnWorkspaceForm();
}
