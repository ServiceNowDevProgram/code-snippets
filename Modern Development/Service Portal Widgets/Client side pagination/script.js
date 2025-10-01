//client side pagination in widgets
//html code

//boundary links show the first and last pages as arrows
//max size shows the number of total page numbers visible to the user in case of several pages
<div>
    <uib-pagination total-items="10" ng-model="currentPage" items-per-page="5"
    ng-click="pageUpdated()" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"
    max-size="3" class="" force-ellipses="true" boundary-links = "true"></uib-pagination>
</div>

//client side script
function($scope) {

    //we can have variables here for total items and items per page in a dynamic way 
    //and then use them in the html side
    $scope.currentPage = 1;

    $scope.pageUpdated = function(){
        console.log('this page is updated to: ' + $scope.currentPage);
    }

}
