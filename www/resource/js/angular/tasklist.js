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
            $scope.taobaoAccounts = [];
            $scope.tmallAccounts = [];
            $scope.jdAccounts = [];
            for (var i = 0; i < res.data.length; i++) {
              var obj = res.data[i];

              if (obj.accountPlatform == 'taobao') {
                $scope.taobaoAccounts.push(obj);
              }

              if (obj.accountPlatform == 'tmall') {
                $scope.tmallAccounts.push(obj);
              }

              if (obj.accountPlatform == 'jd') {
                $scope.jdAccounts.push(obj);
              }
            }
          }
        })
    }

    getAccounts();

    function getTasks() {
      $http.get('/buyer/tasklist/all')
        .success(function(res) {
          if (res.errno == 0) {
            $scope.tasks = res.data;
            countTasks();
          }
        })
    }

    function countTasks() {
      var taobaoCount = 0
        , tmallCount = 0
        , jdCount = 0;

      for (var i = 0; i < $scope.tasks.length; i++) {
        var obj = $scope.tasks[i];
        if (obj.taskPlatform == 'taobao') {
          if (obj.taskPcCount > 0) {
            taobaoCount++;
          }

          if (obj.taskPhoneCount > 0) {
            taobaoCount++;
          }
        }

        if (obj.taskPlatform == 'tmall') {
          if (obj.taskPcCount > 0) {
            tmallCount++;
          }

          if (obj.taskPhoneCount > 0) {
            tmallCount++;
          }
        }

        if (obj.taskPlatform == 'jd') {
          if (obj.taskPcCount > 0) {
            jdCount++;
          }

          if (obj.taskPhoneCount > 0) {
            jdCount++;
          }
        }
      }
      $scope.taobaoCount = taobaoCount;
      $scope.tmallCount = tmallCount;
      $scope.jdCount = jdCount;

      $scope.pcCount = _.filter($scope.tasks, function(task) {
        if (task.taskPlatform == $scope.platform && task.taskPcCount > 0) {
          return task;
        }
      }).length;

      $scope.phoneCount = _.filter($scope.tasks, function(task) {
        if (task.taskPlatform == $scope.platform && task.taskPhoneCount > 0) {
          return task;
        }
      }).length;

      $scope.dingdanCount = _.filter($scope.tasks, function(task) {
        if (task.taskPlatform == $scope.platform && task.taskType == 'dingdan') {
          if ($scope.terminal == 'pc' && task.taskPcCount > 0) {
            return task;
          }

          if ($scope.terminal == 'phone' && task.taskPhoneCount > 0) {
            return task;
          }
        }
      }).length;

      $scope.juhuasuanCount = _.filter($scope.tasks, function(task) {
        if (task.taskPlatform == $scope.platform && task.taskType == 'juhuasuan') {
          if ($scope.terminal == 'pc' && task.taskPcCount > 0) {
            return task;
          }

          if ($scope.terminal == 'phone' && task.taskPhoneCount > 0) {
            return task;
          }
        }
      }).length;

      $scope.zhitongcheCount = _.filter($scope.tasks, function(task) {
        if (task.taskPlatform == $scope.platform && task.taskType == 'zhitongche') {
          if ($scope.terminal == 'pc' && task.taskPcCount > 0) {
            return task;
          }

          if ($scope.terminal == 'phone' && task.taskPhoneCount > 0) {
            return task;
          }
        }
      }).length;
    }

    $scope.$watch('platform', function() {
      countTasks();
    });

    getTasks();

  });
})();