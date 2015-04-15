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
          , jd = self.post('jd')
          , cost = self.post('cost')
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
          , taskPlatform: 'jd'
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
        var taskJd = D('task_jd');


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
            var _taskJd = {
              jdTaskId: taskId
              , jdKeywordsCount: jd.keywordsCount
              , jdImage: jd.imagefile
              , jdKey1: jd.key1
              , jdKeyCount1: jd.key1Count
              , jdKey1Extend1: jd.key1extend1
              , jdKey1Extend2: jd.key1extend2
              , jdKey1Extend3: jd.key1extend3
              , jdKey1Extend4: jd.key1extend4

              , jdKey2: jd.key2
              , jdKeyCount2: jd.key2Count
              , jdKey2Extend1: jd.key2extend1
              , jdKey2Extend2: jd.key2extend2
              , jdKey2Extend3: jd.key2extend3
              , jdKey2Extend4: jd.key2extend4

              , jdKey3: jd.key3
              , jdKeyCount3: jd.key3Count
              , jdKey3Extend1: jd.key3extend1
              , jdKey3Extend2: jd.key3extend2
              , jdKey3Extend3: jd.key3extend3
              , jdKey3Extend4: jd.key3extend4

              , jdKey4: jd.key4
              , jdKeyCount4: jd.key4Count
              , jdKey4Extend1: jd.key4extend1
              , jdKey4Extend2: jd.key4extend2
              , jdKey4Extend3: jd.key4extend3
              , jdKey4Extend4: jd.key4extend4

              , jdKey5: jd.key5
              , jdKeyCount5: jd.key5Count
              , jdKey5Extend1: jd.key5extend1
              , jdKey5Extend2: jd.key5extend2
              , jdKey5Extend3: jd.key5extend3
              , jdKey5Extend4: jd.key5extend4
            };

            return taskJd
              .add(_taskJd)
          })
          .then(function() {
            self.success(taskId);
          })
          .catch(function(err) {
            console.error(err.stack);
          })
      }
    },
  };
});