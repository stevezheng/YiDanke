var ShopModel = thinkRequire('ShopModel');

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
            self.assign('shopId', shopId);
            self.assign('shopName', res.shopName);
            return self.display();
          });
      }

      if (self.isPost()) {}
    },
  };
});