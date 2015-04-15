(function() {
  var PublishModule = angular.module('YiApp.TaskList', []);

  PublishModule.controller('buyerTaskListCtrl', function($scope, $http) {
    $scope.platform = 'taobao';
    $scope.terminal = 'pc';
    $scope.type = 'dingdan';

    $scope.changeAccountId = function(id) {
      $scope.accountId = id;
    };

    function getAccounts() {
      $http.get('/buyer/account/getOwnPass')
        .success(function(res) {
          if (res.errno == 0) {
            $scope.accounts = res.data;
          }
        })
    }

    getAccounts();

    function getTasks() {
      $http.get('/buyer/tasklist/all')
        .success(function(res) {
          if (res.errno == 0) {
            $scope.tasks = res.data;
          }
        })
    }

    getTasks();

  });
})();