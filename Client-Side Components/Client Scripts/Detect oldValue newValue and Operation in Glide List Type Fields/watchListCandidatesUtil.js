var watchListCandidatesUtil = Class.create();
watchListCandidatesUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {


    getWatchListUsers: function() {

        var oldUsers = this.getParameter('sysparm_old_values');
        var newUsers = this.getParameter('sysparm_new_values');

        var result = {
            oldU: this._getUserNames(oldUsers),
            newU: this._getUserNames(newUsers)
        };

        return JSON.stringify(result);
    },

    
    _getUserNames: function(userList) {
        var names = [];

        var grUserTab = new GlideRecord('sys_user');
        grUserTab.addQuery('sys_id', 'IN', userList);
        grUserTab.query();
        if (grUserTab.hasNext()) {
            while (grUserTab.next()) {
                names.push(grUserTab.getDisplayValue('name'));
            }
            return names.toString();
        } else {
            return 'No record found';
        }
    },


    type: 'watchListCandidatesUtil'
});
