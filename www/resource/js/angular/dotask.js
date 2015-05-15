(function() {

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  function getQueryStringByUrl(url, name) {
    url = url.split('?')[1];
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var _url = url.split('?')[1];
    var r = _url.match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  function checkUrl(val, url) {
    if (val.slice(0, 7) != 'http://') {
      alert(url + '请以http://开头');
      return false;
    }

    if (val.slice(0, 18) != 'http://item.taobao'
      && val.slice(0, 19) != 'http://detail.tmall') {
      alert(url + '请输入正确的商品链接');
      return false;
    }

    return true;
  }

  function checkJdUrl(val, url) {
    if (val.slice(0, 7) != 'http://') {
      alert(url + '请以http://开头');
      return false;
    }

    if (val.slice(0, 14) != 'http://item.jd') {
      alert(url + '请输入正确的商品链接');
      return false;
    }

    return true;
  }

  var DoTaskModule = angular.module('YiApp.DoTask', ['angularFileUpload']);

  DoTaskModule.controller('doTaskCtrl', function($scope, $http, $upload, $timeout) {
    $scope.actionOrder = function() {
      if ($scope.order.orderId == '') {
        alert('请填写订单');
        return false;
      }

      if ($scope.order.orderMoney == '') {
        alert('请填写实付金额');
        return false;
      }

      if ($scope.order.orderTime== '') {
        alert('请填写下单时间');
        return false;
      }

      $http.post('/buyer/dotask/order', {
        taskId: $scope.doTask.doTaskTaskId
        , doTaskId: $scope.doTaskId
        , itemUrl: $scope.itemUrl
        , itemUrl1: $scope.item.url1
        , itemUrl2: $scope.item.url2
        , itemUrl3: $scope.item.url3
        , itemUrl4: $scope.item.url4
        , talkImagefile: $scope.talk.imagefile
        , orderImagefile: $scope.order.imagefile
        , orderId: $scope.order.orderId
        , orderMoney: $scope.order.orderMoney
        , orderTime: $scope.order.orderTime
      })
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            location.href = '/buyer';
          } else {
            alert(res.errmsg);
          }
        });
    };
    $scope.step = 1;

    $scope.checkUrlFlag = false;
    $scope.nextFlag = false;
    $scope.nextStep2Flag = false;
    $scope.nextStep3Flag = false;
    $scope.nextStep4Flag = false;
    $scope.nextStep5Flag = false;
    $scope.nextStep6Flag = false;

    $timeout(function() {
      $scope.nextFlag = true;
      $scope.nextStep2Flag = true;
      $scope.nextStep3Flag = true;
      //$scope.nextStep4Flag = true;
      $scope.nextStep5Flag = true;
      $scope.nextStep6Flag = true;
    }, 20000);


    $scope.itemUrl = '';

    $scope.item = {
      url1: ''
      , url2: ''
      , url3: ''
      , url4: ''
    };

    $scope.nextStep = function(step) {
      $scope.nextFlag = false;
      $scope.nextStep2Flag = false;
      $scope.nextStep3Flag = false;
      $scope.nextStep4Flag = false;
      $scope.nextStep5Flag = false;
      $scope.nextStep6Flag = false;

      $timeout(function() {
        $scope.nextFlag = true;
        $scope.nextStep2Flag = true;
        $scope.nextStep3Flag = true;
        $scope.nextStep5Flag = true;
        $scope.nextStep6Flag = true;
      }, 20000);

      $timeout(function() {
        $scope.nextStep4Flag = true;
      }, 300000);

      if (step == 4) {
        if (!$scope.item.url1) {
          alert('请填写宝贝页地址1');
          return false;
        }

        if (!$scope.item.url2) {
          alert('请填写宝贝页地址2');
          return false;
        }

        if (!$scope.item.url3) {
          alert('请填写宝贝页地址3');
          return false;
        }

        if (!$scope.item.url4) {
          alert('请填写宝贝页地址4');
          return false;
        }

        var url1 = $scope.item.url1;
        var url2 = $scope.item.url2;
        var url3 = $scope.item.url3;
        var url4 = $scope.item.url4;

        var r1 = checkUrl($scope.item.url1, '宝贝页地址1');
        var r2 = checkUrl($scope.item.url2, '宝贝页地址2');
        var r3 = checkUrl($scope.item.url3, '宝贝页地址3');
        var r4 = checkUrl($scope.item.url4, '宝贝页地址4');

        if (!r1 || !r2 || !r3 || !r4) {
          return false;
        }
        if (url1 == url2 || url1 == url3 || url1 == url4
          || url2 == url3 || url2 == url4 || url3 == url4) {
          alert('请不要填写相同的链接');
          return false;
        }

        if (!$scope.talk.imagefile) {
          alert('请上传聊天记录截图');
          return false;
        }
      }
      $scope.step = step;
    };

    $scope.talk = {};
    $scope.order = {};

    $scope.upload = function(file) {
      return $upload.upload({
        url: '/home/index/upload',
        file: file
      })
    };

    $scope.$watch('talk.image', function () {
      if (!$scope.talk.image) {
        return false;
      }
      $scope
        .upload($scope.talk.image)
        .success(function(data, status, headers, config) {
          $scope.talk.imagefile = data.filename;
        })
    });

    $scope.$watch('order.image', function () {
      if (!$scope.order.image) {
        return false;
      }
      $scope
        .upload($scope.order.image)
        .success(function(data, status, headers, config) {
          $scope.order.imagefile = data.filename;
        })
    });

    $scope.checkUrl = function(itemUrl) {
      var id = getQueryStringByUrl(itemUrl, 'id');
      var _id = getQueryStringByUrl($scope.doTask.taskUrl, 'id');
      if (id == _id) {
        alert('商品链接正确(请勿关闭此商品页面)');
        $scope.checkUrlFlag = true;
      } else {
        alert('链接地址错误');
        return false;
      }
    };

    $scope.statusMap = {
      platform: {
        'taobao': '淘宝'
        , 'tmall': '天猫'
        , 'jd': '京东'
      }
    };

    $scope.doTaskId = getQueryString('id');

    function getOne() {
      $http.get('/buyer/dotask/getOne?id=' + $scope.doTaskId)
        .success(function(res) {
          res.data.doTaskDeadline = moment(res.data.doTaskCreateTime).add(1, 'd').format('YYYY-MM-DD HH:mm');
          res.data.doTaskCountdown = moment(res.data.doTaskCreateTime).add(1, 'd').diff(moment(), 'hours');
          $scope.doTask = res.data;

          $http.get('/buyer/account/getOne?id=' + res.data.doTaskAccountId)
            .success(function(res1) {
              $scope.account = res1.data;
            })
        })
    }

    getOne();
  });

  DoTaskModule.controller('doTaskJdCtrl', function($scope, $http, $upload, $timeout) {
    $scope.nextFlag = false;

    $scope.actionOrder = function() {
      if ($scope.order.orderId == '') {
        alert('请填写订单');
        return false;
      }

      if ($scope.order.orderMoney == '') {
        alert('请填写实付金额');
        return false;
      }

      if ($scope.order.orderTime== '') {
        alert('请填写下单时间');
        return false;
      }
      $http.post('/buyer/dotask/order', {
        taskId: $scope.doTask.doTaskTaskId
        , doTaskId: $scope.doTaskId
        , itemUrl: $scope.itemUrl
        , itemUrl1: $scope.item.url1
        , itemUrl2: $scope.item.url2
        , itemUrl3: $scope.item.url3
        , itemUrl4: $scope.item.url4
        , talkImagefile: $scope.talk.imagefile
        , orderImagefile: $scope.order.imagefile
        , orderId: $scope.order.orderId
        , orderMoney: $scope.order.orderMoney
        , orderTime: $scope.order.orderTime
      })
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            location.href = '/buyer';
          } else {
            alert(res.errmsg);
          }
        });
    };
    $scope.step = 1;

    $scope.checkUrlFlag = false;
    $scope.itemUrl = '';

    $scope.item = {
      url1: ''
      , url2: ''
      , url3: ''
      , url4: ''
    };

    $scope.nextStep = function(step) {
      $scope.nextFlag = false;

      $timeout(function() {
        $scope.nextFlag = true;
      }, 20000);
      if (step == 3) {
        if (!$scope.item.url1) {
          alert('请填写宝贝页地址1');
          return false;
        }

        if (!$scope.item.url2) {
          alert('请填写宝贝页地址2');
          return false;
        }

        if (!$scope.item.url3) {
          alert('请填写宝贝页地址3');
          return false;
        }

        if (!$scope.item.url4) {
          alert('请填写宝贝页地址4');
          return false;
        }

        var url1 = $scope.item.url1;
        var url2 = $scope.item.url2;
        var url3 = $scope.item.url3;
        var url4 = $scope.item.url4;

        var r1 = checkJdUrl($scope.item.url1, '宝贝页地址1');
        var r2 = checkJdUrl($scope.item.url2, '宝贝页地址2');
        var r3 = checkJdUrl($scope.item.url3, '宝贝页地址3');
        var r4 = checkJdUrl($scope.item.url4, '宝贝页地址4');

        if (!r1 || !r2 || !r3 || !r4) {
          return false;
        }
        if (url1 == url2 || url1 == url3 || url1 == url4
          || url2 == url3 || url2 == url4 || url3 == url4) {
          alert('请不要填写相同的链接');
          return false;
        }
      }
      $scope.step = step;
    };

    $scope.talk = {};
    $scope.order = {};

    $scope.upload = function(file) {
      return $upload.upload({
        url: '/home/index/upload',
        file: file
      })
    };

    $scope.$watch('talk.image', function () {
      if (!$scope.talk.image) {
        return false;
      }
      $scope
        .upload($scope.talk.image)
        .success(function(data, status, headers, config) {
          $scope.talk.imagefile = data.filename;
        })
    });

    $scope.$watch('order.image', function () {
      if (!$scope.order.image) {
        return false;
      }
      $scope
        .upload($scope.order.image)
        .success(function(data, status, headers, config) {
          $scope.order.imagefile = data.filename;
        })
    });

    $scope.checkJdUrl = function(itemUrl) {
      if (itemUrl == $scope.doTask.taskUrl) {
        alert('商品链接正确(请勿关闭此商品页面)');
        $scope.checkUrlFlag = true;
        $scope.nextFlag = true;
      } else {
        alert('链接地址错误');
        return false;
      }
    };

    $scope.statusMap = {
      platform: {
        'taobao': '淘宝'
        , 'tmall': '天猫'
        , 'jd': '京东'
      }
    };

    $scope.doTaskId = getQueryString('id');

    function getOne() {
      $http.get('/buyer/dotask/getOne?id=' + $scope.doTaskId)
        .success(function(res) {
          res.data.doTaskDeadline = moment(res.data.doTaskCreateTime).add(1, 'd').format('YYYY-MM-DD HH:mm');
          res.data.doTaskCountdown = moment(res.data.doTaskCreateTime).add(1, 'd').diff(moment(), 'hours');
          $scope.doTask = res.data;

          $http.get('/buyer/account/getOne?id=' + res.data.doTaskAccountId)
            .success(function(res1) {
              $scope.account = res1.data;
            })
        })
    }

    getOne();
  })
})();