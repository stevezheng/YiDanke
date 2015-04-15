var ShopModel = thinkRequire('ShopModel');
var TaskModel = thinkRequire('TaskModel');

module.exports = Controller("Publish/BaseController", function(){
  "use strict";
  return {
    //普通订单
    indexAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        var shop = ShopModel();
        var shopId = self.get('shopId');

        shop
          .getOne(self.cUser.id, shopId)
          .then(function(res) {
            if (isEmpty(res)) {
              self.assign('warning', '请检查该店铺是否属于您');
              return self.display('Home:index:warning')
            }
            self.assign('shopId', shopId);
            self.assign('shopName', res.shopName);
            return self.display();
          });
      }

      if (self.isPost()) {
        var item = self.post('item')
          , user = self.post('user')
          , taobao = self.post('taobao')
          , cost = self.post('cost')
          , tmall = self.post('tmall')
          , extendItem1 = self.post('extendItem1')
          , extendItem2 = self.post('extendItem2')
          , transport = self.post('transport');

        //todo:这里需要重新计算一下费用
        var task = TaskModel();

        var _task = {
          taskStatus: 0
          , taskUserId: self.cUser.id
          , taskShopName: user.shopName
          , taskShopId: user.shopId
          , taskPV: cost.pv
          , taskPlatform: 'taobao'
          , taskType: 'dingdan'
          , taskHeight: item.height
          , taskName: item.name
          , taskUrl: item.url
          , taskMoney: item.money
          , taskCount: item.count
          , taskAllCoin: cost.allCoin
          , taskAllMoney: cost.allMoney
          , taskSearchMoney: item.searchMoney || 0
          , taskPriceStart: item.priceStart || 0
          , taskPriceEnd: item.priceEnd || 0
          , taskTotalCount: cost.totalCount || 0
          , taskTotalMoney: cost.totalMoney || 0
          , taskPromise: cost.promise
          , taskTotalPromise: cost.totalPromise
          , taskFee: cost.fee
          , taskTotalFee: cost.totalFee
          , taskTransportFee: cost.transport
          , taskPhone: cost.phone
          , taskIsPayback: cost.isPayback
          , taskPayback: cost.payback
          , taskSpeed: cost.speed
          , taskIsExtendFee: cost.isExtendFee
          , taskExtendFee: cost.extendFee
          , taskIsInterval: cost.isInterval
          , taskIntervalTime: cost.intervalTime
          , taskIntervalCount: cost.intervalCount
          , taskInterval: cost.interval
          , taskCycleTime: cost.cycleTime
          , taskTotalCycle: cost.totalCycle
          , taskGoodIsComment: cost.isGoodComment
          , taskGoodCommentCount: cost.goodCommentCount
          , taskGoodCommentFee: cost.goodCommentFee
          , taskGoodComment: cost.goodComment
          , taskTransport: transport
          , taskTips: item.tips
          , taskPosition: item.position
          , taskTag1: item.tag1
          , taskTag2: item.tag2
        };

        var taskExtend = D('task_extend');
        var taskTaobao = D('task_taobao');
        var taskTmall = D('task_tmall');


        var taskId = 0;

        return task
          .add(_task)
          .then(function(insertId) {
            taskId = insertId;
            var _taskExtend = {
              extendTaskId: taskId
              , extend1Name: extendItem1.name
              , extend1Url: extendItem1.url
              , extend1Image: extendItem1.imagefile
              , extend1Money: extendItem1.money || 0
              , extend1Count: extendItem1.count || 0
              , extend1SearchMoney: extendItem1.searchMoney || 0
              , extend1Tag1: extendItem1.tag1
              , extend1Tag2: extendItem1.tag2

              , extend2Name: extendItem2.name
              , extend2Url: extendItem2.url
              , extend2Image: extendItem2.imagefile
              , extend2Money: extendItem2.money || 0
              , extend2Count: extendItem2.count || 0
              , extend2SearchMoney: extendItem2.searchMoney || 0
              , extend2Tag1: extendItem2.tag1
              , extend2Tag2: extendItem2.tag2
            };
            return taskExtend
              .add(_taskExtend)
          })
          .then(function() {
            var _taskTaobao = {
              taobaoTaskId: taskId
              , taobaoKeywordsCount: taobao.keywordsCount
              , taobaoImage: taobao.imagefile
              , taobaoKey1: taobao.key1
              , taobaoKeyCount1: taobao.key1Count
              , taobaoKey1Extend1: taobao.key1extend1
              , taobaoKey1Extend2: taobao.key1extend2
              , taobaoKey1Extend3: taobao.key1extend3
              , taobaoKey1Extend4: taobao.key1extend4

              , taobaoKey2: taobao.key2
              , taobaoKeyCount2: taobao.key2Count
              , taobaoKey2Extend1: taobao.key2extend1
              , taobaoKey2Extend2: taobao.key2extend2
              , taobaoKey2Extend3: taobao.key2extend3
              , taobaoKey2Extend4: taobao.key2extend4

              , taobaoKey3: taobao.key3
              , taobaoKeyCount3: taobao.key3Count
              , taobaoKey3Extend1: taobao.key3extend1
              , taobaoKey3Extend2: taobao.key3extend2
              , taobaoKey3Extend3: taobao.key3extend3
              , taobaoKey3Extend4: taobao.key3extend4

              , taobaoKey4: taobao.key4
              , taobaoKeyCount4: taobao.key4Count
              , taobaoKey4Extend1: taobao.key4extend1
              , taobaoKey4Extend2: taobao.key4extend2
              , taobaoKey4Extend3: taobao.key4extend3
              , taobaoKey4Extend4: taobao.key4extend4

              , taobaoKey5: taobao.key5
              , taobaoKeyCount5: taobao.key5Count
              , taobaoKey5Extend1: taobao.key5extend1
              , taobaoKey5Extend2: taobao.key5extend2
              , taobaoKey5Extend3: taobao.key5extend3
              , taobaoKey5Extend4: taobao.key5extend4
            };

            return taskTaobao
              .add(_taskTaobao)
          })
          .then(function() {
            var _taskTmall = {
              tmallTaskId: taskId
              , tmallKeywordsCount: tmall.keywordsCount
              , tmallImage: tmall.imagefile
              , tmallKey1: tmall.key1
              , tmallKeyCount1: tmall.key1Count
              , tmallKey1Extend1: tmall.key1extend1
              , tmallKey1Extend2: tmall.key1extend2
              , tmallKey1Extend3: tmall.key1extend3
              , tmallKey1Extend4: tmall.key1extend4

              , tmallKey2: tmall.key2
              , tmallKeyCount2: tmall.key2Count
              , tmallKey2Extend1: tmall.key2extend1
              , tmallKey2Extend2: tmall.key2extend2
              , tmallKey2Extend3: tmall.key2extend3
              , tmallKey2Extend4: tmall.key2extend4

              , tmallKey3: tmall.key3
              , tmallKeyCount3: tmall.key3Count
              , tmallKey3Extend1: tmall.key3extend1
              , tmallKey3Extend2: tmall.key3extend2
              , tmallKey3Extend3: tmall.key3extend3
              , tmallKey3Extend4: tmall.key3extend4

              , tmallKey4: tmall.key4
              , tmallKeyCount4: tmall.key4Count
              , tmallKey4Extend1: tmall.key4extend1
              , tmallKey4Extend2: tmall.key4extend2
              , tmallKey4Extend3: tmall.key4extend3
              , tmallKey4Extend4: tmall.key4extend4

              , tmallKey5: tmall.key5
              , tmallKeyCount5: tmall.key5Count
              , tmallKey5Extend1: tmall.key5extend1
              , tmallKey5Extend2: tmall.key5extend2
              , tmallKey5Extend3: tmall.key5extend3
              , tmallKey5Extend4: tmall.key5extend4
            };

            return taskTmall
              .add(_taskTmall)
          })
          .then(function() {
            self.success(taskId);
          });
      }
    },


    zhitongcheAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        var shop = ShopModel();
        var shopId = self.get('shopId');

        shop
          .getOne(self.cUser.id, shopId)
          .then(function(res) {
            if (isEmpty(res)) {
              self.assign('warning', '请检查该店铺是否属于您');
              return self.display('Home:index:warning')
            }
            self.assign('shopId', shopId);
            self.assign('shopName', res.shopName);
            return self.display();
          });
      }

      if (self.isPost()) {
        var item = self.post('item')
          , user = self.post('user')
          , taobao = self.post('taobao')
          , cost = self.post('cost')
          , tmall = self.post('tmall')
          , zhitongche = self.post('zhitongche')
          , extendItem1 = self.post('extendItem1')
          , extendItem2 = self.post('extendItem2')
          , transport = self.post('transport');

        //todo:这里需要重新计算一下费用
        var task = TaskModel();

        var _task = {
          taskStatus: 0
          , taskUserId: self.cUser.id
          , taskShopName: user.shopName
          , taskShopId: user.shopId
          , taskPV: cost.pv
          , taskPlatform: 'taobao'
          , taskType: 'zhitongche'
          , taskHeight: item.height
          , taskName: item.name
          , taskUrl: item.url
          , taskMoney: item.money
          , taskCount: item.count
          , taskAllCoin: cost.allCoin
          , taskAllMoney: cost.allMoney
          , taskSearchMoney: item.searchMoney || 0
          , taskPriceStart: item.priceStart || 0
          , taskPriceEnd: item.priceEnd || 0
          , taskTotalCount: cost.totalCount || 0
          , taskTotalMoney: cost.totalMoney || 0
          , taskPromise: cost.promise
          , taskTotalPromise: cost.totalPromise
          , taskFee: cost.fee
          , taskTotalFee: cost.totalFee
          , taskTransportFee: cost.transport
          , taskPhone: cost.phone
          , taskIsPayback: cost.isPayback
          , taskPayback: cost.payback
          , taskSpeed: cost.speed
          , taskIsExtendFee: cost.isExtendFee
          , taskExtendFee: cost.extendFee
          , taskIsInterval: cost.isInterval
          , taskIntervalTime: cost.intervalTime
          , taskIntervalCount: cost.intervalCount
          , taskInterval: cost.interval
          , taskCycleTime: cost.cycleTime
          , taskTotalCycle: cost.totalCycle
          , taskGoodIsComment: cost.isGoodComment
          , taskGoodCommentCount: cost.goodCommentCount
          , taskGoodCommentFee: cost.goodCommentFee
          , taskGoodComment: cost.goodComment
          , taskTransport: transport
          , taskTips: item.tips
          , taskPosition: item.position
          , taskTag1: item.tag1
          , taskTag2: item.tag2
        };

        var taskExtend = D('task_extend');
        var taskTaobao = D('task_taobao');
        var taskTmall = D('task_tmall');
        var taskZhitongche = D('task_zhitongche');


        var taskId = 0;

        return task
          .add(_task)
          .then(function(insertId) {
            taskId = insertId;
            var _taskExtend = {
              extendTaskId: taskId
              , extend1Name: extendItem1.name
              , extend1Url: extendItem1.url
              , extend1Image: extendItem1.imagefile
              , extend1Money: extendItem1.money || 0
              , extend1Count: extendItem1.count || 0
              , extend1SearchMoney: extendItem1.searchMoney || 0
              , extend1Tag1: extendItem1.tag1
              , extend1Tag2: extendItem1.tag2

              , extend2Name: extendItem2.name
              , extend2Url: extendItem2.url
              , extend2Image: extendItem2.imagefile
              , extend2Money: extendItem2.money || 0
              , extend2Count: extendItem2.count || 0
              , extend2SearchMoney: extendItem2.searchMoney || 0
              , extend2Tag1: extendItem2.tag1
              , extend2Tag2: extendItem2.tag2
            };
            return taskExtend
              .add(_taskExtend)
          })
          .then(function() {
            var _taskTaobao = {
              taobaoTaskId: taskId
              , taobaoKeywordsCount: taobao.keywordsCount
              , taobaoImage: taobao.imagefile
              , taobaoKey1: taobao.key1
              , taobaoKeyCount1: taobao.key1Count
              , taobaoKey1Extend1: taobao.key1extend1
              , taobaoKey1Extend2: taobao.key1extend2
              , taobaoKey1Extend3: taobao.key1extend3
              , taobaoKey1Extend4: taobao.key1extend4

              , taobaoKey2: taobao.key2
              , taobaoKeyCount2: taobao.key2Count
              , taobaoKey2Extend1: taobao.key2extend1
              , taobaoKey2Extend2: taobao.key2extend2
              , taobaoKey2Extend3: taobao.key2extend3
              , taobaoKey2Extend4: taobao.key2extend4

              , taobaoKey3: taobao.key3
              , taobaoKeyCount3: taobao.key3Count
              , taobaoKey3Extend1: taobao.key3extend1
              , taobaoKey3Extend2: taobao.key3extend2
              , taobaoKey3Extend3: taobao.key3extend3
              , taobaoKey3Extend4: taobao.key3extend4

              , taobaoKey4: taobao.key4
              , taobaoKeyCount4: taobao.key4Count
              , taobaoKey4Extend1: taobao.key4extend1
              , taobaoKey4Extend2: taobao.key4extend2
              , taobaoKey4Extend3: taobao.key4extend3
              , taobaoKey4Extend4: taobao.key4extend4

              , taobaoKey5: taobao.key5
              , taobaoKeyCount5: taobao.key5Count
              , taobaoKey5Extend1: taobao.key5extend1
              , taobaoKey5Extend2: taobao.key5extend2
              , taobaoKey5Extend3: taobao.key5extend3
              , taobaoKey5Extend4: taobao.key5extend4
            };

            return taskTaobao
              .add(_taskTaobao)
          })
          .then(function() {
            var _taskTmall = {
              tmallTaskId: taskId
              , tmallKeywordsCount: tmall.keywordsCount
              , tmallImage: tmall.imagefile
              , tmallKey1: tmall.key1
              , tmallKeyCount1: tmall.key1Count
              , tmallKey1Extend1: tmall.key1extend1
              , tmallKey1Extend2: tmall.key1extend2
              , tmallKey1Extend3: tmall.key1extend3
              , tmallKey1Extend4: tmall.key1extend4

              , tmallKey2: tmall.key2
              , tmallKeyCount2: tmall.key2Count
              , tmallKey2Extend1: tmall.key2extend1
              , tmallKey2Extend2: tmall.key2extend2
              , tmallKey2Extend3: tmall.key2extend3
              , tmallKey2Extend4: tmall.key2extend4

              , tmallKey3: tmall.key3
              , tmallKeyCount3: tmall.key3Count
              , tmallKey3Extend1: tmall.key3extend1
              , tmallKey3Extend2: tmall.key3extend2
              , tmallKey3Extend3: tmall.key3extend3
              , tmallKey3Extend4: tmall.key3extend4

              , tmallKey4: tmall.key4
              , tmallKeyCount4: tmall.key4Count
              , tmallKey4Extend1: tmall.key4extend1
              , tmallKey4Extend2: tmall.key4extend2
              , tmallKey4Extend3: tmall.key4extend3
              , tmallKey4Extend4: tmall.key4extend4

              , tmallKey5: tmall.key5
              , tmallKeyCount5: tmall.key5Count
              , tmallKey5Extend1: tmall.key5extend1
              , tmallKey5Extend2: tmall.key5extend2
              , tmallKey5Extend3: tmall.key5extend3
              , tmallKey5Extend4: tmall.key5extend4
            };

            return taskTmall
              .add(_taskTmall)
          })
          .then(function() {
            var _taskZhitongche = {
              zhitongcheTaskId: taskId
              , zhitongcheName: zhitongche.name
              , zhitongcheMoney: zhitongche.money
              , zhitongcheImagefile1: zhitongche.imagefile1
              , zhitongcheImagefile2: zhitongche.imagefile2
            };

            return taskZhitongche
              .add(_taskZhitongche)
          })
          .then(function() {
            self.success(taskId);
          });
      }
    }
  };
});