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
          if (res.errno === 0) {
            $scope.data = res.data.data;
            $scope.total = res.data.total;
            $scope.count = res.data.count;
            $scope.num = res.data.num;

            $scope.totalPage = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.push(i+1);
            }
          }
        });
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

    $scope.pass = function(d) {
      var r = prompt('请输入提现备注，如转账流水号等信息');
      if (r) {
        $http.post('/admin/money/passOut', {id: d.id, withdrawComment: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              d.withdrawStatus = 1;
              d.withdrawComment = r;
            } else {
              alert(res.errmsg);
            }
          })
      }
    };

    $scope.unpass = function(d) {
      var r = prompt('请输入拒绝原因');
      if (r) {
        $http.post('/admin/money/unpassOut', {id: d.id, withdrawComment: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              d.withdrawStatus = -1;
              d.withdrawComment = '拒绝原因:' + r;
            } else {
              alert(res.errmsg);
            }
          })
      }
    };

    function getData() {
      $http.post('/admin/money/out', {page: $scope.page})
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

    $scope.statusMap = {
      type: {
        '0': '金币'
        , '1': '押金'
        , '2': '流量'
      },

      bankType: {
        '1': '财付通'
        , '2': '支付宝'
        , '3': '银行'
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
  })
})();