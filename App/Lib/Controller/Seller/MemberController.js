var UserModel = thinkRequire('UserModel');
var Log= thinkRequire('LogService');
var moment = require('moment');

module.exports = Controller('Seller/BaseController', function() {
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var statusMap = {
          status: {
            0: '禁用'
            , 1: '游客'
            , 2: 'VIP会员'
          }
        };
        var _vipExprie = self.cUser.vipExprie;
        var vipExprie = moment().diff(_vipExprie, 'days');
        if (vipExprie < 0) {
          self.assign('vipExprie', '剩余' + Math.abs(vipExprie).toString() + '天');
        } else {
          self.assign('vipExprie', '已超期');
        }
        self.assign('statusMap', statusMap);

        var user = UserModel();
        user.reloadCurrentUser(self)
          .then(function () {
            self.display();
          })
      }

      if (self.isPost()) {
        var time = self.post('time');
        var map = {
          '3': 600
          , '6': 1200
          , '12': 2400
          , '24': 4320
          , '48': 7680
        };

        var user = UserModel();
        var coin = map[time];
        var newExprie;

        return user
          .getUser(self.cUser.id)
          .then(function(res) {
            if (res.coin < coin) {
              return self.error(500, '用户金币不足，请先充值');
            } else {
              var exprie;
              var _vipExprie = self.cUser.vipExprie;
              var vipExprie = moment().diff(_vipExprie, 'days');
              if (vipExprie < 0) {
                //尚未到期
                exprie = _vipExprie;
              } else {
                //已经到期
                exprie = moment();
              }

              newExprie = moment(exprie).add(parseInt(time), 'M').format('YYYY-MM-DD HH:mm:ss');

              return user.updateMember(self.cUser.id, coin, newExprie)
            }
          })
          .then(function() {
            var p1 = Log.coin(
              -1
              , coin
              , (self.cUser.coin - coin)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '充值会员扣除金币' + coin + '金币'
            );

            var p2 = Log.member(
              1
              , coin
              , ''
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , 'VIP会员开通会员' + time + '个月,有效期至' + newExprie
            );

            return Promise.all([p1, p2]);
          })
          .then(function() {
            return self.success('升级成功');
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.error(err);
          })
      }
    },
  }
});