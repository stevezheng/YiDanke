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
      if (!$scope.shopId) {
        alert('请选择店铺');
        return false;
      }
      location.href = '/publish/' + $scope.platform + '/' + $scope.publishType + '?shopId=' + $scope.shopId;
    };

    function getShops() {
      $http.get('/seller/publish/getShops')
        .success(function(res) {
          $scope.shops = res.data;
        })
    }

    getShops();
  });
})();