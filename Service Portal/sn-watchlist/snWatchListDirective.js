function snWatchlistDirective($http, $q) {
  return {
    restrict: "E",
    require: ["ngModel", "snWatchlist"],
    template:
      '<div class="m-b watchList select2-container-multi"><label>{{c.label}}</label>   <input name="watchlist" type="text" ng-model="c.searchWatchListUserContent" ng-blur="c.searchWatchListUserContent = \'\'" ng-attr-placeholder={{c.placeholder}} ng-model-options="{debounce: 250}" autocomplete="off" uib-typeahead="item as item.name for item in c.getWatchListResults($viewValue)" typeahead-on-select="c.onWatchListAdd($item)" typeahead-template-url="user-search.html" typeahead-min-length="0" typeahead-focus-on-select="false" class="form-control input-typeahead m-b">   <ul class="list-group select2-choices"><li ng-repeat="user in c.watchList" class="list-group-item attachment-list-item select2-search-choice"><a ng-click="c.removeFromWatchList(user)" class="select2-search-choice-close fa fa-times" role="button" href="#" ng-attr-aria-label="{{c.getAriaLabel(user.name)}}"></a><div class="attachment-details"><span>{{ user.name }}</span></div></li></ul> </div> ',
    scope: {
      label: "@",
      placeholder: "@",
    },
    link: function ($scope, $element, $attrs, $ctrls) {
      var $modelCtrl = $ctrls[0];
      var c = $ctrls[1];

      $modelCtrl.$render = function () {
        c.watchList = $modelCtrl.$modelValue || [];
      };

      c.onWatchListAdd = function ($item) {
        $modelCtrl.$setViewValue(c.watchList.concat($item));
        c.watchList.push($item);
        c.searchWatchListUserContent = null;
      };

      c.removeFromWatchList = function (deletedUser) {
        c.watchList = c.watchList.filter(function (currentUser) {
          if (!currentUser.sys_id || !deletedUser.sys_id) {
            return currentUser.email != deletedUser.email;
          } else {
            return (
              currentUser.sys_id != deletedUser.sys_id &&
              currentUser.email != deletedUser.email
            );
          }
        });
        $modelCtrl.$setViewValue(c.watchList);
      };
    },
    bindToController: true,
    controller: function ($http, $templateCache) {
      var c = this;

      c.$onInit = function () {
        $templateCache.put(
          "user-search.html",
          '<a class="ta-item" href="javascript:void(0)"><span ng-bind-html="match.model.name | uibTypeaheadHighlight:query"></span></a>'
        );
      };

      c.getAriaLabel = function (name) {
        return "Remove " + name + " from watchlist";
      };

      c.getWatchList = function () {
        return c.watchList
          .map(function (user) {
            return user.sys_id || user.email;
          })
          .join(",");
      };

      c.existsInWatchList = function (user) {
        var existsInList = false;
        c.watchList.forEach(function (listEntry) {
          if (user.name === listEntry.name) {
            existsInList = true;
          } else if (user.email === listEntry.email) {
            existsInList = true;
          }
        });
        return existsInList;
      };

      c.getWatchListResults = function (query) {
        var responseArr = [];
        var emailCheck = /\S+@\S+\.\S+/;
        if (query && query.match(emailCheck)) {
          if (
            !c.existsInWatchList({
              email: query,
            })
          ) {
            responseArr.push({
              name: query,
              sys_id: "",
              email: query,
            });
          }
          return responseArr;
        } else {
          var url =
            "/api/now/table/sys_user?sysparm_limit=10&sysparm_query=active=true^ORDERBYname";

          if (query && query.length > 0) {
            url += "^nameLIKE" + query;
          }
          return $http.get(url).then(function (response) {
            response.data.result.forEach(function (userResponse) {
              if (!c.existsInWatchList(userResponse)) {
                responseArr.push({
                  name: userResponse.name,
                  sys_id: userResponse.sys_id,
                  email: userResponse.email,
                });
              }
            });
            return responseArr;
          });
        }
      };
    },
    controllerAs: "c",
  };
}
