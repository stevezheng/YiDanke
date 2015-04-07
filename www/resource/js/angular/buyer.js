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