(function() {
  var TaobaoIndexModule = angular.module('YiApp.TaobaoIndex', ['angularFileUpload']);

  TaobaoIndexModule.controller('taobaoIndexCtrl', ['$scope', '$http', '$upload', function($scope, $http, $upload) {
    $scope.step = 3; //默认值为:2

    $scope.nextStep = function(step) {
      $scope.step = step;
    };

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

    $scope.$watch('extendItem1.image', function () {
      if (!$scope.extendItem1.image) {
        return false;
      }
      $scope
        .upload($scope.extendItem1.image)
        .success(function(data, status, headers, config) {
          $scope.extendItem1.imagefile = data.filename;
        })
    });

    $scope.$watch('extendItem2.image', function () {
      if (!$scope.extendItem2.image) {
        return false;
      }
      $scope
        .upload($scope.extendItem2.image)
        .success(function(data, status, headers, config) {
          $scope.extendItem2.imagefile = data.filename;
        })
    });

    //step2 start
    $scope.extendCount = 1;
    $scope.itemFlag = false;
    $scope.transportFlag = false;

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
      , totalCount: 3
      , _totalCount: 3
      , pcCount: 0
      , phoneCount: 0
    };

    $scope.extendItem1 = {
      name: ''
      , url: ''
      , image: ''
      , imagefile: ''
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
      , imagefile: ''
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
      //检查商品信息
      if (!$scope.item.name) {
        alert('请检查商品名称是否正确');
        return false;
      }

      if (!$scope.item.url) {
        alert('请检查商品链接是否正确');
        return false;
      }

      if (!$scope.item.money) {
        alert('请检查单品售价是否正确');
        return false;
      }

      if (!$scope.item.count) {
        alert('请检查每单拍是否正确');
        return false;
      }

      if ($scope.item.count * $scope.item.money <= 0) {
        alert('请检查商品金额是否正确');
        return false;
      }

      //检查淘宝搜索框
      if ($scope.taobao.searchBox) {
        if (!$scope.taobao.imagefile) {
          alert('请检查淘宝商品主图是否正确');
          return false;
        }

        if ($scope.taobao.keywordsCount > 0) {
          if (!$scope.taobao.key1 && $scope.taobao.key1.length > 10) {
            alert('淘宝商品关键字1，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.taobao.keywordsCount > 1) {
          if (!$scope.taobao.key2 && $scope.taobao.key2.length > 10) {
            alert('淘宝商品关键字2，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.taobao.keywordsCount > 2) {
          if (!$scope.taobao.key3 && $scope.taobao.key3.length > 10) {
            alert('淘宝商品关键字3，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.taobao.keywordsCount > 3) {
          if (!$scope.taobao.key4 && $scope.taobao.key4.length > 10) {
            alert('淘宝商品关键字4，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.taobao.keywordsCount > 4) {
          if (!$scope.taobao.key5 && $scope.taobao.key5.length > 10) {
            alert('淘宝商品关键字5，不能为空且输入中文不能超过10个字');
            return false;
          }
        }
      }
      //检查天猫搜索框
      if ($scope.tmall.searchBox) {
        if (!$scope.tmall.imagefile) {
          alert('请检查天猫商品主图是否正确');
          return false;
        }

        if ($scope.tmall.keywordsCount > 0) {
          if (!$scope.tmall.key1 && $scope.tmall.key1.length > 10) {
            alert('天猫商品关键字1，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.tmall.keywordsCount > 1) {
          if (!$scope.tmall.key2 && $scope.tmall.key2.length > 10) {
            alert('天猫商品关键字2，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.tmall.keywordsCount > 2) {
          if (!$scope.tmall.key3 && $scope.tmall.key3.length > 10) {
            alert('天猫商品关键字3，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.tmall.keywordsCount > 3) {
          if (!$scope.tmall.key4 && $scope.tmall.key4.length > 10) {
            alert('天猫商品关键字4，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.tmall.keywordsCount > 4) {
          if (!$scope.tmall.key5 && $scope.tmall.key5.length > 10) {
            alert('天猫商品关键字5，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.extendCount > 1) {
          if (!$scope.extendItem1.name) {
            alert('请检查商品2,商品名是否正确');
            return false;
          }

          if (!$scope.extendItem1.url) {
            alert('请检查商品2,商品链接是否正确');
            return false;
          }

          if (!$scope.extendItem1.money) {
            alert('请检查商品2,商品售价是否正确');
            return false;
          }

          if (!$scope.extendItem1.count) {
            alert('请检查商品2,每单拍是否正确');
            return false;
          }

          if ($scope.extendItem1.count * $scope.extendItem1.money <= 0) {
            alert('请检查商品2,金额是否正确');
            return false;
          }
        }

        if ($scope.extendCount > 2) {
          if (!$scope.extendItem2.name) {
            alert('请检查商品3,商品名是否正确');
            return false;
          }

          if (!$scope.extendItem2.url) {
            alert('请检查商品3,商品链接是否正确');
            return false;
          }

          if (!$scope.extendItem2.money) {
            alert('请检查商品3,商品售价是否正确');
            return false;
          }

          if (!$scope.extendItem2.count) {
            alert('请检查商品3,每单拍是否正确');
            return false;
          }

          if ($scope.extendItem2.count * $scope.extendItem2.money <= 0) {
            alert('请检查商品3,金额是否正确');
            return false;
          }
        }
      }

      $scope.itemFlag = true;
    };

    $scope.transport = 'baoyou';

    $scope.confirmTransport = function() {
      $scope.transportFlag = true;
    };
    //step2 end

    //step3 start
    //step3 end
  }]);
})();