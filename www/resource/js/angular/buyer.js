(function() {
  var BuyerModule = angular.module('YiApp', []);

  BuyerModule.controller('buyerCtrl', function($scope, $http) {
    $scope.editPasswordBox = false;
    $scope.editTradePasswordBox = false;
    $scope.addTradePasswordBox = false;

    $scope.oldPassword = '';
    $scope.password = '';
    $scope.password1 = '';

    $scope.oldTradePassword = '';
    $scope.tradePassword = '';
    $scope.tradePassword1 = '';

    $scope.editPassword = function() {
      if ($scope.password != $scope.password1) {
        alert('两次输入的密码不一样');
        return false;
      } else {
        if ($scope.password.length < 6) {
          alert('登陆密码至少6位');
          return false;
        }

        if ($scope.password == $scope.oldPassword) {
          alert('新旧登陆密码不能一样');
          return false;
        }
        $http.post('/buyer/index/editPassword', {oldPassword: $scope.oldPassword, password: $scope.password})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              $scope.oldPassword = '';
              $scope.password = '';
              $scope.password1 = '';
            } else {
              alert(res.errmsg);
            }
          })
          .error(function(error) {
            console.error(error);
          });
      }
    };

    $scope.addTradePassword = function() {
      if ($scope.tradePassword != $scope.tradePassword1) {
        alert('两次输入的密码不一样');
        return false;
      } else {
        if ($scope.tradePassword.length < 6) {
          alert('支付密码至少6位');
          return false;
        }
        $http.post('/buyer/index/addTradePassword', {password: $scope.tradePassword})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              location.reload();
            } else {
              alert(res.errmsg);
            }
          })
          .error(function(error) {
            console.error(error);
          });
      }
    };

    $scope.editTradePassword = function() {
      if ($scope.tradePassword != $scope.tradePassword1) {
        alert('两次输入的密码不一样');
        return false;
      } else {
        if ($scope.tradePassword.length < 6) {
          alert('支付密码至少6位');
          return false;
        }

        if ($scope.tradePassword == $scope.oldTradePassword) {
          alert('新旧支付密码不能一样');
          return false;
        }

        $http.post('/buyer/index/editTradePassword', {oldPassword: $scope.oldTradePassword, password: $scope.tradePassword})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              $scope.oldTradePassword = '';
              $scope.tradePassword = '';
              $scope.tradePassword1 = '';
            } else {
              alert(res.errmsg);
            }
          })
          .error(function(error) {
            console.error(error);
          });
      }
    };

    $scope.toggleEditPassword = function() {
      if ($scope.editPasswordBox) {
        $scope.editPasswordBox = false;
      } else {
        $scope.editPasswordBox = true;
      }
    };

    $scope.toggleAddTradePassword = function() {
      if ($scope.addTradePasswordBox) {
        $scope.addTradePasswordBox = false;
      } else {
        $scope.addTradePasswordBox = true;
      }
    };

    $scope.toggleEditTradePassword = function() {
      if ($scope.editTradePasswordBox) {
        $scope.editTradePasswordBox = false;
      } else {
        $scope.editTradePasswordBox = true;
      }
    };
  });
})();