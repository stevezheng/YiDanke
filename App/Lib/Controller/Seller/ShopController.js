var ShopModel = thinkRequire('ShopModel');
var _ = require('underscore');

module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '绑定店铺');

      if (self.isGet()) {
        var shop = ShopModel();

        shop
          .all(self.cUser.id)
          .then(function(res) {
            var taobaoShops = _.where(res, {shopPlatform: 'taobao'});
            var tmallShops = _.where(res, {shopPlatform: 'tmall'});
            var jdShops = _.where(res, {shopPlatform: 'jd'});
            self.assign('statusMap', {
              '0': '待审核'
              , '1': '已通过'
              , '2': '已拒绝'
            });
            self.assign('taobaoShops', taobaoShops);
            self.assign('tmallShops', tmallShops);
            self.assign('jdShops', jdShops);
            self.display();
          });
      }

      if (self.isPost()) {}
    },
    
    getOneAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {
        var shop = ShopModel();
        var id = self.get('id');

        shop
          .getOne(self.cUser.id, id)
          .then(function(res) {
            self.success(res);
          })
          .catch(function (err) {
            self.error(500, err.message);
          })
      }
      
      if (self.isPost()) {}
    },

    addAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var shopName = self.post('shopName')
          , shopUrl = self.post('shopUrl')
          , shopProvince = self.post('shopProvince')
          , shopCity = self.post('shopCity')
          , shopArea = self.post('shopArea')
          , shopPlatform = self.post('shopPlatform');

        var shop = ShopModel();

        shop
          .addOne(self.cUser.id, shopName, shopUrl, shopProvince , shopCity, shopArea, shopPlatform)
          .then(function(res) {
            console.log(res);
            if (res.type == 'exist') {
              return self.error(500, '该店铺地址已存在');
            } else {
              return self.success('添加店铺成功');
            }
          })
          .catch(function(err) {
            var data = JSON.parse(err.json_message);
            return self.error(500, '添加店铺失败', data);
          })
      }
    },

    editAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {

        var shopName = self.post('shopName')
          , shopUrl = self.post('shopUrl')
          , shopProvince = self.post('shopProvince')
          , shopCity = self.post('shopCity')
          , shopArea = self.post('shopArea')
          , shopPlatform = self.post('shopPlatform')
          , id = self.post('id');

        var shop = ShopModel();

        shop
          .editOne(self.cUser.id, id, shopName, shopUrl, shopProvince , shopCity, shopArea, shopPlatform)
          .then(function(res) {
            return self.success('编辑店铺成功');
          })
          .catch(function(err) {
            var data = JSON.parse(err.json_message);
            return self.error(500, '编辑店铺失败', data);
          })
      }
    },
  };
});