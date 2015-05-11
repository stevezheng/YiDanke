var ShopModel = thinkRequire('ShopModel');
var TaskModel = thinkRequire('TaskModel');
var UserModel = thinkRequire('UserModel');
var Log= thinkRequire('LogService');
var run = thinkRequire('CrazyClickService').run;

module.exports = Controller("Publish/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '支付');

      if (self.isGet()) {
      }

      if (self.isPost()) {
        var taskId = self.post('taskId')
          , payPV = self.post('payPV') || 0
          , payCoin = self.post('payCoin') || 0
          , payMoney = self.post('payMoney') || 0;

        var user = UserModel();
        var task = TaskModel();

        return user
          .getOne(self.cUser.id)
          .then(function(res) {
            if (payCoin > res.coin) {
              return self.error(500, '金币不足，无法支付');
            }

            if (payMoney > res.money) {
              return self.error(500, '金币不足，无法支付');
            }

            if (payPV > res.pv) {
              return self.error(500, '流量不足，无法支付');
            }

            if (payCoin > 0) {
              return user
                .subCoin(self.cUser.id, payCoin)
            }
          })
          .then(function() {
            if (payMoney > 0) {
              return user
                .subMoney(self.cUser.id, payMoney)
            }
          })
          .then(function() {
            if (payPV > 0) {
              return user
                .subPV(self.cUser.id, payPV)
            }
          })
          .then(function() {
            return task
              .pay(self.cUser.id, taskId)
          })
          .then(function() {
            return task
              .getOwnOne(self.cUser.id, taskId)
          })
          .then(function(res) {
            var shopPlatform = res.taskPlatform;
            if (shopPlatform == 'taobao' || shopPlatform == 'tmall') {
              run(shopPlatform, res, function(_res) {
                D('crazyclick_log')
                  .add({
                    userId: self.cUser.id
                    , username: self.cUser.username
                    , taskId: taskId
                    , kwd: _res.kwd
                    , nid: _res.nid
                    , appkey: _res.appkey
                    , platform: _res.platform
                    , shop_type: _res.shop_type
                    , times: _res.times
                    , sleep_time: _res.sleep_time
                    , click_start_input: _res.click_start_input
                    , click_end_input: _res.click_end_input
                    , status: _res.status
                    , begin_time: _res.begin_time
                    , end_time: _res.end_time
                    , created_at: _res.created_at
                    , updated_at: _res.updated_at
                    , click_start: _res.click_start
                    , click_end: _res.click_end
                    , click_interval: _res.click_interval
                    , rid: _res.id
                  })
              });
            }

            var p1 = Log.coin(
              -1
              , payCoin
              , (self.cUser.coin - payCoin)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '发布任务['+taskId+']支付' + payCoin + '金币'
            );

            var p2 = Log.money(
              -1
              , payMoney
              , (self.cUser.money - payMoney)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '发布任务['+taskId+']支付' + payMoney + '元'
            );

            var p3 = Log.pv(
              -1
              , payPV
              , self.cUser.pv - payPV
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '发布任务['+taskId+']消耗流量' + payPV + '个'
            );

            return Promise.all([p1, p2, p3])
          })
          .then(function() {
            return self.success('支付成功');
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.error(500, '支付失败');
          })
      }
    },
  };
});