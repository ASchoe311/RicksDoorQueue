var http, director, bot, router, server, port;

var cron    = require('node-cron');
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

// bot.addfakes()

cron.schedule("0 0 * * SUN", () => {
  // bot.check();
  console.log("Clearing the queue!")
  bot.clearQueue();
});

cron.schedule("*/5 * * * *", () => {
  console.log("Staying alive!")
});

port = Number(process.env.PORT || 8080);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm the Queue Guy.");
}