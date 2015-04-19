var moment = require('moment');
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    inAction: function() {
      var self = this;
      self.assign('title', '充值');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page');

        return D('money')
          .field(['yi_money.*', 'yi_user.username'])
          .join({
            table: 'user'
            , join: 'left'
            , on: {
              'moneyUserId': 'id'
            }
          })
          .order('id desc')
          .page(page, 20)
          .countSelect()
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    outAction: function() {
      var self = this;
      self.assign('title', '提现');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page');

        return D('user')
          .order('id desc')
          .page(page, 20)
          .where({type: 1})
          .countSelect()
          .then(function(res) {
            return self.success(res);
          })
      }
    },
  };
});