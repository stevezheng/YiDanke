var Yi = require('yi-utils');
global.Yi = Yi;

//生成guid
global.guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

//文件大小
global.size_format = function(bytes) {
  var level = ["B", "KB", "MB", "GB", "TB", "PB"],
    pos = 0,
    size = parseFloat(bytes);
  while (size >= 1024) {
    size /= 1024;
    pos++;
  }
  return size.toFixed(2) + " " + level[pos];
};

//是否图片格式
global.isImg = function(str){
  var exts = ['jpg','jpeg','bmp','png','gif'],
    result = false;
  for (var i = exts.length - 1; i >= 0; i--) {
    if(str == exts[i]){
      result = true;
      break;
    }
  }
  return result;
};