(function() {
  var SellerModule = angular.module('YiApp.Seller', []);

  SellerModule.controller('sellerCtrl', function($scope, $http) {
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

      $http.post('/seller/index/editQQ', {qq: $scope.qq})
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

      $http.post('/seller/index/editPhone', {phone: $scope.phone})
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
        $http.post('/seller/index/editPassword', {oldPassword: $scope.oldPassword, password: $scope.password})
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
        $http.post('/seller/index/addTradePassword', {password: $scope.tradePassword})
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

        $http.post('/seller/index/editTradePassword', {oldPassword: $scope.oldTradePassword, password: $scope.tradePassword})
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


  SellerModule.controller('sellerTasksCtrl', function($scope, $http) {
    $scope.repeatPublish = function(task) {
      var platform = task.taskPlatform;
      var type = task.taskType;
      var shopId = task.taskShopId;

      var url = '/publish/' + platform ;

      if (type == 'dingdan') {
        url += '/index'
      } else if (type == 'zhitongche') {
        url += '/zhitongche';
      }

      url += '?shopId=' + shopId + '&taskId=' + task.taobaoTaskId || task.jdTaskId;
      location.href = url;
    };

    function getOwnOneAll() {
      $http.get('/seller/tasks/dotasks')
        .success(function(res) {
          $scope.doTasks = res.data;

          //todo:好坑爹的命名方式
          $scope.taobaoZixuans = _.where(res.data, {doTaskStatus: 1, taskTransport: 'zixuan', taskPlatform: 'taobao'});
          $scope.tmallZixuans = _.where(res.data, {doTaskStatus: 1, taskTransport: 'zixuan', taskPlatform: 'tmall'});
          $scope.jdZixuans = _.where(res.data, {doTaskStatus: 1, taskTransport: 'zixuan', taskPlatform: 'jd'});

          $scope.taobaoBaoyous = _.where(res.data, {doTaskStatus: 2, taskPlatform: 'taobao'});
          $scope.tmallBaoyous = _.where(res.data, {doTaskStatus: 2, taskPlatform: 'tmall'});
          $scope.jdBaoyous = _.where(res.data, {doTaskStatus: 2, taskPlatform: 'jd'});

          $scope.taobaoTuikuans = _.where(res.data, {doTaskStatus: 4, taskPlatform: 'taobao'});
          $scope.tmallTuikuans = _.where(res.data, {doTaskStatus: 4, taskPlatform: 'tmall'});
          $scope.jdTuikuans = _.where(res.data, {doTaskStatus: 4, taskPlatform: 'jd'});
        });

    }

    function getOwn() {
      $http.get('/seller/tasks/own')
        .success(function(res) {
          $scope.tasks = res.data;

          $scope.doings = _.where(res.data, {taskStatus: 3});
          $scope.dones = _.where(res.data, {taskStatus: 4});
          $scope.cancels = _.where(res.data, {taskStatus: -1});
        })
    }

    $scope.statusMap = {
      task: {
        '-1': '已撤销'
        , 0: '创建中'
        , 1: '未付款'
        , 2: '待审核'
        , 3: '进行中'
        , 4: '已完成'
      }
    };

    getOwnOneAll();
    getOwn();
  });

  SellerModule.controller('sellerTasksZixuanCtrl', function($scope, $http) {
    $scope.platform = 'taobao';
    $scope.shopId = 0;
    function getZixuan() {
      $http.post('/seller/tasks/zixuan')
        .success(function(res) {
          $scope.doTasks = res.data;
        })
    }

    $scope.changeShopId = function(id) {
      $scope.shopId = id;
    };

    function getShops() {
      $http.get('/seller/publish/getShops')
        .success(function(res) {
          $scope.shops = res.data;
          $scope.shopId = res.data[0].id;
        })
    }

    $scope.addExpress = function(doTask) {
      $http.post('/seller/tasks/addExpress', doTask)
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.send = function(doTask) {
      $http.post('/seller/tasks/send', {doTaskId: doTask.doTaskDetailDoTaskId})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            getZixuan();
          } else {
            alert(res.errmsg);
          }
        })
    };

    getShops();

    getZixuan();
  });

  SellerModule.controller('sellerTasksBaoyouCtrl', function($scope, $http) {
    $scope.platform = 'taobao';
    $scope.shopId = 0;
    function getBaoyou() {
      $http.post('/seller/tasks/baoyou')
        .success(function(res) {
          $scope.doTasks = res.data;
        })
    }

    $scope.changeShopId = function(id) {
      $scope.shopId = id;
    };

    function getShops() {
      $http.get('/seller/publish/getShops')
        .success(function(res) {
          $scope.shops = res.data;
          $scope.shopId = res.data[0].id;
        })
    }

    $scope.send = function(doTask) {
      var r = confirm('是否确认发货?');
      if (r) {
        $http.post('/seller/tasks/send', {doTaskId: doTask.doTaskDetailDoTaskId})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              getBaoyou();
            } else {
              alert(res.errmsg);
            }
          })
      }
    };

    getShops();

    getBaoyou();
  });

  SellerModule.controller('sellerTasksTuikuanCtrl', function($scope, $http) {
    $scope.platform = 'taobao';
    $scope.shopId = 0;
    function getTuikuan() {
      $http.post('/seller/tasks/tuikuan')
        .success(function(res) {
          $scope.doTasks = res.data;
        })
    }

    $scope.changeShopId = function(id) {
      $scope.shopId = id;
    };

    function getShops() {
      $http.get('/seller/publish/getShops')
        .success(function(res) {
          $scope.shops = res.data;
          $scope.shopId = res.data[0].id;
        })
    }

    $scope.doTuikuan = function(doTask) {
      var r = confirm('是否确认退款?');
      if (r) {
        $http.post('/seller/tasks/doTuikuan', {doTaskId: doTask.doTaskDetailDoTaskId})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              getTuikuan();
            } else {
              alert(res.errmsg);
            }
          })
      }
    };

    getShops();

    getTuikuan();
  })
})();