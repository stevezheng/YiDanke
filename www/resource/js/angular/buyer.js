(function() {
  var BuyerModule = angular.module('YiApp.Buyer', []);

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

    $scope.editBox = '';
    $scope.qq = '';
    $scope.phone = '';

    $scope.editQQ = function() {
      if ($scope.qq.length < 5) {
        alert('请填写正确的QQ号');
        return false;
      }

      $http.post('/buyer/index/editQQ', {qq: $scope.qq})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            location.reload();
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.editPhone = function() {
      if ($scope.phone.length != 11) {
        alert('请填写正确的手机号');
        return false;
      }

      $http.post('/buyer/index/editPhone', {phone: $scope.phone})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            location.reload();
          } else {
            alert(res.errmsg);
          }
        })
    };

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
  BuyerModule.controller('buyerTasksCtrl', function($scope, $http) {
    function getOwnOneAll() {
      $http.get('/buyer/tasks/doTasks')
        .success(function (res) {
          $scope.doTasks = res.data;

          $scope.taobaoShouhuos = _.where(res.data, {
            doTaskStatus: 3,
            taskPlatform: 'taobao'
          });
          $scope.tmallShouhuos = _.where(res.data, {
            doTaskStatus: 3,
            taskPlatform: 'tmall'
          });
          $scope.jdShouhuos = _.where(res.data, {
            doTaskStatus: 3,
            taskPlatform: 'jd'
          });

          $scope.taobaoTuikuans = _.where(res.data, {
            doTaskStatus: 5,
            taskPlatform: 'taobao'
          });
          $scope.tmallTuikuans = _.where(res.data, {
            doTaskStatus: 5,
            taskPlatform: 'tmall'
          });
          $scope.jdTuikuans = _.where(res.data, {
            doTaskStatus: 5,
            taskPlatform: 'jd'
          });
        });
    }

    function getFukuans() {
      $http.get('/buyer/tasks/todoTasks')
        .success(function(res) {
          $scope.fukuans = res.data;
        })
    }

    $scope.statusMap = {
      dotask: {
        '-1': '已撤销'
        , 0: '创建中'
        , 1: '未付款'
        , 2: '待审核'
        , 3: '进行中'
        , 4: '已完成'
      }
    };

    getOwnOneAll();
    getFukuans();
  })
})();