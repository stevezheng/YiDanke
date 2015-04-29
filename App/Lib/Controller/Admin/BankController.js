var moment = require('moment');
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '提现账号');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page');

        return D('bank')
          .field(['yi_bank.*', 'yi_user.username', 'yi_user.type'])
          .join({
            table: 'user'
            , join: 'left'
            , on: {
              'bankUserId': 'id'
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
    passAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('id');
        return D('bank')
          .where({id: id})
          .update({bankStatus: 1})
          .then(function() {
            return self.success('通过审核成功');
          })
          .catch(function(err) {
            return self.error(500, '通过审核失败', err);
          })
      }
    },

    unpassAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('id');
        return D('bank')
          .where({id: id})
          .update({bankStatus: -1})
          .then(function() {
            return self.success('拒绝通过成功');
          })
          .catch(function(err) {
            return self.error(500, '拒绝通过失败', err);
          })
      }
    }
  };
});