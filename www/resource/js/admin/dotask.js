(function() {
  var DoTaskModule = angular.module('YiAppAdmin.DoTask', ['angularFileUpload']);

  DoTaskModule.controller('doTaskCtrl', function($scope, $http, $upload) {
    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getDoTasks();
    };

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

    $scope.cancel = function(doTask) {
      var r = confirm('请确认是否要撤销任务单');

      if (r) {
        var data = {};
        data.doTaskExtendDoTaskId = doTask.doTaskDetailDoTaskId;
        $http.post('/admin/dotask/cancel', data)
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              doTask.doTaskStatus = -1;
            } else {
              alert(res.errmsg);
            }
          })
      }
    };

    $scope.cancelExpress = function(doTask) {
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

    $scope.printExpress = function() {
      $http.post('/admin/dotask/printExpress')
        .success(function(res) {
          if (res.errno == 0) {
            window.open('/resource/excel/express-' + res.data + '.xlsx');
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