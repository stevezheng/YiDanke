(function() {
  var TaobaoIndexModule = angular.module('YiApp.TaobaoIndex', []);

  TaobaoIndexModule.controller('taobaoIndexCtrl', function($scope, $http) {
    $scope.step = 2;

    $scope.taobao = {
      searchBox: false
      , keywordsCount: 1
    };

    $scope.tmall = {
      searchBoxFlag: false
      , keywordsCount: 1
    };

    $scope.addTaobaoKeywordCount = function() {
      if ($scope.taobao.keywordsCount < 5) {
        $scope.taobao.keywordsCount++;
      }
    };

    $scope.subTaobaoKeywordCount = function() {
      if ($scope.taobao.keywordsCount > 1) {
        $scope.taobao.keywordsCount--;
      }
    };
  });
})();