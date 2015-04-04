/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      this.display();
    },

    regAction: function(){
      this.display();
    },
    
    checkAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {

      }
      
      if (self.isPost()) {
        return self.success();
      }
    },
  };
});