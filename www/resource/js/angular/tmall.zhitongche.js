(function() {
  //刷单费用
  function cost(price) {
    var coin = 0;
    var base = 0.9;
    if (0 < price && price <= 50) {
      coin = 5.5;
    } else if (50 < price && price <=  150) {
      coin = 6.6;
    } else if (150 < price && price <=  250) {
      coin = 7.7;
    } else if (250 < price && price <= 350) {
      coin = 8.6;
    } else if (350 < price && price <= 450) {
      coin = 9.6;
    } else if (450 < price && price <= 550) {
      coin = 10.6;
    } else if (550 < price && price <= 650) {
      coin = 11.6;
    } else if (650 < price && price <= 750) {
      coin = 12.6;
    } else if (750 < price && price <= 850) {
      coin = 13.6;
    } else if (850 < price && price <= 950) {
      coin = 14.6;
    } else if (950 < price && price <= 1050) {
      coin = 15.6;
    } else if (1050 < price && price <= 1150) {
      coin = 16.8;
    } else if (1150 < price && price <= 1250) {
      coin = 17.8;
    } else {
      coin = 9999999;
    }
    coin += 0.5;
    return (coin * base).toFixed(2);
  }

  var TmallZhitongcheModule = angular.module('YiApp.TmallZhitongche', ['angularFileUpload']);

  TmallZhitongcheModule.controller('tmallZhitongcheCtrl', ['$scope', '$http', '$upload', function($scope, $http, $upload) {
    $scope.upload = function(file) {
      return $upload.upload({
        url: '/home/index/upload',
        file: file
      })
    };

    $scope.step = 2; //默认值为:2

    $scope.taskId = null;

    //直通车专属
    $scope.zhitongche = {
      name: ''
      , money: null
      , imagefile1: null
      , imagefile2: null
    };

     //任务花费明细
    $scope.cost = {
      totalCount: 0 //最终刷单数
      , totalMoney: 0 //最终商品1、商品2、商品3的总价格

      //, transport: 0 //快递费

      , promise: 0 //退款保证金
      , totalPromise: 0 //总退款保证金

      , fee: 0 //刷单一单的费用
      , totalFee: 0 //刷单总的费用

      , phone: 0 //移动端刷单附加费

      , isPayback: true //是否平台返款
      , payback: 0 //平台返款服务费

      , speed: 0 //提升完成任务速度

      , isExtendFee: false //是否平台加赏任务佣金
      , extendFee: 2 //加赏单任务佣金

      , isInterval: false //是否任务发布间隔
      , intervalTime: 10 //每隔多久发布
      , intervalCount: 1 //间隔发布几个
      , interval: 10 //任务间隔发布费用

      , selectPV: 60 //选择流量
      , freePV: 0 //自定义流量
      , pv: 60 //实际使用流量

      , cycleTime: 0 //延长买家购物周期与费用(周期和费用一样)
      , totalCycle: 0 //延长买家购物周期总共费用 totalCycle = cycleTime * totalCount

      , isGoodComment: false //是否优质好评
      , goodCommentCount: 3 //好评个数
      , goodCommentFee: 0 //好评费用
      , goodComment: [ //好评内容
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]
    };

    $scope.addGoodComment = function() {
      if ($scope.cost.goodCommentCount < 10) {
        $scope.cost.goodCommentCount++;
      }
    };

    $scope.subGoodComment = function() {
      if ($scope.cost.goodCommentCount > 3) {
        $scope.cost.goodCommentCount--;
      }
    };

    $scope.nextStep = function(step) {
      //需要检查第二步里面的数据是否正确
      if (step == 3) {
        $scope.confirmItem();
        $scope.confirmTransport();
      }

      //需要检查第三步里面的数据是否正确
      if (step == 4) {
        //判断刷单数是否是自定义的
        var totalCount = 0;
        if ($scope.item.totalCount == 0) {
          totalCount = $scope.item.freeTotalCount;
        } else {
          totalCount = $scope.item.totalCount;
        }
        totalCount = parseInt(totalCount);
        $scope.cost.totalCount = totalCount;
        $scope.cost.goodCommentFee = totalCount;

        if (parseInt($scope.item.phoneCount) < parseInt($scope.item.pcCount)) {
          alert('手机订单的数量至少要占据订单总数的50%');
          return false;
        }

        if (parseInt($scope.item.phoneCount) + parseInt($scope.item.pcCount) != totalCount) {
          alert('电脑端、手机端/Pad端订单总数需要为 '+totalCount+' 单');
          return false;
        }

        //判断关键词总数
        var keywordsCount = parseInt($scope.taobao.key1Count)
          + parseInt($scope.taobao.key2Count)
          + parseInt($scope.taobao.key3Count)
          + parseInt($scope.taobao.key4Count)
          + parseInt($scope.taobao.key5Count)
          + parseInt($scope.tmall.key1Count)
          + parseInt($scope.tmall.key2Count)
          + parseInt($scope.tmall.key3Count)
          + parseInt($scope.tmall.key4Count)
          + parseInt($scope.tmall.key5Count);

        if (keywordsCount != totalCount) {
          alert('各关键词订单总数需要为 '+totalCount+' 单');
          return false;
        }

        $scope.cost.totalFee = $scope.cost.fee * $scope.cost.totalCount;
        $scope.cost.payback = $scope.cost.totalCount * $scope.cost.totalMoney * 0.006;
        $scope.cost.phone = $scope.item.phoneCount * 0.5;
        $scope.cost.totalPromise = $scope.cost.promise * $scope.cost.totalCount;

      }

      if (step == 5) {
        if ($scope.cost.pv > $scope.user.pv) {
          alert('流量不足，请先充值流量');
          document.getElementById('pv').click();
          window.open('/seller/money');
          return false;
        }

        $scope.cost.allCoin =($scope.cost.totalMoney * 1.05 + $scope.cost.promise) * $scope.cost.totalCount;
        $scope.cost.allMoney = ($scope.cost.totalFee * 1 + $scope.cost.transport * $scope.cost.totalCount) + $scope.cost.payback * 1 + $scope.cost.speed * 1 + ($scope.cost.isExtendFee?$scope.cost.extendFee * $scope.cost.totalCount:0) + ($scope.cost.isInterval?$scope.cost.interval:0) * 1 + ($scope.cost.cycleTime * 1) * ($scope.cost.totalCount * 1) + ($scope.cost.isGoodComment?$scope.cost.goodCommentFee * 1: 0) + $scope.cost.phone * 1;
        //if (!$scope.taskId) {
          $http.post('/publish/tmall/zhitongche', {
            user: $scope.user
            , cost: $scope.cost
            , item: $scope.item
            , taobao: $scope.taobao
            , tmall: $scope.tmall
            , extendItem1: $scope.extendItem1
            , extendItem2: $scope.extendItem2
            , transport: $scope.transport
            , zhitongche: $scope.zhitongche
          }).success(function(res) {
            if (res.errno == 0) {
              $scope.taskId = res.data;
            }
          })
        //}

        $scope.cost.payKuaiqianFlag = true;

        $scope.cost.payCoinFlag = true;
        if ($scope.user.coin == 0) {
          $scope.cost.payCoinFlag = false;
        }

        $scope.cost.payMoneyFlag = true;
        if ($scope.user.money == 0) {
          $scope.cost.payMoneyFlag = false;
        }

        function calculatePay() {
          var extendCoin = 0;
          var extendMoney = 0;

          var payCoin = 0; //金币支付
          var payMoney = 0; //押金支付
          var payKuaiqian = 0; //快钱支付


          //金币+押金
          if ($scope.cost.payCoinFlag && $scope.cost.payMoneyFlag) {
            //金币不够
            if ($scope.user.coin < $scope.cost.allCoin) {
              extendCoin = $scope.cost.allCoin - $scope.user.coin;
              payCoin = $scope.user.coin;
            } else {
              payCoin = $scope.cost.allCoin;
            }

            //押金不够
            if ($scope.user.money < $scope.cost.allMoney + extendCoin) {
              extendMoney = $scope.cost.allMoney + extendCoin - $scope.user.money;
              payMoney = $scope.user.money;
            } else {
              payMoney = $scope.cost.allMoney + extendCoin;
            }

            payKuaiqian = extendMoney;
          }

          //金币
          if ($scope.cost.payCoinFlag && !$scope.cost.payMoneyFlag) {
            if ($scope.user.coin < $scope.cost.allCoin) {
              extendCoin = $scope.cost.allCoin - $scope.user.coin;
              payCoin = $scope.user.coin;
            } else {
              payCoin = $scope.cost.allCoin;
            }

            payKuaiqian = $scope.cost.allMoney + extendCoin;
          }

          //押金
          if (!$scope.cost.payCoinFlag && $scope.cost.payMoneyFlag) {
            extendCoin = $scope.cost.allCoin;

            if ($scope.user.money < $scope.cost.allMoney + extendCoin) {
              extendMoney = $scope.cost.allMoney + extendCoin - $scope.user.money;
              payMoney = $scope.user.money;
            } else {
              payMoney = $scope.cost.allMoney + extendCoin;
            }

            payKuaiqian = extendMoney;
          }

          //快钱
          if (!$scope.cost.payCoinFlag && !$scope.cost.payMoneyFlag) {
            extendCoin = $scope.cost.allCoin;
            extendMoney = $scope.cost.allMoney;

            payKuaiqian = extendMoney + extendCoin;
          }

          $scope.cost.payCoin = payCoin;
          $scope.cost.payMoney = payMoney;
          $scope.cost.payKuaiqian = payKuaiqian;

          //金币+快钱

          //押金+快钱

          //金币+押金+快钱
        }

        $scope.$watch('cost.payCoinFlag', function () {
          calculatePay();
        });

        $scope.$watch('cost.payMoneyFlag', function () {
          calculatePay();
        });

        $scope.pay = function() {
          if ($scope.cost.payKuaiqian == 0) {
            //押金和金币足够支付
            $http.post('/publish/pay', {taskId: $scope.taskId, payCoin: $scope.cost.payCoin, payMoney: $scope.cost.payMoney, payPV:$scope.cost.pv})
              .success(function(res) {
                if (res.errno == 0) {
                  alert(res.data);
                  location.href = '/seller';
                } else {
                  alert(res.errmsg);
                }
              })
              .error(function(err) {
                console.error(err);
              })

          } else {
            //押金和金币不够支付
            document.getElementById('pay').click();
            window.open('/seller/money/kuaiqian?type=1&value=' + $scope.cost.payKuaiqian);
          }
        }

      }

      $scope.step = step;
    };

    $scope.doPay = function() {
      $http.post('/publish/pay', {taskId: $scope.taskId, payCoin: $scope.cost.payCoin, payMoney: $scope.cost.payMoney + $scope.cost.payKuaiqian, payPv: $scope.cost.pv})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            document.getElementById('cancel-pay').click();
            location.href = '/seller';
          } else {
            alert(res.errmsg);
          }
        })
        .error(function(err) {
          console.log(err);
        })
    };

    $scope.doPV = function() {
      $http.post('/seller/index/getOne')
        .success(function(res) {
          if (res.errno == 0) {
            $scope.user.pv = res.data.pv;
            $scope.user.coin = res.data.coin;
            $scope.user.money = res.data.money;
            document.getElementById('cancel-pv').click();
          } else {
            alert(res.errmsg);
          }
        })
    }

    $scope.$watch('item.url', function () {
      var val = $scope.item.url;
      if (val.slice(0, 18) != 'http://item.taobao'
        && val.slice(0, 19) != 'http://detail.tmall') {
        $scope.item.urlFlag = false;
      } else {
        $scope.item.urlFlag = true;
      }
    });

    $scope.$watch('extendItem1.url', function () {
      var val = $scope.extendItem1.url;
      if (val.slice(0, 18) != 'http://item.taobao'
        && val.slice(0, 19) != 'http://detail.tmall') {
        $scope.extendItem1.urlFlag = false;
      } else {
        $scope.extendItem1.urlFlag = true;
      }
    });

    $scope.$watch('extendItem2.url', function () {
      var val = $scope.extendItem2.url;
      if (val.slice(0, 18) != 'http://item.taobao'
        && val.slice(0, 19) != 'http://detail.tmall') {
        $scope.extendItem2.urlFlag = false;
      } else {
        $scope.extendItem2.urlFlag = true;
      }
    });

    $scope.$watch('zhitongche.image1', function () {
      if (!$scope.zhitongche.image1) {
        return false;
      }
      $scope
        .upload($scope.zhitongche.image1)
        .success(function(data, status, headers, config) {
          $scope.zhitongche.imagefile1 = data.filename;
        })
    });

    $scope.$watch('zhitongche.image2', function () {
      if (!$scope.zhitongche.image2) {
        return false;
      }
      $scope
        .upload($scope.zhitongche.image2)
        .success(function(data, status, headers, config) {
          $scope.zhitongche.imagefile2 = data.filename;
        })
    });

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

    //$scope.$watch('cost.extendFee', function() {
    //  if ($scope.cost.extendFee < 2 || !angular.isNumber($scope.cost.extendFee)) {
    //    $scope.cost.extendFee = 2;
    //  }
    //});

    $scope.$watch('cost.selectPV', function() {
      if ($scope.cost.selectPV == 0) {
        $scope.cost.pv = $scope.cost.freePV;
      } else {
        $scope.cost.pv = $scope.cost.selectPV;
      }
    });

    $scope.$watch('cost.freePV', function() {
      //if (parseInt($scope.cost.freePV) < 30 || !angular.isNumber($scope.cost.freePV)) {
      //  $scope.cost.freePV = 30;
      //}

      if ($scope.cost.selectPV == 0) {
        $scope.cost.pv = $scope.cost.freePV;
      } else {
        $scope.cost.pv = $scope.cost.selectPV;
      }
    });

    //step2 start
    $scope.extendCount = 1;
    $scope.itemFlag = false;
    $scope.transportFlag = false;

    $scope.item = {
      name: '' //商品名称
      , url: '' //商品链接
      , urlFlag: '' //商品链接是否正确
      , tag1: '' //规格1
      , tag2: '' //规格2
      , money: null //购买价格
      , count: null //购买数量
      , searchMoney: null //搜索价格
      , priceStart: null //搜索价格开始
      , priceEnd: null //搜索价格结束
      , position: '全国'
      , totalCount: 3 //选择刷单数
      , freeTotalCount: 3 //自定义刷单数
      , pcCount: 0 //电脑端刷单数
      , phoneCount: 0 //移动端刷单数
      , tips: '' //下单提示
    };

    $scope.extendItem1 = {
      name: ''
      , url: ''
      , urlFlag: '' //商品链接是否正确
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
      , urlFlag: '' //商品链接是否正确
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
      , key1Count: 0
      , key1extend1: ''
      , key1extend2: ''
      , key1extend3: ''
      , key1extend4: ''
      , key2: ''
      , key2Count: 0
      , key2extend1: ''
      , key2extend2: ''
      , key2extend3: ''
      , key2extend4: ''
      , key3: ''
      , key3Count: 0
      , key3extend1: ''
      , key3extend2: ''
      , key3extend3: ''
      , key3extend4: ''
      , key4: ''
      , key4Count: 0
      , key4extend1: ''
      , key4extend2: ''
      , key4extend3: ''
      , key4extend4: ''
      , key5: ''
      , key5Count: 0
      , key5extend1: ''
      , key5extend2: ''
      , key5extend3: ''
      , key5extend4: ''
    };

    $scope.tmall = {
      searchBox: false
      , keywordsCount: 1
      , key1: ''
      , key1Count: 0
      , key1extend1: ''
      , key1extend2: ''
      , key1extend3: ''
      , key1extend4: ''
      , key2: ''
      , key2Count: 0
      , key2extend1: ''
      , key2extend2: ''
      , key2extend3: ''
      , key2extend4: ''
      , key3: ''
      , key3Count: 0
      , key3extend1: ''
      , key3extend2: ''
      , key3extend3: ''
      , key3extend4: ''
      , key4: ''
      , key4Count: 0
      , key4extend1: ''
      , key4extend2: ''
      , key4extend3: ''
      , key4extend4: ''
      , key5: ''
      , key5Count: 0
      , key5extend1: ''
      , key5extend2: ''
      , key5extend3: ''
      , key5extend4: ''
    };
    var taskId = getQueryString('taskId');

    if (taskId) {
      $http.post('/publish/index/getTask', {taskId: taskId})
        .success(function(res) {
          if (res.errno == 0) {
            res = res.data;
            //任务花费明细
            $scope.cost = {
              totalCount: res.taskTotalCount //最终刷单数
              , totalMoney: res.taskTotalMoney //最终商品1、商品2、商品3的总价格

              //, transport: 0 //快递费

              , promise: res.taskPromise //退款保证金
              , totalPromise: res.taskTotalPromise //总退款保证金

              , fee: res.taskFee //刷单一单的费用
              , totalFee: res.taskTotalFee //刷单总的费用

              , phone: res.taskPhone //移动端刷单附加费

              , isPayback: res.taskIsPayback//是否平台返款
              , payback: res.taskPayback //平台返款服务费

              , speed: res.taskSpeed //提升完成任务速度

              , isExtendFee: res.taskIsExtendFee //是否平台加赏任务佣金
              , extendFee: res.taskExtendFee //加赏单任务佣金

              , isInterval: res.taskIsInterval //是否任务发布间隔
              , intervalTime: res.taskInterval //每隔多久发布
              , intervalCount: res.taskIntervalCount //间隔发布几个
              , interval: res.taskInterval//任务间隔发布费用

              , selectPV: 60 //选择流量
              , freePV: 0 //自定义流量
              , pv: 60 //实际使用流量

              , cycleTime: res.taskCycleTime //延长买家购物周期与费用(周期和费用一样)
              , totalCycle: res.taskTotalCycle //延长买家购物周期总共费用 totalCycle = cycleTime * totalCount

              , isGoodComment: false //是否优质好评
              , goodCommentCount: 3 //好评个数
              , goodCommentFee: 0 //好评费用
              , goodComment: [ //好评内容
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
              ]
            };
            $scope.item = {
              name: res.taskName //商品名称
              , url: res.taskUrl //商品链接
              , urlFlag: '' //商品链接是否正确
              , tag1: res.taskTag1 //规格1
              , tag2: res.taskTag2 //规格2
              , money: res.taskMoney //购买价格
              , count: res.taskCount //购买数量
              , searchMoney: res.taskSearchMoney//搜索价格
              , priceStart: res.taskPriceStart//搜索价格开始
              , priceEnd: res.taskPriceEnd//搜索价格结束
              , position: '全国'
              , totalCount: res.taskTotalCount //选择刷单数
              , freeTotalCount: 3 //自定义刷单数
              , pcCount: res.taskPcCount //电脑端刷单数
              , phoneCount: res.taskPhoneCount //移动端刷单数
              , tips: res.taskTips //下单提示
            };

            $scope.extendItem1 = {
              name: res.extend1Name
              , url: res.extend1Url
              , urlFlag: '' //商品链接是否正确
              , image: ''
              , imagefile: res.extend1Image
              , tag1: res.extend1Tag1
              , tag2: res.extend1Tag2
              , money: res.extend1Money
              , count: res.extend1Count
              , searchMoney: res.extend1SearchMoney
            };

            $scope.extendItem2 = {
              name: res.extend2Name
              , url: res.extend2Url
              , urlFlag: '' //商品链接是否正确
              , image: ''
              , imagefile: res.extend2Image
              , tag1: res.extend2Tag1
              , tag2: res.extend2Tag2
              , money: res.extend2Money
              , count: res.extend2Count
              , searchMoney: res.extend2SearchMoney
            };

            $scope.taobao = {
              searchBox: true
              , imagefile: res.taobaoImage
              , keywordsCount: res.taobaoKeywords
              , key1: res.taobaoKey1
              , key1Count: res.taobaoKeyCount1
              , key1extend1: ''
              , key1extend2: ''
              , key1extend3: ''
              , key1extend4: ''
              , key2: res.taobaoKey2
              , key2Count: res.taobaoKeyCount2
              , key2extend1: ''
              , key2extend2: ''
              , key2extend3: ''
              , key2extend4: ''
              , key3: res.taobaoKey3
              , key3Count: res.taobaoKeyCount3
              , key3extend1: ''
              , key3extend2: ''
              , key3extend3: ''
              , key3extend4: ''
              , key4: res.taobaoKey4
              , key4Count: res.taobaoKeyCount4
              , key4extend1: ''
              , key4extend2: ''
              , key4extend3: ''
              , key4extend4: ''
              , key5: res.taobaoKey5
              , key5Count: res.taobaoKeyCount5
              , key5extend1: ''
              , key5extend2: ''
              , key5extend3: ''
              , key5extend4: ''
            };

            $scope.tmall = {
              searchBox: false
              , keywordsCount: 1
              , key1: res.tmallKey1
              , key1Count: res.tmallKeyCount1
              , key1extend1: ''
              , key1extend2: ''
              , key1extend3: ''
              , key1extend4: ''
              , key2: res.tmallKey2
              , key2Count: res.tmallKeyCount2
              , key2extend1: ''
              , key2extend2: ''
              , key2extend3: ''
              , key2extend4: ''
              , key3: res.tmallKey3
              , key3Count: res.tmallKeyCount3
              , key3extend1: ''
              , key3extend2: ''
              , key3extend3: ''
              , key3extend4: ''
              , key4: res.tmallKey4
              , key4Count: res.tmallKeyCount4
              , key4extend1: ''
              , key4extend2: ''
              , key4extend3: ''
              , key4extend4: ''
              , key5: res.tmallKey5
              , key5Count: res.tmallKeyCount5
              , key5extend1: ''
              , key5extend2: ''
              , key5extend3: ''
              , key5extend4: ''
            };

          }
        })
    }

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

      if (!$scope.item.url || !$scope.item.urlFlag) {
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

      if (!$scope.zhitongche.name) {
        alert('请检查直通车创意商品名是否正确');
        return false;
      }

      if (!$scope.zhitongche.money || !($scope.zhitongche.money * 1)) {
        alert('请检查掌柜热卖区显示的商品价格是否正确');
        return false;
      }

      if (!$scope.zhitongche.imagefile1 && !$scope.zhitongche.imagefile2) {
        alert('请上传直通车商品创意图：必选至少需要上传一组图片');
        return false;
      }

      //检查淘宝搜索框
      if ($scope.taobao.searchBox) {
        if (!$scope.taobao.imagefile) {
          alert('请检查淘宝商品主图是否正确');
          return false;
        }

        if ($scope.taobao.keywordsCount > 0) {
          if (!$scope.taobao.key1 || $scope.taobao.key1.length > 10) {
            alert('淘宝商品关键字1，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.taobao.keywordsCount > 1) {
          if (!$scope.taobao.key2 || $scope.taobao.key2.length > 10) {
            alert('淘宝商品关键字2，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.taobao.keywordsCount > 2) {
          if (!$scope.taobao.key3 || $scope.taobao.key3.length > 10) {
            alert('淘宝商品关键字3，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.taobao.keywordsCount > 3) {
          if (!$scope.taobao.key4 || $scope.taobao.key4.length > 10) {
            alert('淘宝商品关键字4，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.taobao.keywordsCount > 4) {
          if (!$scope.taobao.key5 || $scope.taobao.key5.length > 10) {
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
          if (!$scope.tmall.key1 || $scope.tmall.key1.length > 10) {
            alert('天猫商品关键字1，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.tmall.keywordsCount > 1) {
          if (!$scope.tmall.key2 || $scope.tmall.key2.length > 10) {
            alert('天猫商品关键字2，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.tmall.keywordsCount > 2) {
          if (!$scope.tmall.key3 || $scope.tmall.key3.length > 10) {
            alert('天猫商品关键字3，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.tmall.keywordsCount > 3) {
          if (!$scope.tmall.key4 || $scope.tmall.key4.length > 10) {
            alert('天猫商品关键字4，不能为空且输入中文不能超过10个字');
            return false;
          }
        }

        if ($scope.tmall.keywordsCount > 4) {
          if (!$scope.tmall.key5 || $scope.tmall.key5.length > 10) {
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

      if ($scope.extendCount > 1) {

        if (!$scope.extendItem1.name) {
          alert('请检查商品2,名称是否正确');
          return false;
        }

        if (!$scope.extendItem1.url || !$scope.extendItem1.urlFlag) {
          alert('请检查商品2,链接是否正确');
          return false;
        }

        if (!$scope.extendItem1.money) {
          alert('请检查单品2,售价是否正确');
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
          alert('请检查商品3,名称是否正确');
          return false;
        }

        if (!$scope.extendItem2.url || !$scope.extendItem2.urlFlag) {
          alert('请检查商品3,链接是否正确');
          return false;
        }

        if (!$scope.extendItem2.money) {
          alert('请检查单品3,售价是否正确');
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

      var price = $scope.item.money * $scope.item.count;

      if ($scope.extendItem1.money) {
        price += $scope.extendItem1.money * $scope.extendItem1.count;
      }
      if ($scope.extendItem2.money) {
        price += $scope.extendItem2.money * $scope.extendItem2.count;
      }

      $scope.cost.totalMoney = price;

      $scope.cost.fee = cost(price);

      $scope.itemFlag = true;
    };

    $scope.transport = 'baoyou';

    $scope.confirmTransport = function(transport) {
      $scope.transportFlag = true;
      if (transport == 'baoyou') {
        $scope.cost.transport = 5;
      } else if (transport == 'bubaoyou') {
        $scope.cost.transport = 5;
        $scope.cost.promise = 10;
      } else if (transport == 'zixuan') {
        $scope.cost.transport = 2;
      }
    };
    //step2 end

    //step3 start
    //step3 end
  }]);
})();