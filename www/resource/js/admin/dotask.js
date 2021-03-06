(function() {
  var DoTaskModule = angular.module('YiAppAdmin.DoTask', ['angularFileUpload']);

  DoTaskModule.controller('doTaskCtrl', function($scope, $http, $upload) {
    $scope.tuikuan = function(doTask) {
      var id = doTask.id;

      $http.post('/admin/dotask/tuikuan', {id: id})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            doTask.doTaskStatus = 5;
          } else {
            alert(res.errmsg);
          }
        })
        .error(function(err) {
          alert(err.errmsg);
        })
    };

    $scope.page = {
      do: 1
      , doing: 1
      , done: 1
      , cancel: 1
      , all: 1
    };

    $scope.changePage = function(page, type) {
      $scope.page[type] = page;
      query(type);
    };

    $scope.data = {};
    $scope.total = {};
    $scope.count = {};
    $scope.num = {};
    $scope.totalPage = {};

    $scope.filter = {
      do: {}
      , doing: {}
      , done: {}
      , cancel: {}
      , all: {}
    };

    $scope.query = function(type) {
      if (type == 'do') {
        $scope.page.do = 1;
      } else if (type == 'doing') {
        $scope.page.doing = 1;
      } else if (type == 'done') {
        $scope.page.done = 1;
      } else if (type == 'cancel') {
        $scope.page.cancel = 1;
      } else if (type == 'all') {
        $scope.page.all = 1;
      }

      query(type);
    };

    function query(type) {
      var data, page;
      if (type == 'do') {
        data = $scope.filter.do;
        data.doTaskStatus = 1;
        page = $scope.page.do;
      } else if (type == 'doing') {
        data = $scope.filter.doing;
        page = $scope.page.doing;
        data.doTaskStatus = {
          '>': 1
          , '<': 5
        };
      } else if (type == 'done') {
        data = $scope.filter.done;
        page = $scope.page.done;
        data.doTaskStatus = ['<=', 6];
      } else if (type == 'cancel') {
        data = $scope.filter.cancel;
        page = $scope.page.cancel;
        data.doTaskStatus = -1;
      } else if (type == 'all') {
        data = $scope.filter.all;
        page = $scope.page.all;
      }

      data = _.pick(data, function(value, key, object) {
        if (value != '') {
          return true;
        }
      });

      $http.post('/admin/dotask', {page: page, data: data})
        .success(function(res) {
          if (type == 'do') {
            $scope.data.do = res.data.data;
            $scope.total.do  = res.data.total;
            $scope.count.do = res.data.count;
            $scope.num.do = res.data.num;
            $scope.totalPage.do = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.do.push(i+1);
            }
          } else if (type == 'doing') {
            $scope.data.doing = res.data.data;
            $scope.total.doing  = res.data.total;
            $scope.count.doing = res.data.count;
            $scope.num.doing = res.data.num;
            $scope.totalPage.doing = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.doing.push(i+1);
            }
          } else if (type == 'done') {
            $scope.data.done = res.data.data;
            $scope.total.done  = res.data.total;
            $scope.count.done = res.data.count;
            $scope.num.done = res.data.num;
            $scope.totalPage.done = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.done.push(i+1);
            }

          } else if (type == 'cancel') {
            $scope.data.cancel = res.data.data;
            $scope.total.cancel  = res.data.total;
            $scope.count.cancel = res.data.count;
            $scope.num.cancel = res.data.num;
            $scope.totalPage.cancel = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.cancel.push(i+1);
            }

          } else if (type == 'all') {
            $scope.data.all = res.data.data;
            $scope.total.all  = res.data.total;
            $scope.count.all = res.data.count;
            $scope.num.all = res.data.num;
            $scope.totalPage.all = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.all.push(i+1);
            }
            
          }
        })
    }

    query('do');
    query('doing');
    query('done');
    query('cancel');
    query('all');

    $scope.addExpress = function(doTask) {
      var data = {};
      data.doTaskExtendExpressName = doTask.doTaskExtendExpressName;
      data.doTaskExtendExpressId = doTask.doTaskExtendExpressId;
      data.doTaskExtendDoTaskId = doTask.doTaskDetailDoTaskId;
      data.doTaskExtendTaskId = doTask.id;
      $http.post('/admin/dotask/addExpress', data)
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.editExpress = function(doTask) {
      var data = {};
      data.doTaskExtendExpressName = doTask.doTaskExtendExpressName;
      data.doTaskExtendExpressId = doTask.doTaskExtendExpressId;
      data.doTaskExtendDoTaskId = doTask.doTaskDetailDoTaskId;
      data.doTaskExtendTaskId = doTask.doTaskDetailTaskId;
      $http.post('/admin/dotask/editExpress', data)
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.doit = function(doTask) {
      window.open('/admin/dotask/doit?id=' + doTask.id);
    };

    $scope.cancel = function(doTask) {
      var r = confirm('请确认是否要撤销任务单');

      if (r) {
        var data = {};
        if (!doTask.id) {
          alert('撤销失败');
          return false;
        }
        data.id = doTask.id;
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

    $scope.cancelExpress = function(doTask) {
      var r = confirm('请确认是否要撤销任务单');

      if (r) {
        var data = {};
        if (!doTask.id) {
          alert('撤销失败');
          return false;
        }
        data.id = doTask.id;
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

    $scope.printExpress = function() {
      $http.post('/admin/dotask/printExpress')
        .success(function(res) {
          if (res.errno == 0) {
            window.open('/resource/excel/express-' + res.data + '.xlsx');
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.printOrder = function() {
      $http.post('/admin/dotask/printOrder')
        .success(function(res) {
          if (res.errno == 0) {
            window.open('/resource/excel/order-' + res.data + '.xlsx');
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.statusMap = {
      '-1': '已撤销'
      , '0': '待完成'
      , '1': '待添加订单号'
      , '2': '待发货'
      , '3': '待收货'
      , '4': '待退款'
      , '5': '待确认退款'
      , '6': '已完成'
      , '8': '已申请退款'
      , '9': '申请退款已完成'
      , platform: {
        'taobao': '淘宝'
        , 'tmall': '天猫'
        , 'jd': '京东'
      }
    }
  })

  DoTaskModule.controller('doitTaskCtrl', function($scope, $http, $upload) {
    $scope.upload = function(file) {
      return $upload.upload({
        url: '/home/index/upload',
        file: file
      })
    };

    $scope.$watch('data.talkimage', function () {
      if (!$scope.data.talkimage) {
        return false;
      }
      $scope
        .upload($scope.data.talkimage)
        .success(function(data, status, headers, config) {
          $scope.data.talkImagefile = data.filename;
        })
    });

    $scope.$watch('data.orderimage', function () {
      if (!$scope.data.orderimage) {
        return false;
      }
      $scope
        .upload($scope.data.orderimage)
        .success(function(data, status, headers, config) {
          $scope.data.orderImagefile = data.filename;
        })
    });

    $scope.submit = function() {
      if (!$scope.data.orderId) {
        alert('请填写订单');
        return false;
      }

      if (!$scope.data.orderMoney) {
        alert('请填写实付金额');
        return false;
      }

      if (!$scope.data.orderTime) {
        alert('请填写下单时间');
        return false;
      }

      $http.post('/admin/dotask/doit', {
        taskId: $scope.data.doTaskTaskId
        , doTaskId: $scope.data.doTaskId
        , itemUrl: $scope.data.itemUrl
        , itemUrl1: $scope.data.itemUrl1
        , itemUrl2: $scope.data.itemUrl2
        , itemUrl3: $scope.data.itemUrl3
        , itemUrl4: $scope.data.itemUrl4
        , talkImagefile: $scope.data.talkImagefile
        , orderImagefile: $scope.data.orderImagefile
        , orderId: $scope.data.orderId
        , orderTime: $scope.data.orderTime
      })
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            window.close();
          } else {
            alert(res.errmsg);
          }
        });
    }
  })
})();