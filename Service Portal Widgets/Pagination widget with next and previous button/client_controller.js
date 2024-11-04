api.controller = function ($scope) {
  /* widget controller */
  var c = this;
  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.numberOfPages = Math.ceil(c.data.tableRecord.length / $scope.pageSize);
  $scope.displayData = c.data.tableRecord.slice(0, 5);
  /*Pagination Next Button Function*/
  $scope.pageChange = function (index) {
    var begin = (index + 1) * $scope.pageSize;
    var end = begin + $scope.pageSize;
    $scope.displayData = c.data.tableRecord.slice(begin, end);
    $scope.currentPage += 1;
  };

  /*Pagination Previous Button Function*/
  $scope.previousPage = function (index) {
    var begin = index * $scope.pageSize;
    var end = begin + $scope.pageSize;
    $scope.displayData = c.data.tableRecord.slice(begin, end);
    $scope.currentPage -= 1;
  };
};
