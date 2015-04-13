(function() {
  var TaobaoIndexModule = angular.module('YiApp.TaobaoIndex', ['angularFileUpload']);

  TaobaoIndexModule.controller('taobaoIndexCtrl', ['$scope', '$http', '$upload', function($scope, $http, $upload) {
    $scope.step = 2;

    $scope.upload = function(file) {
      return $upload.upload({
        url: '/home/index/upload',
        file: file
      })
    };

    $scope.$watch('taobao.image', function () {
      if (!$scope.taobao.image) {
        return false;
      }
      $scope
        .upload($scope.taobao.image)
        .success(function(data, status, headers, config) {
          $scope.taobao.imagefile = data.filename;
        })
    });

    $scope.$watch('tmall.image', function () {
      if (!$scope.tmall.image) {
        return false;
      }
      $scope
        .upload($scope.tmall.image)
        .success(function(data, status, headers, config) {
          $scope.tmall.imagefile = data.filename;
        })
    });

    //step2 start
    $scope.extendCount = 1;

    $scope.item = {
      name: ''
      , url: ''
      , tag1: ''
      , tag2: ''
      , money: null
      , count: null
      , searchMoney: null
      , priceStart: null
      , priceEnd: null
      , position: '全国'
    };
    $scope.extendItem1 = {
      name: ''
      , url: ''
      , image: ''
      , tag1: ''
      , tag2: ''
      , money: null
      , count: null
      , searchMoney: null
    };

    $scope.extendItem2 = {
      name: ''
      , url: ''
      , image: ''
      , tag1: ''
      , tag2: ''
      , money: null
      , count: null
      , searchMoney: null
    };

    $scope.taobao = {
      searchBox: true
      , keywordsCount: 1
      , key1: ''
      , key1extend1: ''
      , key1extend2: ''
      , key1extend3: ''
      , key1extend4: ''
      , key2: ''
      , key2extend1: ''
      , key2extend2: ''
      , key2extend3: ''
      , key2extend4: ''
      , key3: ''
      , key3extend1: ''
      , key3extend2: ''
      , key3extend3: ''
      , key3extend4: ''
      , key4: ''
      , key4extend1: ''
      , key4extend2: ''
      , key4extend3: ''
      , key4extend4: ''
      , key5: ''
      , key5extend1: ''
      , key5extend2: ''
      , key5extend3: ''
      , key5extend4: ''
    };

    $scope.tmall = {
      searchBox: false
      , keywordsCount: 1
      , key1: ''
      , key1extend1: ''
      , key1extend2: ''
      , key1extend3: ''
      , key1extend4: ''
      , key2: ''
      , key2extend1: ''
      , key2extend2: ''
      , key2extend3: ''
      , key2extend4: ''
      , key3: ''
      , key3extend1: ''
      , key3extend2: ''
      , key3extend3: ''
      , key3extend4: ''
      , key4: ''
      , key4extend1: ''
      , key4extend2: ''
      , key4extend3: ''
      , key4extend4: ''
      , key5: ''
      , key5extend1: ''
      , key5extend2: ''
      , key5extend3: ''
      , key5extend4: ''
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
    };

    $scope.subExtendCount = function() {
      if ($scope.extendCount > 1) {
        $scope.extendCount--;
      }
    };

    $scope.confirmItem = function() {
      console.log($scope.item);
      console.log($scope.taobao);
      console.log($scope.tmall);
    };

    $scope.transport = 'baoyou';

    $scope.confirmTransport = function() {
      console.log($scope.transport);
    };
    //step2 end
  }]);
})();