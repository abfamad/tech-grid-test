agGrid.initialiseAgGridWithAngular1(angular);

var app = angular.module('currencyApp', ["agGrid"])
.directive('onlyDigits', function () {

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});;

app.controller('currencyController', function($scope, $window, $http){
    $scope.headers = {
                // 'Access-Control-Allow-Origin' : '*',
                // 'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
            };

    var columnDefs = [
                    {headerName: "Currency", field: "Currency"},
                    {headerName: "IDR", field: "IDR"},
                    {headerName: "AUD", field: "AUD"},
                    {headerName: "EUR", field: "EUR"},
                    {headerName: "HKD", field: "HKD"}];
    var rowData = $scope.data;

    $scope.getCurrencyDetail = function() {
        console.log('Get Currency Detail');

        var dataTable = $scope.data.rates;

        $scope.start = new Date();

        $http({
            method : 'GET',
            url : 'https://openexchangerates.org/api/ohlc.json',
            params : {"app_id": "a2adc0021e904dc482eff22c707eb200",
                      "start" : "2017-01-01",
                      "end" : "2017-01-04"
                      "base"  : $scope.currency,
                      "symbols" : "IDR,AUD,EUR,HKD",
                      "prettyprint" : 1
                        },
            data : {},
            headers : $scope.headers
        }).success(function(response, status) {
            $scope.data = response;
            console.log("data: " + $scope.data);
                        // $scope.description = $scope.data.description;
                        // $scope.message = $scope.data.message;
            console.log(
                "message: " + $scope.message + 
                " \ndescription: " + $scope.description);


            $scope.conversion = function() {
                var convertedCur1 = $scope.nominal * dataTable.01-01-2017;
                var convertedCur2 =  $scope.nominal * dataTable.01-02-2017;
                var convertedCur3 =  $scope.nominal * dataTable.01-03-2017;
                var convertedCur4 =  $scope.nominal * dataTable.01-04-2017;

            };

            var columnDefs = [
                    {headerName: "Month", field: "Month"},
                    {headerName: "IDR", field: "IDR"},
                    {headerName: "AUD", field: "AUD"},
                    {headerName: "EUR", field: "EUR"},
                    {headerName: "HKD", field: "HKD"}];

            var rowData = [
                {Month : data.rates, IDR : convertedCur1, AUD : convertedCur2, EUR: convertedCur3, HKD: convertedCur4}
            ];

             $scope.gridOptions = {
                    columnDefs: columnDefs,
                    rowData: rowData
                };


        }).error(function(data, status) {
            console.log('Error console');
            console.log(data);
        });
    }


});