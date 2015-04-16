(function() {
  var DoTaskModule = angular.module('YiApp.DoTask', []);

  DoTaskModule.controller('doTaskCtrl', function($scope, $http) {
    $scope.step = 1;

    $scope.nextStep = function(step) {
      if (step == 3) {

      }

      $scope.step = step;
    };

    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }

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