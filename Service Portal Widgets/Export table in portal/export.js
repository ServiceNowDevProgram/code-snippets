function ($scope) {

    $scope.exportToCsv = function () {
    //https://<myinstance>.service-now.com/<TableName>.do?XML&useUnloadFormat=true&sysparm_view=<ViewName>&sysparm_query=<yourQueryHere>
    $scope.link = '/test_table_list.do?CSV&useUnloadFormat=true&sysparm_view=exportview&sysparm_query=id%3Dtest';
    //download file name
    $scope.fileName = 'Test.csv';
};
}