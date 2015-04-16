(function() {
  var DoTaskModule = angular.module('YiApp.DoTask', []);

  DoTaskModule.controller('doTaskCtrl', function($scope, $http) {

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
      console.log($scope.doTaskId);
      $http.get('/buyer/dotask/getOne?id=' + $scope.doTaskId)
        .success(function(res) {
          res.data.doTaskFinishTime = moment(res.data.doTaskCreateTime).add(1, 'd').format('YYYY-MM-DD HH:mm');
          $scope.doTask = res.data;
        })
    }

    getOne();
  });
})();