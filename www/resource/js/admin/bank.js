(function() {
  var Module = angular.module('YiAppAdmin.Bank', ['angularFileUpload']);

  Module.controller('bankCtrl', function($scope, $http, $upload) {
    $scope.statusMap = {
      status: {
        '-1': '已拒绝'
        , 0: '处理中'
        , 1: '已通过'
      },
      type: {
        1: '财付通'
        , 2: '支付宝'
        , 3: '银行'
      },
      userType: {
        0: '买手'
        , 1: '商家'
      }
    };
    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/admin/bank', {page: $scope.page})
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
      $http.post('/admin/bank/pass', {id: d.id})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            d.bankStatus = 1;
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.unpass = function(d) {
      $http.post('/admin/bank/unpass', {id: d.id})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            d.bankStatus = -1;
          } else {
            alert(res.errmsg);
          }
        })
    };
  });

})();