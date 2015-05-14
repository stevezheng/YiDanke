var casper = require('casper').create();

casper.start('http://localhost:8210', function() {
  this.echo(this.getTitle());
});

casper.thenOpen('http://localhost:8210/admin', function() {
  this.echo(this.getTitle());
});

casper.run();