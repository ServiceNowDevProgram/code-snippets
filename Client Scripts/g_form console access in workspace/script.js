function getGlideFormAW() {
    try {
        // Look for the HR Agent Workspace root element
        const recordShell = document.querySelector('now-record-page-shell');
        if (!recordShell || !recordShell.shadowRoot) {
            throw new Error('HR workspace shell not found');
        }

        // Find the form element in the new Utah structure
        const formElement = recordShell.shadowRoot.querySelector('now-record-form-connected');
        if (!formElement || !formElement.shadowRoot) {
            throw new Error('Form element not found');
        }

        // Find the React instance key
        const reactKey = Object.keys(formElement).find(key => 
            key.startsWith('__reactFiber$') || 
            key.startsWith('__reactInternalInstance$')
        );

        if (!reactKey) {
            throw new Error('React instance not found');
        }

        // Navigate the React fiber tree to find g_form
        let fiber = formElement[reactKey];
        while (fiber) {
            if (fiber.stateNode?.props?.glideEnvironment?._gForm) {
                return fiber.stateNode.props.glideEnvironment._gForm;
            }
            fiber = fiber.return;
        }

        throw new Error('g_form not found in component tree');
    } catch (error) {
        console.error('Error accessing g_form:', error);
        throw error;
    }
}

// Usage example:
// var g_form = getGlideFormAW();