(function() {
  var statusMap = {
    status: {
      0: '禁用'
      , 1: '游客'
      , 2: '会员'
    }
  };

  var Module = angular.module('YiAppAdmin.User', ['angularFileUpload']);

  Module.controller('buyerCtrl', function($scope, $http, $upload) {
    $scope.filter = {};
    $scope.search = function() {
      var filter = _.pick($scope.filter, function(value, key, object) {
        if (value != '') {
          return true;
        }
      });

      $http.post('/admin/user/buyer', {page: $scope.page, data: filter})
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
    };
    $scope.statusMap = statusMap;
    $scope.member = function(user) {
      var r = confirm('确定要给该用户增加3个月会员?');
      if (r) {
        $http.post('/admin/user/member', {id: user.id, username: user.username, oldVipExprie: user.vipExprie})
          .success(function(res) {
            if (res.errno == 0) {
              var exprie;
              var _vipExprie = user.vipExprie;
              var vipExprie = moment().diff(_vipExprie, 'days');
              if (vipExprie < 0) {
                //尚未到期
                exprie = _vipExprie;
              } else {
                //已经到期
                exprie = moment();
              }

              var newExprie = moment(exprie).add(3, 'M').format('YYYY-MM-DD');
              alert(res.data);
              user.vipExprie = newExprie;
            }
          })
      }
    };

    $scope.addCoin = function(user) {
      var type;
      var r = prompt('修改多少金币?');
      if (r) {
        if (r > 0) {
          type = 'add';
        } else {
          type = 'sub';
        }
        $http.post('/admin/user/coin', {id: user.id, user: user, type: type, coin: Math.abs(r)})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.coin += parseFloat(r);
            }
          })
      }
    };

    $scope.addMoney= function(user) {
      var type;
      var r = prompt('修改多少押金?');
      if (r) {
        if (r > 0) {
          type = 'add';
        } else {
          type = 'sub';
        }
        $http.post('/admin/user/money', {id: user.id, user: user, type: type, money: Math.abs(r)})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.money += parseFloat(r);
            }
          })
      }
    };

    $scope.editPassword = function(user) {
      var r = prompt('请输入新密码');
      if (r) {
        $http.post('/admin/user/password', {id: user.id, type: 'password', password: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
            }
          })
      }
    };

    $scope.editTradePassword = function(user) {
      var r = prompt('请输入新密码');
      if (r) {
        $http.post('/admin/user/password', {id: user.id, type: 'tradepassword', password: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
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
    $scope.filter = {};
    $scope.search = function() {
      var filter = _.pick($scope.filter, function(value, key, object) {
        if (value != '') {
          return true;
        }
      });

      $http.post('/admin/user/seller', {page: $scope.page, data: filter})
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
    };

    $scope.member = function(user) {
      var r = confirm('确定要给该用户增加3个月会员?');
      if (r) {
        $http.post('/admin/user/member', {id: user.id, username: user.username, oldVipExprie: user.vipExprie})
          .success(function(res) {
            if (res.errno == 0) {
              var exprie;
              var _vipExprie = user.vipExprie;
              var vipExprie = moment().diff(_vipExprie, 'days');
              if (vipExprie < 0) {
                //尚未到期
                exprie = _vipExprie;
              } else {
                //已经到期
                exprie = moment();
              }

              var newExprie = moment(exprie).add(3, 'M').format('YYYY-MM-DD');
              alert(res.data);
              user.vipExprie = newExprie;
            }
          })
      }
    };

    $scope.addCoin = function(user) {
      var type;
      var r = prompt('修改多少金币?');
      if (r) {
        if (r > 0) {
          type = 'add';
        } else {
          type = 'sub';
        }
        $http.post('/admin/user/coin', {id: user.id, user: user, type: type, coin: Math.abs(r)})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.coin += parseFloat(r);
            }
          })
      }
    };

    $scope.addPV = function(user) {
      var type;
      var r = prompt('修改多少流量?');
      if (r) {
        if (r > 0) {
          type = 'add';
        } else {
          type = 'sub';
        }
        $http.post('/admin/user/pv', {id: user.id, user: user, type: type, pv: Math.abs(r)})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.pv += parseFloat(r);
            }
          })
      }
    };

    $scope.addMoney= function(user) {
      var type;
      var r = prompt('修改多少押金?');
      if (r) {
        if (r > 0) {
          type = 'add';
        } else {
          type = 'sub';
        }
        $http.post('/admin/user/money', {id: user.id, user: user, type: type, money: Math.abs(r)})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.money += parseFloat(r);
            }
          })
      }
    };

    $scope.editPassword = function(user) {
      var r = prompt('请输入新密码');
      if (r) {
        $http.post('/admin/user/password', {id: user.id, type: 'password', password: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
            }
          })
      }
    };

    $scope.editTradePassword = function(user) {
      var r = prompt('请输入新密码');
      if (r) {
        $http.post('/admin/user/password', {id: user.id, type: 'tradepassword', password: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
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
    $scope.statusMap = statusMap;
  })
  Module.controller('sellerTaskDetailCtrl', function ($scope, $http) {
    var taskId = getQueryString('id');

    $scope.cancelDoTask = function(doTask) {
      var r = confirm('请确认是否要撤销任务单');

      if (r) {
        var data = {};
        if (!doTask.doTaskDetailDoTaskId) {
          alert('待完成任务，请移步至任务清单中进行撤销，谢谢合作');
          return false;
        }
        data.id = doTask.doTaskDetailDoTaskId;
        $http.post('/admin/dotask/cancel', data)
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              doTask.doTaskStatus = -1;
            } else {
              alert(res.errmsg);
            }
          })
      }
    };

    $scope.updateTask = function(task) {
      var r = confirm('请确认是否要修改任务基本信息');

      if (r) {
        $http.post('/admin/task/updateTask', {
          id: taskId
          , taskWeight: task.taskWeight
          , taskVolume: task.taskVolume
          , taskLong: task.taskLong
          , taskWidth: task.taskWidth
          , taskHeight: task.taskHeight
          , taskName: task.taskName
          , taskUrl: task.taskUrl
          , taskTips: task.taskTips
          , taskPosition: task.taskPosition
          , taskTag1: task.taskTag1
          , taskTag2: task.taskTag2
        })
          .success(function(res) {
            if (res.errno === '0') {
              alert(res.data);
            } else {
              alert(res.errmsg);
            }
          })
      }
    };

    $scope.updateTaobao = function(task) {
      var r = confirm('请确认是否要修改任务淘宝信息,请确定关键词数有修改');

      if (r) {
        $http.post('/admin/task/updateTaobao', {
          taobaoTaskId: taskId
          , taobaoKeywordsCount: task.taobaoKeywordsCount
          , taobaoKey1: task.taobaoKey1
          , taobaoKey1Extend1: task.taobaoKey1Extend1
          , taobaoKey1Extend2: task.taobaoKey1Extend2
          , taobaoKey1Extend3: task.taobaoKey1Extend3
          , taobaoKey1Extend4: task.taobaoKey1Extend4

          , taobaoKey2: task.taobaoKey2
          , taobaoKey2Extend1: task.taobaoKey2Extend1
          , taobaoKey2Extend2: task.taobaoKey2Extend2
          , taobaoKey2Extend3: task.taobaoKey2Extend3
          , taobaoKey2Extend4: task.taobaoKey2Extend4

          , taobaoKey3: task.taobaoKey3
          , taobaoKey3Extend1: task.taobaoKey3Extend1
          , taobaoKey3Extend2: task.taobaoKey3Extend2
          , taobaoKey3Extend3: task.taobaoKey3Extend3
          , taobaoKey3Extend4: task.taobaoKey3Extend4

          , taobaoKey4: task.taobaoKey4
          , taobaoKey4Extend1: task.taobaoKey4Extend1
          , taobaoKey4Extend2: task.taobaoKey4Extend2
          , taobaoKey4Extend3: task.taobaoKey4Extend3
          , taobaoKey4Extend4: task.taobaoKey4Extend4

          , taobaoKey5: task.taobaoKey5
          , taobaoKey5Extend1: task.taobaoKey5Extend1
          , taobaoKey5Extend2: task.taobaoKey5Extend2
          , taobaoKey5Extend3: task.taobaoKey5Extend3
          , taobaoKey5Extend4: task.taobaoKey5Extend4
        })
          .success(function(res) {
            if (res.errno === 0) {
              alert(res.data);
            } else {
              alert(res.errmsg);
            }
          })
      }
    };

    $scope.updateTmall = function(task) {
      var r = confirm('请确认是否要修改任务天猫信息,请确定关键词数有修改');

      if (r) {
        $http.post('/admin/task/updateTmall', {
          tmallTaskId: taskId
          , tmallKeywordsCount: task.tmallKeywordsCount
          , tmallKey1: task.tmallKey1
          , tmallKey1Extend1: task.tmallKey1Extend1
          , tmallKey1Extend2: task.tmallKey1Extend2
          , tmallKey1Extend3: task.tmallKey1Extend3
          , tmallKey1Extend4: task.tmallKey1Extend4

          , tmallKey2: task.tmallKey2
          , tmallKey2Extend1: task.tmallKey2Extend1
          , tmallKey2Extend2: task.tmallKey2Extend2
          , tmallKey2Extend3: task.tmallKey2Extend3
          , tmallKey2Extend4: task.tmallKey2Extend4

          , tmallKey3: task.tmallKey3
          , tmallKey3Extend1: task.tmallKey3Extend1
          , tmallKey3Extend2: task.tmallKey3Extend2
          , tmallKey3Extend3: task.tmallKey3Extend3
          , tmallKey3Extend4: task.tmallKey3Extend4

          , tmallKey4: task.tmallKey4
          , tmallKey4Extend1: task.tmallKey4Extend1
          , tmallKey4Extend2: task.tmallKey4Extend2
          , tmallKey4Extend3: task.tmallKey4Extend3
          , tmallKey4Extend4: task.tmallKey4Extend4

          , tmallKey5: task.tmallKey5
          , tmallKey5Extend1: task.tmallKey5Extend1
          , tmallKey5Extend2: task.tmallKey5Extend2
          , tmallKey5Extend3: task.tmallKey5Extend3
          , tmallKey5Extend4: task.tmallKey5Extend4
        })
          .success(function(res) {
            if (res.errno === 0) {
              alert(res.data);
            } else {
              alert(res.errmsg);
            }
          })
      }
    }
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
      , 'taskType': {
        'dingdan': '订单'
        , 'zhitongche': '直通车'
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
  Module.controller('sellerDoTaskDetailCtrl', function ($scope, $http) {
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
  })
})();