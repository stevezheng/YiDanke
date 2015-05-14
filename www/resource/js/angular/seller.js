(function () {
  var SellerModule = angular.module('YiApp.Seller', []);

  SellerModule.controller('sellerLogCoinCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/seller/money/logcoin', {page: $scope.page})
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

  SellerModule.controller('sellerLogPVCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/seller/money/logpv', {page: $scope.page})
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

  SellerModule.controller('sellerLogMemberCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/seller/money/logmember', {page: $scope.page})
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


  SellerModule.controller('sellerLogMoneyCtrl', function ($scope, $http) {
    $scope.data = [];
    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    function getData() {
      $http.post('/seller/money/logmoney', {page: $scope.page})
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

  SellerModule.controller('sellerLogWithdrawCtrl', function ($scope, $http) {
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
      $http.post('/seller/money/logwithdraw', {page: $scope.page})
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

  SellerModule.controller('sellerCtrl', function ($scope, $http) {
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

    $scope.editQQ = function () {
      if ($scope.qq.length < 5) {
        alert('请填写正确的QQ号');
        return false;
      }

      $http.post('/seller/index/editQQ', {qq: $scope.qq})
        .success(function (res) {
          if (res.errno == 0) {
            alert(res.data);
            location.reload();
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.editPhone = function () {
      if ($scope.phone.length != 11) {
        alert('请填写正确的手机号');
        return false;
      }

      $http.post('/seller/index/editPhone', {phone: $scope.phone})
        .success(function (res) {
          if (res.errno == 0) {
            alert(res.data);
            location.reload();
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.editPassword = function () {
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
        $http.post('/seller/index/editPassword', {
          oldPassword: $scope.oldPassword,
          password: $scope.password
        })
          .success(function (res) {
            if (res.errno == 0) {
              alert(res.data);
              $scope.oldPassword = '';
              $scope.password = '';
              $scope.password1 = '';
            } else {
              alert(res.errmsg);
            }
          })
          .error(function (error) {
            console.error(error);
          });
      }
    };

    $scope.addTradePassword = function () {
      if ($scope.tradePassword != $scope.tradePassword1) {
        alert('两次输入的密码不一样');
        return false;
      } else {
        if ($scope.tradePassword.length < 6) {
          alert('支付密码至少6位');
          return false;
        }
        $http.post('/seller/index/addTradePassword', {password: $scope.tradePassword})
          .success(function (res) {
            if (res.errno == 0) {
              alert(res.data);
              location.reload();
            } else {
              alert(res.errmsg);
            }
          })
          .error(function (error) {
            console.error(error);
          });
      }
    };

    $scope.editTradePassword = function () {
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

        $http.post('/seller/index/editTradePassword', {
          oldPassword: $scope.oldTradePassword,
          password: $scope.tradePassword
        })
          .success(function (res) {
            if (res.errno == 0) {
              alert(res.data);
              $scope.oldTradePassword = '';
              $scope.tradePassword = '';
              $scope.tradePassword1 = '';
            } else {
              alert(res.errmsg);
            }
          })
          .error(function (error) {
            console.error(error);
          });
      }
    };

    $scope.toggleEditPassword = function () {
      if ($scope.editPasswordBox) {
        $scope.editPasswordBox = false;
      } else {
        $scope.editPasswordBox = true;
      }
    };

    $scope.toggleAddTradePassword = function () {
      if ($scope.addTradePasswordBox) {
        $scope.addTradePasswordBox = false;
      } else {
        $scope.addTradePasswordBox = true;
      }
    };

    $scope.toggleEditTradePassword = function () {
      if ($scope.editTradePasswordBox) {
        $scope.editTradePasswordBox = false;
      } else {
        $scope.editTradePasswordBox = true;
      }
    };
  });


  SellerModule.controller('sellerTasksCtrl', function ($scope, $http) {
    $scope.repeatPublish = function (task) {
      var platform = task.taskPlatform;
      var type = task.taskType;
      var shopId = task.taskShopId;

      var url = '/publish/' + platform;

      if (type == 'dingdan') {
        url += '/index'
      } else if (type == 'zhitongche') {
        url += '/zhitongche';
      }

      url += '?shopId=' + shopId + '&taskId=' + (task.taobaoTaskId || task.jdTaskId);
      location.href = url;
    };

    function getOwnOneAll() {
      $http.get('/seller/tasks/dotasks')
        .success(function (res) {
          $scope.doTasks = res.data;

          //todo:好坑爹的命名方式
          $scope.taobaoZixuans = _.where(res.data, {
            doTaskStatus: 1,
            taskTransportType: 'zixuan',
            taskPlatform: 'taobao'
          });
          $scope.tmallZixuans = _.where(res.data, {
            doTaskStatus: 1,
            taskTransportType: 'zixuan',
            taskPlatform: 'tmall'
          });
          $scope.jdZixuans = _.where(res.data, {
            doTaskStatus: 1,
            taskTransportType: 'zixuan',
            taskPlatform: 'jd'
          });

          $scope.taobaoBaoyous = _.where(res.data, {
            doTaskStatus: 2,
            taskPlatform: 'taobao'
          });
          $scope.tmallBaoyous = _.where(res.data, {
            doTaskStatus: 2,
            taskPlatform: 'tmall'
          });
          $scope.jdBaoyous = _.where(res.data, {
            doTaskStatus: 2,
            taskPlatform: 'jd'
          });

          $scope.taobaoTuikuans = _.where(res.data, {
            doTaskStatus: 4,
            taskPlatform: 'taobao'
          });
          $scope.tmallTuikuans = _.where(res.data, {
            doTaskStatus: 4,
            taskPlatform: 'tmall'
          });
          $scope.jdTuikuans = _.where(res.data, {
            doTaskStatus: 4,
            taskPlatform: 'jd'
          });
        });

    }

    function getOwn() {
      $http.get('/seller/tasks/own')
        .success(function (res) {
          $scope.tasks = res.data;

          $scope.doings = _.where(res.data, {taskStatus: 3});
          $scope.dones = _.where(res.data, {taskStatus: 4});
          $scope.cancels = _.where(res.data, {taskStatus: -1});
        })
    }

    $scope.upTaskFee = function (task) {
      $('#btn-add-extend-fee').click();
      $scope.upTaskFeeCoin = '';
      $scope.currentTask = task;
    };

    $scope.addExtendFee = function () {
      var task = $scope.currentTask;
      $http.post('/seller/tasks/addExtendFee', {
        upTaskFee: $scope.upTaskFeeCoin,
        taskId: task.taobaoTaskId || task.jdTaskId
      })
        .success(function (res) {
          if (res.errno == 0) {
            alert(res.data);
            $('#btn-cancel').click();
          }
        })
    };

    $scope.cancelTask = function (task) {
      var r = confirm('是否撤销该任务?');

      if (r) {
        var taskId = task.taobaoTaskId || task.jdTaskId;

        $http.post('/seller/tasks/cancelTask', {taskId: taskId})
          .success(function (res) {
            if (res.errno == 0) {
              alert(res.data);
              location.reload();
            }
          })
      }
    };

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

  SellerModule.controller('sellerTasksZixuanCtrl', function ($scope, $http) {
    $scope.platform = 'taobao';
    $scope.shopId = 0;
    function getZixuan() {
      $http.post('/seller/tasks/zixuan')
        .success(function (res) {
          $scope.doTasks = res.data;
        })
    }

    $scope.changeShopId = function (id) {
      $scope.shopId = id;
    };

    function getShops() {
      $http.get('/seller/publish/getShops')
        .success(function (res) {
          $scope.shops = res.data;
          $scope.shopId = res.data[0].id;
        })
    }

    $scope.addExpress = function (doTask) {
      $http.post('/seller/tasks/addExpress', doTask)
        .success(function (res) {
          if (res.errno == 0) {
            alert(res.data);
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.send = function (doTask) {
      $http.post('/seller/tasks/send', {doTaskId: doTask.doTaskDetailDoTaskId})
        .success(function (res) {
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

  SellerModule.controller('sellerTasksBaoyouCtrl', function ($scope, $http) {
    $scope.platform = 'taobao';
    $scope.shopId = 0;
    function getBaoyou() {
      $http.post('/seller/tasks/baoyou')
        .success(function (res) {
          $scope.doTasks = res.data;
        })
    }

    $scope.changeShopId = function (id) {
      $scope.shopId = id;
    };

    function getShops() {
      $http.get('/seller/publish/getShops')
        .success(function (res) {
          $scope.shops = res.data;
          $scope.shopId = res.data[0].id;
        })
    }

    $scope.send = function (doTask) {
      var r = confirm('是否确认发货?');
      if (r) {
        $http.post('/seller/tasks/send', {doTaskId: doTask.doTaskDetailDoTaskId})
          .success(function (res) {
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

  SellerModule.controller('sellerTasksTuikuanCtrl', function ($scope, $http) {
    $scope.platform = 'taobao';
    $scope.shopId = 0;
    function getTuikuan() {
      $http.post('/seller/tasks/tuikuan')
        .success(function (res) {
          $scope.doTasks = res.data;
        })
    }

    $scope.changeShopId = function (id) {
      $scope.shopId = id;
    };

    function getShops() {
      $http.get('/seller/publish/getShops')
        .success(function (res) {
          $scope.shops = res.data;
          $scope.shopId = res.data[0].id;
        })
    }

    $scope.doTuikuan = function (doTask) {
      var r = confirm('是否确认退款?');
      if (r) {
        $http.post('/seller/tasks/doTuikuan', {doTaskId: doTask.doTaskDetailDoTaskId})
          .success(function (res) {
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
  });

  SellerModule.controller('sellerTaskDetailCtrl', function ($scope, $http) {
    var taskId = getQueryString('id');

    $scope.statusMap = {
      '-1': '已撤销'
      , '0': '待完成任务'
      , '1': '待添加发货单'
      , '2': '待商家发货'
      , '3': '待买手收货并好评'
      , '4': '待商家退款'
      , '5': '待买手确认退款'
      , '6': '任务已完成'
      , 'taskStatus': {
        '-1': '已撤销'
        , '0': '创建中'
        , '1': '创建成功，待付款'
        , '2': '创建成功，待审核'
        , '3': '任务进行中'
        , '4': '任务已完成'
      }
    };

    $scope.pass = function(d) {
      var r = confirm('是否通过该任务?');
      if (r) {
        if (d.taskStatus == '2') {
          $http.post('/admin/task/pass', {id: d.taobaoTaskId || d.tmallTaskId || d.jdTaskId})
            .success(function (res) {
              if (res.errno == 0) {
                alert(res.data);
                d.taskStatus = 3;
              }
            })
        } else {
          alert('该任务已审核过');
        }
      }
    };

    $scope.unpass = function(d) {
      var r = confirm('是否拒绝该任务?');
      if (r) {
        if (d.taskStatus == '2') {
          $http.post('/admin/task/unpass', {id: d.taobaoTaskId || d.tmallTaskId || d.jdTaskId})
            .success(function (res) {
              if (res.errno == 0) {
                alert(res.data);
                d.taskStatus = -1;
              }
            })
        } else {
          alert('该任务已审核过');
        }
      }
    };

    $scope.cancelTask = function(task) {
      var r = confirm('是否要撤销该任务?');
      if (r) {
        var taskId = task.taobaoTaskId || task.jdTaskId;

        $http.post('/seller/tasks/cancelTask', {taskId: taskId})
          .success(function (res) {
            if (res.errno == 0) {
              alert(res.data);
              location.reload();
            }
          })
      }
    };

    //获取任务详情
    function getTaskDetail() {
      $http.post('/publish/index/getTask', {taskId: taskId})
        .success(function (res) {
          if (res.errno == 0) {
            res = res.data;
            $scope.task =  res;
            //任务花费明细
            $scope.cost = {
              totalCount: res.taskTotalCount //最终刷单数
              , totalMoney: res.taskTotalMoney //最终商品1、商品2、商品3的总价格

              , transport: res.taskTransportFee //快递费

              , promise: res.taskPromise //退款保证金
              , totalPromise: res.taskTotalPromise //总退款保证金

              , fee: res.taskFee //刷单一单的费用
              , totalFee: res.taskTotalFee //刷单总的费用

              , phone: res.taskPhone //移动端刷单附加费

              , isPayback: res.taskIsPayback//是否平台返款
              , payback: res.taskPayback //平台返款服务费

              , speed: res.taskSpeed //提升完成任务速度

              , isExtendFee: res.taskIsExtendFee //是否平台加赏任务佣金
              , extendFee: res.taskExtendFee //加赏单任务佣金

              , isInterval: res.taskIsInterval //是否任务发布间隔
              , intervalTime: res.taskInterval //每隔多久发布
              , intervalCount: res.taskIntervalCount //间隔发布几个
              , interval: res.taskInterval//任务间隔发布费用

              , selectPV: 60 //选择流量
              , freePV: 0 //自定义流量
              , pv: 60 //实际使用流量

              , cycleTime: res.taskCycleTime //延长买家购物周期与费用(周期和费用一样)
              , totalCycle: res.taskTotalCycle //延长买家购物周期总共费用 totalCycle = cycleTime * totalCount

              , isGoodComment: false //是否优质好评
              , goodCommentCount: res.taskGoodCommentCount //好评个数
              , goodCommentFee: res.taskGoodCommentFee //好评费用
              , goodComment: [ //好评内容
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
              ]
            };
            $scope.item = {
              name: res.taskName //商品名称
              , url: res.taskUrl //商品链接
              , urlFlag: '' //商品链接是否正确
              , tag1: res.taskTag1 //规格1
              , tag2: res.taskTag2 //规格2
              , money: res.taskMoney //购买价格
              , count: res.taskCount //购买数量
              , searchMoney: res.taskSearchMoney//搜索价格
              , priceStart: res.taskPriceStart//搜索价格开始
              , priceEnd: res.taskPriceEnd//搜索价格结束
              , position: '全国'
              , totalCount: res.taskTotalCount //选择刷单数
              , freeTotalCount: 3 //自定义刷单数
              , pcCount: res.taskPcCount //电脑端刷单数
              , phoneCount: res.taskPhoneCount //移动端刷单数
              , tips: res.taskTips //下单提示
            };

            $scope.extendItem1 = {
              name: res.extend1Name
              , url: res.extend1Url
              , urlFlag: '' //商品链接是否正确
              , image: ''
              , imagefile: res.extend1Image
              , tag1: res.extend1Tag1
              , tag2: res.extend1Tag2
              , money: res.extend1Money
              , count: res.extend1Count
              , searchMoney: res.extend1SearchMoney
            };

            $scope.extendItem2 = {
              name: res.extend2Name
              , url: res.extend2Url
              , urlFlag: '' //商品链接是否正确
              , image: ''
              , imagefile: res.extend2Image
              , tag1: res.extend2Tag1
              , tag2: res.extend2Tag2
              , money: res.extend2Money
              , count: res.extend2Count
              , searchMoney: res.extend2SearchMoney
            };

            $scope.taobao = {
              searchBox: true
              , imagefile: res.taobaoImage
              , keywordsCount: res.taobaoKeywords
              , key1: res.taobaoKey1
              , key1Count: res.taobaoKeyCount1
              , key1extend1: ''
              , key1extend2: ''
              , key1extend3: ''
              , key1extend4: ''
              , key2: res.taobaoKey2
              , key2Count: res.taobaoKeyCount2
              , key2extend1: ''
              , key2extend2: ''
              , key2extend3: ''
              , key2extend4: ''
              , key3: res.taobaoKey3
              , key3Count: res.taobaoKeyCount3
              , key3extend1: ''
              , key3extend2: ''
              , key3extend3: ''
              , key3extend4: ''
              , key4: res.taobaoKey4
              , key4Count: res.taobaoKeyCount4
              , key4extend1: ''
              , key4extend2: ''
              , key4extend3: ''
              , key4extend4: ''
              , key5: res.taobaoKey5
              , key5Count: res.taobaoKeyCount5
              , key5extend1: ''
              , key5extend2: ''
              , key5extend3: ''
              , key5extend4: ''
            };

            $scope.tmall = {
              searchBox: false
              , keywordsCount: 1
              , key1: res.tmallKey1
              , key1Count: res.tmallKeyCount1
              , key1extend1: ''
              , key1extend2: ''
              , key1extend3: ''
              , key1extend4: ''
              , key2: res.tmallKey2
              , key2Count: res.tmallKeyCount2
              , key2extend1: ''
              , key2extend2: ''
              , key2extend3: ''
              , key2extend4: ''
              , key3: res.tmallKey3
              , key3Count: res.tmallKeyCount3
              , key3extend1: ''
              , key3extend2: ''
              , key3extend3: ''
              , key3extend4: ''
              , key4: res.tmallKey4
              , key4Count: res.tmallKeyCount4
              , key4extend1: ''
              , key4extend2: ''
              , key4extend3: ''
              , key4extend4: ''
              , key5: res.tmallKey5
              , key5Count: res.tmallKeyCount5
              , key5extend1: ''
              , key5extend2: ''
              , key5extend3: ''
              , key5extend4: ''
            };

          }
        })
    }

    //获取任务单详情
    function getDoTaskList() {
      $http.post('/seller/tasks/doTaskList', {taskId: taskId})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.dotasks = res.data;
          }
        })
    }

    getTaskDetail();
    getDoTaskList();
  });
  SellerModule.controller('sellerDoTaskDetailCtrl', function ($scope, $http) {
    var taskId = getQueryString('taskId');
    var id = getQueryString('id');

    $scope.statusMap = {
      '-1': '已撤销'
      , '0': '待完成任务'
      , '1': '待添加发货单'
      , '2': '待商家发货'
      , '3': '待买手收货并好评'
      , '4': '待商家退款'
      , '5': '待买手确认退款'
      , '6': '任务已完成'
      , 'taskStatus': {
        '-1': '已撤销'
        , '0': '创建中'
        , '1': '创建成功，待付款'
        , '2': '创建成功，待审核'
        , '3': '任务进行中'
        , '4': '任务已完成'
      }
    };

    //获取任务详情
    function getTaskDetail() {
      $http.post('/publish/index/getTask', {taskId: taskId})
        .success(function (res) {
          if (res.errno == 0) {
            res = res.data;
            $scope.task =  res;
            //任务花费明细
            $scope.cost = {
              totalCount: res.taskTotalCount //最终刷单数
              , totalMoney: res.taskTotalMoney //最终商品1、商品2、商品3的总价格

              , transport: res.taskTransportFee //快递费

              , promise: res.taskPromise //退款保证金
              , totalPromise: res.taskTotalPromise //总退款保证金

              , fee: res.taskFee //刷单一单的费用
              , totalFee: res.taskTotalFee //刷单总的费用

              , phone: res.taskPhone //移动端刷单附加费

              , isPayback: res.taskIsPayback//是否平台返款
              , payback: res.taskPayback //平台返款服务费

              , speed: res.taskSpeed //提升完成任务速度

              , isExtendFee: res.taskIsExtendFee //是否平台加赏任务佣金
              , extendFee: res.taskExtendFee //加赏单任务佣金

              , isInterval: res.taskIsInterval //是否任务发布间隔
              , intervalTime: res.taskInterval //每隔多久发布
              , intervalCount: res.taskIntervalCount //间隔发布几个
              , interval: res.taskInterval//任务间隔发布费用

              , selectPV: 60 //选择流量
              , freePV: 0 //自定义流量
              , pv: 60 //实际使用流量

              , cycleTime: res.taskCycleTime //延长买家购物周期与费用(周期和费用一样)
              , totalCycle: res.taskTotalCycle //延长买家购物周期总共费用 totalCycle = cycleTime * totalCount

              , isGoodComment: false //是否优质好评
              , goodCommentCount: 3 //好评个数
              , goodCommentFee: 0 //好评费用
              , goodComment: [ //好评内容
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
              ]
            };
            $scope.item = {
              name: res.taskName //商品名称
              , url: res.taskUrl //商品链接
              , urlFlag: '' //商品链接是否正确
              , tag1: res.taskTag1 //规格1
              , tag2: res.taskTag2 //规格2
              , money: res.taskMoney //购买价格
              , count: res.taskCount //购买数量
              , searchMoney: res.taskSearchMoney//搜索价格
              , priceStart: res.taskPriceStart//搜索价格开始
              , priceEnd: res.taskPriceEnd//搜索价格结束
              , position: '全国'
              , totalCount: res.taskTotalCount //选择刷单数
              , freeTotalCount: 3 //自定义刷单数
              , pcCount: res.taskPcCount //电脑端刷单数
              , phoneCount: res.taskPhoneCount //移动端刷单数
              , tips: res.taskTips //下单提示
            };

            $scope.extendItem1 = {
              name: res.extend1Name
              , url: res.extend1Url
              , urlFlag: '' //商品链接是否正确
              , image: ''
              , imagefile: res.extend1Image
              , tag1: res.extend1Tag1
              , tag2: res.extend1Tag2
              , money: res.extend1Money
              , count: res.extend1Count
              , searchMoney: res.extend1SearchMoney
            };

            $scope.extendItem2 = {
              name: res.extend2Name
              , url: res.extend2Url
              , urlFlag: '' //商品链接是否正确
              , image: ''
              , imagefile: res.extend2Image
              , tag1: res.extend2Tag1
              , tag2: res.extend2Tag2
              , money: res.extend2Money
              , count: res.extend2Count
              , searchMoney: res.extend2SearchMoney
            };

            $scope.taobao = {
              searchBox: true
              , imagefile: res.taobaoImage
              , keywordsCount: res.taobaoKeywords
              , key1: res.taobaoKey1
              , key1Count: res.taobaoKeyCount1
              , key1extend1: ''
              , key1extend2: ''
              , key1extend3: ''
              , key1extend4: ''
              , key2: res.taobaoKey2
              , key2Count: res.taobaoKeyCount2
              , key2extend1: ''
              , key2extend2: ''
              , key2extend3: ''
              , key2extend4: ''
              , key3: res.taobaoKey3
              , key3Count: res.taobaoKeyCount3
              , key3extend1: ''
              , key3extend2: ''
              , key3extend3: ''
              , key3extend4: ''
              , key4: res.taobaoKey4
              , key4Count: res.taobaoKeyCount4
              , key4extend1: ''
              , key4extend2: ''
              , key4extend3: ''
              , key4extend4: ''
              , key5: res.taobaoKey5
              , key5Count: res.taobaoKeyCount5
              , key5extend1: ''
              , key5extend2: ''
              , key5extend3: ''
              , key5extend4: ''
            };

            $scope.tmall = {
              searchBox: false
              , keywordsCount: 1
              , key1: res.tmallKey1
              , key1Count: res.tmallKeyCount1
              , key1extend1: ''
              , key1extend2: ''
              , key1extend3: ''
              , key1extend4: ''
              , key2: res.tmallKey2
              , key2Count: res.tmallKeyCount2
              , key2extend1: ''
              , key2extend2: ''
              , key2extend3: ''
              , key2extend4: ''
              , key3: res.tmallKey3
              , key3Count: res.tmallKeyCount3
              , key3extend1: ''
              , key3extend2: ''
              , key3extend3: ''
              , key3extend4: ''
              , key4: res.tmallKey4
              , key4Count: res.tmallKeyCount4
              , key4extend1: ''
              , key4extend2: ''
              , key4extend3: ''
              , key4extend4: ''
              , key5: res.tmallKey5
              , key5Count: res.tmallKeyCount5
              , key5extend1: ''
              , key5extend2: ''
              , key5extend3: ''
              , key5extend4: ''
            };

          }
        })
    }

    //获取任务单详情
    function getDoTaskDetail() {
      $http.post('/seller/tasks/doTaskDetail', {id: id})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.dotask = res.data;
          }
        })
    }

    getTaskDetail();
    getDoTaskDetail();
  });

  SellerModule.controller('sellerWithdrawCtrl', ['$scope', '$http', '$upload', function ($scope, $http, $upload) {
    $scope.upload = function(file) {
      return $upload.upload({
        url: '/home/index/upload',
        file: file
      })
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

      $http.post('/seller/withdraw/withdrawCoin', {
        tradePassword: $scope.withdrawCoinPassword
        , coin: $scope.withdrawCoin
        , bankType: $scope.withdrawCoinType
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

    $scope.submitWithDrawMoney = function() {

      if (!$scope.withdrawMoneyType) {
        alert('请选择提现账号');
        return false;
      }
      if (!$scope.withdrawMoneyPassword) {
        alert('请输入支付密码');
        return false;
      }

      if (!$scope.withdrawMoney) {
        alert('请输入提现金额');
        return false;
      }

      $http.post('/seller/withdraw/withdrawMoney', {
        tradePassword: $scope.withdrawMoneyPassword
        , money: $scope.withdrawMoney
        , bankType: $scope.withdrawMoneyType
      })
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            location.reload();
          } else {
            alert(res.errmsg);
          }
        })
    }

    function getData() {
      $http.post('/seller/withdraw')
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

      $http.post('/seller/withdraw/tenpay', $scope.tenpay)
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

      $http.post('/seller/withdraw/alipay', $scope.alipay)
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

      $http.post('/seller/withdraw/bank', $scope.bank)
        .success(function(res) {
          alert(res.data);
          location.reload();
        })
    };
  }])
})();