(function() {
  var TaobaoIndexModule = angular.module('YiApp.TaobaoIndex', []);

  TaobaoIndexModule.controller('taobaoIndexCtrl', function($scope, $http) {
    $scope.step = 2;

    $scope.extendCount = 1;

    $scope.taobao = {
      searchBox: true
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

    $scope.addTmallKeywordCount = function() {
      if ($scope.tmall.keywordsCount < 5) {
        $scope.tmall.keywordsCount++;
      }
    };

    $scope.subTmallKeywordCount = function() {
      if ($scope.tmall.keywordsCount > 1) {
        $scope.tmall.keywordsCount--;
      }
    };

    $scope.addExtendCount = function() {
      if ($scope.extendCount < 3) {
        $scope.extendCount++;
      }
    }

    $scope.subExtendCount = function() {
      if ($scope.extendCount > 1) {
        $scope.extendCount--;
      }
    }
  });
})();