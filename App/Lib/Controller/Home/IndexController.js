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
    }
  };
});