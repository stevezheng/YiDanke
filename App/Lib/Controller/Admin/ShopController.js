var moment = require('moment');
var _ = require('underscore');
var shop = thinkRequire('ShopModel')();
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '店铺管理');

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
          data['yi_shop.id'] = data.id;
          delete data.id;
        }

        return D('shop')
          .field(['yi_shop.*', 'yi_user.username'])
          .join({
            table: 'user'
            , join: 'left'
            , on: {
              'shopUserId': 'id'
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

    editAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('id');
        var shopUrl = self.post('shopUrl');
        var shopName =  self.post('shopName');
        var shopProvince= self.post('shopProvince');
        var shopCity= self.post('shopCity');
        var shopArea= self.post('shopArea');
        var shopAddress= self.post('shopAddress');
        var shopExpressNumber= self.post('shopExpressNumber');

        return shop
          .adminEditShop(id, shopName, shopUrl, shopProvince, shopCity, shopArea, shopAddress, shopExpressNumber)
          .then(function() {
            return self.success('修改成功');
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.error(err);
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
        return D('shop')
          .where({id: id})
          .update({shopStatus: 1})
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
        return D('shop')
          .where({id: id})
          .update({shopStatus: -1})
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