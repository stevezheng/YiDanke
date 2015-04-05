module.exports = Controller(function(){
  'use strict';
  return {
    init: function(http){
      this.super("init", http);
      console.log(http.pathname);
    }
  }
});