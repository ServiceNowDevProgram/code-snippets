1. This is a Before-Busines rule created on Change Request Table
2. I used GlideAggregate API.
3. only update is checked
4. conditions were Type is Emergency AND State changes to Close.
5. For emergency change Request, if there are no attached incident's to it then we don't let the user to move the state to close.
6. We use glideAggregate to glide Incident table and if we find any incident's user can move the state to close, But if there is no records then user action will be aborted.
