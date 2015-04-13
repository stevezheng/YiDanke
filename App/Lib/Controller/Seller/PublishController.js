var shopModel = thinkRequire('ShopModel');
module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '发布任务');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {

      }
    },
    
    getShopsAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {
        var shop = shopModel();
        return shop
          .getOwnPass(self.cUser.id)
          .then(function(shops) {
            self.success(shops);
          })
          .catch(function(err) {
            self.success(500, '获取失败', err);
          })
      }

      if (self.isPost()) {}
    },
  };
});