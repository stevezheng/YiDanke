(function() {
  var BuyerModule = angular.module('YiApp.Buyer', ['angularFileUpload', 'checklist-model']);

  BuyerModule.controller('buyerDoTaskDetailCtrl', function($scope, $http) {
    var id = getQueryString('id');
    function query() {
      $http.post('/buyer/tasks/dotaskdetail', {id: id})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.dotask = res.data;
          }
        })
        .error(function(err) {

        })
    };

    query();
  });

  BuyerModule.controller('buyerLogCoinCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/buyer/money/logcoin', {page: $scope.page})
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
  });

  BuyerModule.controller('buyerLogYongjinCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/buyer/money/logyongjin', {page: $scope.page})
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
  });

  BuyerModule.controller('buyerLogMemberCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/buyer/money/logmember', {page: $scope.page})
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
  });


  BuyerModule.controller('buyerLogMoneyCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/buyer/money/logmoney', {page: $scope.page})
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
  });

  BuyerModule.controller('buyerLogWithdrawCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    $scope.statusMap = {
      status: {
        '-1': '已拒绝'
        , 0: '处理中'
        , 1: '已通过'
      },
      type: {
        0: '金币'
        , 1: '押金'
        , 2: '垫付本金'
      }
    };

    function getData() {
      $http.post('/buyer/money/logwithdraw', {page: $scope.page})
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
  });

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

          $scope.doings = _.filter(res.data, function(item) {
            return (item.doTaskStatus < 6 && item.doTaskStatus > 0);
          });
          
          console.log($scope.doings);

          $scope.dones = _.filter(res.data, function(item) {
            return (item.doTaskStatus >= 6) ;
          });

          $scope.cancels = _.filter(res.data, function(item) {
            return (item.doTaskStatus == -1);
          });

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
        , '0': '待完成'
        , '1': '待添加订单号'
        , '2': '待发货'
        , '3': '待收货'
        , '4': '待退款'
        , '5': '待确认退款'
        , '6': '已完成'
        , '8': '已申请提现'
        , '9': '已提现'
      }
    };

    getOwnOneAll();
    getFukuans();
  });

  BuyerModule.controller('buyerTasksShouhuoCtrl', function($scope, $http) {
    $scope.platform = 'taobao';
    //$scope.shopId = 0;
    function getShouhuo() {
      $http.post('/buyer/tasks/shouhuo')
        .success(function(res) {
          $scope.doTasks = res.data;
        })
    }

    //$scope.changeShopId = function(id) {
    //  $scope.shopId = id;
    //};

    //function getShops() {
    //  $http.get('/buyer/tasks/getShops')
    //    .success(function(res) {
    //      $scope.shops = res.data;
    //      $scope.shopId = res.data[0].id;
    //    })
    //}

    //getShops();

    getShouhuo();

    $scope.goodComment = function(doTask) {
      $http.post('/buyer/tasks/goodComment', {id: doTask.doTaskDetailDoTaskId, doTaskExtendGoodComment: doTask.doTaskExtendGoodComment})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            getShouhuo();
          }
        })
    }
  });

  BuyerModule.controller('buyerTasksTuikuanCtrl', function($scope, $http) {
    $scope.platform = 'taobao';
    //$scope.shopId = 0;
    function getTuikuan() {
      $http.post('/buyer/tasks/tuikuan')
        .success(function(res) {
          $scope.doTasks = res.data;
        })
    }

    //$scope.changeShopId = function(id) {
    //  $scope.shopId = id;
    //};

    //function getShops() {
    //  $http.get('/buyer/tasks/getShops')
    //    .success(function(res) {
    //      $scope.shops = res.data;
    //      $scope.shopId = res.data[0].id;
    //    })
    //}

    //getShops();

    getTuikuan();

    $scope.doTuikuan = function(doTask) {
      $http.post('/buyer/tasks/doTuikuan', {
        doTaskId: doTask.doTaskDetailDoTaskId,
        terminal: doTask.doTaskTerminal,
        taskId: doTask.doTaskTaskId})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            getTuikuan();
          } else {
            alert(res.errmsg);
          }
        })
    }
  });

  BuyerModule.controller('buyerWithdrawCtrl', ['$scope', '$http', '$upload', function ($scope, $http, $upload) {
    $scope.upload = function(file) {
      return $upload.upload({
        url: '/home/index/upload',
        file: file
      })
    };

    $scope.checkroles = [];
    $scope.checkType = false;
    $scope.check = function() {
      if ($scope.checkType == false) {
        $scope.checkroles = $scope.dotasks.map(function(item) { return item.doTaskDetailDoTaskId; });
      } else {
        $scope.checkroles = [];
      }
    };
    $scope.checkAll = function() {
      //var roles = [];
      //for (var i = 0; i < $scope.data.length; i++) {
      //  var obj = $scope.data[i];
      //  roles.push(obj.id);
      //}
      //$scope.checkroles = angular.copy(roles);
      $scope.checkroles = $scope.dotasks.map(function(item) { return item.doTaskDetailDoTaskId; });
    };

    $scope.uncheckAll = function() {
      $scope.checkroles = [];
    };

    $scope.submitWithDrawMoney = function() {

      if (!$scope.withdrawMoneyType) {
        alert('请选择提现账号');
        return false;
      }
      if (!$scope.withdrawMoneyPassword) {
        alert('请输入支付密码');
        return false;
      }

      if ($scope.checkroles.length == 0) {
        alert('请选择提现订单');
        return false;
      }

      $http.post('/buyer/withdraw/withdrawMoney', {
        tradePassword: $scope.withdrawMoneyPassword
        , money: $scope.checkroles.join(',')
        , bankId: $scope.withdrawMoneyType
      })
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            location.reload();
          } else {
            alert(res.errmsg);
          }
        });
    };

    $scope.submitWithDrawCoin = function() {

      if (!$scope.withdrawCoinType) {
        alert('请选择提现账号');
        return false;
      }
      if (!$scope.withdrawCoinPassword) {
        alert('请输入支付密码');
        return false;
      }

      if (!$scope.withdrawCoin) {
        alert('请输入提现金额');
        return false;
      }

      $http.post('/buyer/withdraw/withdrawCoin', {
          tradePassword: $scope.withdrawCoinPassword
          , coin: $scope.withdrawCoin
          , bankId: $scope.withdrawCoinType
        })
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            location.reload();
          } else {
            alert(res.errmsg);
          }
        })
    };

    function getData() {
      $http.post('/buyer/withdraw')
        .success(function(res) {
          $scope.data = res.data;
          for (var i = 0; i < res.data.length; i++) {
            var obj = res.data[i];
            if (obj.bankType == 1) {
              $scope.tenpay = obj;
            } else if (obj.bankType == 2) {
              $scope.alipay = obj;
            } else if (obj.bankType == 3) {
              $scope.bank = obj;
            }
          }
        })
    }

    getData();

    $scope.$watch('bank.image', function () {
      if (!$scope.bank) {
        return false;
      }
      $scope
        .upload($scope.bank.image)
        .success(function(data, status, headers, config) {
          $scope.bank.bankImage = data.filename;
        })
    });
    $scope.$watch('tenpay.image', function () {
      if (!$scope.tenpay) {
        return false;
      }
      $scope
        .upload($scope.tenpay.image)
        .success(function(data, status, headers, config) {
          $scope.tenpay.bankImage = data.filename;
        })
    });

    $scope.$watch('alipay.image', function () {
      if (!$scope.alipay) {
        return false;
      }
      $scope
        .upload($scope.alipay.image)
        .success(function(data, status, headers, config) {
          $scope.alipay.bankImage = data.filename;
        })
    });

    $scope.submitTenpay = function() {
      if (!$scope.tenpay) {
        alert('请填写账号资料');
        return false;
      }
      if (!$scope.tenpay.bankRealName) {
        alert('请填写姓名');
        return false;
      }

      if (!$scope.tenpay.bankAccount) {
        alert('请填写财付通账号');
        return false;
      }

      if (!$scope.tenpay.bankImage) {
        alert('请上传账号截图');
        return false;
      }

      $http.post('/buyer/withdraw/tenpay', $scope.tenpay)
        .success(function(res) {
          alert(res.data);
          location.reload();
        })
    };

    $scope.submitAlipay = function() {
      if (!$scope.alipay) {
        alert('请填写账号资料');
        return false;
      }
      if (!$scope.alipay.bankRealName) {
        alert('请填写姓名');
        return false;
      }

      if (!$scope.alipay.bankAccount) {
        alert('请填写支付宝账号');
        return false;
      }

      if (!$scope.alipay.bankImage) {
        alert('请上传账号截图');
        return false;
      }

      $http.post('/buyer/withdraw/alipay', $scope.alipay)
        .success(function(res) {
          alert(res.data);
          location.reload();
        })
    };

    $scope.submitBank = function() {
      if (!$scope.bank) {
        alert('请填写账号资料');
        return false;
      }
      if (!$scope.bank.bankName) {
        alert('请填写银行名');
        return false;
      }

      if (!$scope.bank.bankRealName) {
        alert('请填写开户名');
        return false;
      }

      if (!$scope.bank.bankAccount) {
        alert('请填写银行账号');
        return false;
      }

      if (!$scope.bank.bankImage) {
        alert('请上传账号截图');
        return false;
      }

      $http.post('/buyer/withdraw/bank', $scope.bank)
        .success(function(res) {
          alert(res.data);
          location.reload();
        })
    };

    function getWithdrawData() {
      $http.post('/buyer/withdraw/dotasks')
        .success(function(res) {
          if (res.errno == 0) {
            $scope.dotasks = res.data;
          }
        })
    }

    getWithdrawData();
  }])
})();