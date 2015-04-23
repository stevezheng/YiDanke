var UserModel = thinkRequire('UserModel');
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
        return self.display();
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

              var newExprie = moment(exprie).add(parseInt(time), 'M').format('YYYY-MM-DD HH:mm:ss');

              return user.updateMember(self.cUser.id, coin, newExprie)
            }
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