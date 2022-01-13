var http, director, bot, router, server, port, cron;

cron        = require('node-cron');
http        = require('http');
director    = require('director');
bot         = require('./bot.js');

router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });
  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

var cronJob = cron.job("*/1 * * * *", function() {
  bot.clearQueue()
  console.log("Cleared the queue!")
});


// "0 0 * * SUN"
port = Number(process.env.PORT || 8080);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm the Queue Guy.");
}