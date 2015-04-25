var moment = require('moment');
var _ = require('underscore');
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '买号管理');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page')
          , data = self.post('data') || {};

        var data = _.mapObject(data, function(val, key) {
          return ['like', '%' + val + '%'];
        });

        if (data.username) {
          data['yi_user.username'] = data.username;
          delete data.username;
        }

        if (data.id) {
          data['yi_account.id'] = data.id;
          delete data.id;
        }

        return D('account')
          .field(['yi_account.*', 'yi_user.username'])
          .join({
            table: 'user'
            , join: 'left'
            , on: {
              'accountUserId': 'id'
            }
          })
          .order('id desc')
          .page(page, 20)
          .where(data)
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
        return D('account')
          .where({id: id})
          .update({accountStatus: 1})
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
        return D('account')
          .where({id: id})
          .update({accountStatus: -1})
          .then(function() {
            return self.success('拒绝通过成功');
          })
          .catch(function(err) {
            return self.error(500, '拒绝通过失败', err);
          })
      }
    },
  };
});