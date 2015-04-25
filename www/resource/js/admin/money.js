(function() {
  var Module = angular.module('YiAppAdmin.Money', ['angularFileUpload']);

  Module.controller('moneyInCtrl', function($scope, $http, $upload) {
    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    $scope.filter = {};
    $scope.search = function() {
      var filter = _.pick($scope.filter, function(value, key, object) {
        if (value != '') {
          return true;
        }
      });


      $http.post('/admin/money/in', {page: $scope.page, data: filter})
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
    };

    function getData() {
      $http.post('/admin/money/in', {page: $scope.page})
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

    $scope.pass = function(d) {
      $http.post('/admin/money/passIn', {id: d.id})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            d.moneyStatus = 1;
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.unpass = function(d) {
      $http.post('/admin/money/unpassIn', {id: d.id})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            d.moneyStatus = -1;
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.statusMap = {
      type: {
        '0': '金币'
        , '1': '押金'
        , '2': '流量'
      },

      status: {
        '0': '待审核'
        , '1': '通过'
        , '-1': '拒绝'
      },

      platform: {
        'alipay': '支付宝'
        , 'kuaiqian': '快钱'
        , 'tenpay': '财付通'
        , 'bank': '银行'
      }
    };

    getData();
  });

  Module.controller('moneyOutCtrl', function($scope, $http, $upload) {
    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/admin/user/out', {page: $scope.page})
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
  })
})();