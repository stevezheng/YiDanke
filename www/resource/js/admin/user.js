(function() {
  var Module = angular.module('YiAppAdmin.User', ['angularFileUpload']);

  Module.controller('buyerCtrl', function($scope, $http, $upload) {
    $scope.addMoney = function(user) {
      var r = prompt('增加多少押金?');
      if (r) {
        $http.post('/admin/user/money', {id: user.id, type: 'add', money: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.money += parseFloat(r);
            }
          })
      }
    };

    $scope.addCoin = function(user) {
      var r = prompt('增加多少金币?');
      if (r) {
        $http.post('/admin/user/coin', {id: user.id, type: 'add', coin: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.coin += parseFloat(r);
            }
          })
      }
    };
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
    $scope.addMoney = function(user) {
      var r = prompt('增加多少押金?');
      if (r) {
        $http.post('/admin/user/money', {id: user.id, type: 'add', money: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.money += parseFloat(r);
            }
          })
      }
    };

    $scope.addCoin = function(user) {
      var r = prompt('增加多少金币?');
      if (r) {
        $http.post('/admin/user/coin', {id: user.id, type: 'add', coin: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.coin += parseFloat(r);
            }
          })
      }
    };
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