(function() {
  var Module = angular.module('YiAppAdmin.User', ['angularFileUpload']);

  Module.controller('buyerCtrl', function($scope, $http, $upload) {
    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getUsers();
    };

    function getUsers() {
      $http.post('/admin/user/buyer', {page: $scope.page})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.users = res.data.data;
            $scope.total = res.data.total;
            $scope.count = res.data.count;
            $scope.num = res.data.num;

            $scope.totalPage = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.push(i+1);
            }
          }
        })
    }

    getUsers();
  });

  Module.controller('sellerCtrl', function($scope, $http, $upload) {
    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getUsers();
    };

    function getUsers() {
      $http.post('/admin/user/seller', {page: $scope.page})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.users = res.data.data;
            $scope.total = res.data.total;
            $scope.count = res.data.count;
            $scope.num = res.data.num;

            $scope.totalPage = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.push(i+1);
            }
          }
        })
    }

    getUsers();
  })
})();