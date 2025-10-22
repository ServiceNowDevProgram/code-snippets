/**
 * Returns the active delegates for a given user, returning only the types required
 * @example
 * getDelegatesForType(gs.getUserID(), ["approvals"]);  // return only those flagged as approvals
 * getDelegatesForType(gs.getUserID(), ["approvals", "notifications"]); // return flagged as both approvals and notifications
 * @param {string} userId sys_id of the user to get delegates for
 * @param {Array} delegateTypes types of delegate to return, can be a combination of "approvals", "notifications", "assignments", "invitations".  Query is AND, so all specified must be true
 * @returns {JSON} Array of delegates in the format
 * [
 *    {
 *       "name": "delegate_name",
 *       "sys_id" : "sys_id of delegate",
 *       "starts" : "start date/time",
 *       "ends" : "end date/time",
 *    }
 * ]
 */
function getDelegatesForType(userId, delegateTypes) {
    delegateTypes = delegateTypes || [];  // if no delegate types passed then assume empty error
    delegateTypes = !Array.isArray(delegateTypes) ? [ delegateTypes ] : delegateTypes;  // if delegateTypes is not an array then force to be one.
    
    // start initial GlideQuery, for the passed in user and active delegates
    var gqDelegate = new global.GlideQuery('sys_user_delegate')
        .where('user', userId)
        .where('starts', '<=', 'javascript:gs.daysAgo(0)')
        .where('ends', '>=', 'javascript:gs.daysAgo(0)');

    // for each of the delegate types required, add a where clause to the GlideQuery
    delegateTypes.forEach(function (_type) {
        gqDelegate = gqDelegate.where(_type, true);
    });

    // finish off the GlideQuery, selecting the delegate info
    gqDelegate = gqDelegate.select(['delegate', 'delegate$DISPLAY', 'starts', 'ends'])
        .map(function (_delegate) {
            // we don't want fields called $DISPLAY, so map to a new usable object
            return {
                "name": _delegate.delegate$DISPLAY,
                "sys_id": _delegate.delegate,
                "starts": _delegate.starts,
                "ends": _delegate.ends
            }
        })
        .reduce(function (arr, e) { arr.push(e); return arr; }, []); // return delegates as an array

    return gqDelegate;
}
