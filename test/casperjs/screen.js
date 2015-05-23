var links = [];
var casper = require('casper').create();

function getLinks() {
  var links = document.querySelectorAll('h3.r a');
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href')
  });
}

casper.start('https://www.baidu.com/', function() {
  // search for 'casperjs' from google form
  // 在Google搜索表单里提交 casperjs
  this.fill('form[action="/s"]', { wd: 'casperjs' }, true);
});

casper.then(function() {
  // aggregate results for the 'casperjs' search
  // 搜索casperjs的返回结果
  links = this.evaluate(getLinks);
  // now search for 'phantomjs' by filling the form again
  // 现在再搜索phantomjs
  this.fill('form[action="/s"]', { wd: 'phantomjs' }, true);
});

casper.then(function() {
  // aggregate results for the 'phantomjs' search
  // 现在得到搜索phantomjs的结果
  links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
  // echo results in some pretty fashion
  // 把输出搞的稍微好看点
  this.echo(links.length + ' links found:');
  this.echo(' - ' + links.join('\n - ')).exit();
});