(function() {
  var PublishModule = angular.module('YiApp.Publish', []);

  PublishModule.controller('publishCtrl', function($scope, $http) {
    $scope.platform = 'taobao';
    $scope.shopId = 0;
    $scope.publishType = 'index';
    
    $scope.changeShopId = function(id) {
      $scope.shopId = id;
    };

    $scope.next = function() {
      location.href = '/publish/' + $scope.platform + '/' + $scope.publishType + '?shopId=' + $scope.shopId;
    };

    function getShops() {
      $http.get('/seller/publish/getShops')
        .success(function(res) {
          $scope.shops = res.data;
          $scope.shopId = res.data[0].id;
        })
    }

    getShops();
  });
})();