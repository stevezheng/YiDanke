(function() {

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  function getQueryStringByUrl(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var _url = url.split('?')[1];
    var r = _url.match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  var DoTaskModule = angular.module('YiApp.DoTask', []);

  DoTaskModule.controller('doTaskCtrl', function($scope, $http) {
    $scope.step = 1;

    $scope.checkUrlFlag = false;
    $scope.itemUrl = '';

    $scope.nextStep = function(step) {
      if (step == 3) {

      }

      $scope.step = step;
    };

    $scope.checkUrl = function(itemUrl) {
      var id = getQueryStringByUrl(itemUrl, 'id');
      var _id = getQueryStringByUrl($scope.doTask.taskUrl, 'id');
      if (id == _id) {
        alert('链接地址正确');
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
          console.log(res.data.doTaskCountdown);
          $scope.doTask = res.data;
        })
    }

    getOne();
  });
})();