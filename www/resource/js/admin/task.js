(function() {
  var DoTaskModule = angular.module('YiAppAdmin.Task', ['angularFileUpload']);

  DoTaskModule.controller('taskCtrl', function($scope, $http, $upload) {
    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/admin/task', {page: $scope.page})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.data = res.data.data;
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

    getData();

    $scope.pass = function(d) {
      if (d.taskStatus == '0') {
        $http.post('/admin/task/pass', {id: d.id})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              d.taskStatus = 1;
            }
          })
      }
    };

    $scope.unpass = function(d) {
      if (d.taskStatus == '0') {
        $http.post('/admin/task/unpass', {id: d.id})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              d.taskStatus = -1;
            }
          })
      }
    };

    $scope.statusMap = {
      type: {
        '0': '金币'
        , '1': '押金'
        , '2': '流量'
      },

      transport: {
        'baoyou': '包邮'
        , 'bubaoyou': '不包邮'
        , 'zixuan': '自选快递'
      },

      status: {
        '-1': '拒绝'
        , '0': '创建中'
        , '1': '待付款'
        , '2': '待审核'
        , '3': '通过审核'
        , '4': '任务完成'
      },

      platform: {
        'taobao': '淘宝'
        , 'tmall': '天猫'
        , 'jd': '京东'
      }
    };
  })
})();