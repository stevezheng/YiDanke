(function() {
  var DoTaskModule = angular.module('YiAppAdmin.DoTask', ['angularFileUpload']);

  DoTaskModule.controller('doTaskCtrl', function($scope, $http, $upload) {
    $scope.page = 1;

    $scope.$watch('page', function() {
      getDoTasks();
    });

    function getDoTasks() {
      $http.post('/admin/dotask', {page: $scope.page})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.doTasks = res.data.data;
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

    getDoTasks();

    $scope.addExpress = function(doTask) {
      var data = {};
      data.doTaskExtendExpressName = doTask.doTaskExtendExpressName;
      data.doTaskExtendExpressId = doTask.doTaskExtendExpressId;
      data.doTaskExtendDoTaskId = doTask.doTaskDetailDoTaskId;
      data.doTaskExtendTaskId = doTask.doTaskDetailTaskId;
      $http.post('/admin/dotask/addExpress', data)
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.editExpress = function(doTask) {
      var data = {};
      data.doTaskExtendExpressName = doTask.doTaskExtendExpressName;
      data.doTaskExtendExpressId = doTask.doTaskExtendExpressId;
      data.doTaskExtendDoTaskId = doTask.doTaskDetailDoTaskId;
      data.doTaskExtendTaskId = doTask.doTaskDetailTaskId;
      $http.post('/admin/dotask/editExpress', data)
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.editExpress = function(doTask) {
      var data = {};
      data.doTaskExtendDoTaskId = doTask.doTaskDetailDoTaskId;
      $http.post('/admin/dotask/cancelExpress', data)
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.statusMap = {
      '-1': '已撤销'
      , '0': '待完成'
      , '1': '待添加订单号'
      , '2': '待发货'
      , '3': '待收货'
      , '4': '待退款'
      , '5': '待确认退款'
      , '6': '已完成'
    }
  })
})();