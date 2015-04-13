module.exports = Controller("Publish/BaseController", function(){
  "use strict";
  return {
    //普通订单
    indexAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        var shopId = self.get('shopId');
        self.assign('shopId', shopId);

        return self.display();
      }

      if (self.isPost()) {}
    },
  };
});