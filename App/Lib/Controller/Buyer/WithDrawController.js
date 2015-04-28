/**
 * controller
 * @return 
 */
module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '提现管理');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {
        return D('bank')
          .where({bankUserId: self.cUser.id})
          .select()
          .then(function(res) {
            return self.success(res);
          })
      }
    },
  };
});