var restify = require('restify'),
    members = require('./members'),
    port = process.env.PORT || 8080;

var server = restify.createServer({
  name: 'Backend developer test'
});

server.use(function(req, res, next){
  console.log(req.method + ' ' + req.url);
  return next();
});

server.use(restify.bodyParser());

server.get('api/members', members.get); // for debug
server.post('api/members/register', members.register);
server.post('api/members/login', members.login);


server.listen(port, function(){
  console.log('API runing at ' + port);
});
