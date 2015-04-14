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

      if (self.isPost()) {
        var item = self.post('item')
          , taobao = self.post('taobao')
          , cost = self.post('cost')
          , tmall = self.post('tmall')
          , extendItem1 = self.post('extendItem1')
          , extendItem2 = self.post('extendItem2')
          , transport = self.post('transport');

        //todo:这里需要重新计算一下费用

        self.success({
          cost: cost,
          item: item,
          taobao:taobao,
          tmall: tmall,
          extendItem1: extendItem1,
          extendItem2: extendItem2,
          transport: transport});
      }
    },
  };
});