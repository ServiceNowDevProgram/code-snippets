# Use Case
The OOB `GlideForm (g_form)` API has documentation on displaying messages of info, warning and error types on form view, but lack a success message. Moreover, this `g_form` API is not accessible on lists and hence makes it difficult to display list level messages.
However, SN provides another client-side method `GlideUI.get().addOutputMessage({options})` that can be used to display messages in native UI irrespective of form or list views. Even the popular `g_form.addInfoMessage(params)` API actually leverages the same `addOutputMessage(options)` method to render messages.
Custom icons can also be included, but the background colour is lost due to the way `.addOutputMessage()`  method has been implemented.

**Allowed icons (as per SN documentation):**
> icon-user, icon-user-group, icon-lightbulb, icon-home, icon-mobile, icon-comment, icon-mail, icon-locked, icon-database, icon-book, icon-drawer, icon-folder, icon-catalog, icon-tab, icon-cards, icon-tree-right, icon-tree, icon-book-open, icon-paperclip, icon-edit, icon-trash, icon-image, icon-search, icon-power, icon-cog, icon-star, icon-star-empty, icon-new-ticket, icon-dashboard, icon-cart-full, icon-view, icon-label, icon-filter, icon-calendar, icon-script, icon-add, icon-delete, icon-help, icon-info, icon-check-circle, icon-alert, icon-sort-ascending, icon-console, icon-list, icon-form, and icon-livefeed


# Output Screenshot

![image](https://github.com/annaydas/code-snippets/assets/29729050/7c93828c-d30a-4255-a97c-a2ee4f9126ac)


# Usage

### Success Message
```javascript
GlideUI.get().addOutputMessage({
    msg: 'Success',
    type: 'success',
    preventDuplicates: true
});
```

### Warning Message
```javascript
GlideUI.get().addOutputMessage({
    msg: 'Warning',
    type: 'warning',
    preventDuplicates: true
});
```

### Error Message
```javascript
GlideUI.get().addOutputMessage({
    msg: 'Error',
    type: 'error',
    preventDuplicates: true
});
```

### Info Message
```javascript
GlideUI.get().addOutputMessage({
    msg: 'Info',
    type: 'info',
    preventDuplicates: true
});
```

### Custom Icon (but it loses the background colour)
```javascript
GlideUI.get().addOutputMessage({
    msg: 'Custom Icon, but styling is lost',
    icon: 'icon-lightbulb',
    type: 'custom-message',
    preventDuplicates: true
});
```
