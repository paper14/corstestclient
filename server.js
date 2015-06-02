var koa = require('koa.io');
var locals = require('koa-locals');
var router = require('koa-router')();
var serve = require('koa-static');
var swig = require('koa-swig');
var path = require('path');
var serve = require('koa-static');
var session = require('koa-session');
var request = require('koa-request');

var app = koa();

app.keys = ['secretssssssss'];
app.use(session(app));

// Get Session in 'http://localhost:3111/'
app.use(function * (next) {
  var options = {
    url: 'http://localhost:3111',
    headers: {
      'User-Agent': 'request'
    },
    method: 'GET'
  }
  var response = yield request(options);

  var sessionNameVal = response.caseless.dict.name;
  console.log(sessionNameVal);
  this.session.name = {
    'name': sessionNameVal
  }
  yield * next;
});

// Page Router
router
  .get('/', function * () {
    yield * this.render('index.html');
  });

// Join the 'templates folder'
app.use(function * (next) {
  var loc = this.session.name;
  this.render = swig({
    root: path.join(__dirname, 'templates'),
    autoescape: true,
    cache: false,
    ext: 'html',
    locals: loc
  });
  yield * next;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(serve(__dirname + '/js'));

var port = Number(process.env.PORT || 3001);

app.listen(port);
console.log('Listening to Client: 3001');