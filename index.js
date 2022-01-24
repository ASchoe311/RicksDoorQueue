var http, director, bot, router, server, port;

var eta = require("eta")
var path = require("path")
var cron    = require('node-cron');
http        = require('http');
director    = require('director');
bot         = require('./bot.js');

router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: renderTable
  },
  '/manualqueue': {
    post: [bot.addToQueue, renderTable]
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

cron.schedule("0 5 * * SUN", () => {
  // bot.check();
  console.log("Clearing the queue!")
  bot.clearQueue();
});

cron.schedule("*/15 * * * *", () => {
  console.log("Staying alive!")
});

port = Number(process.env.PORT || 8080);
server.listen(port);

async function renderTable() {
  // Set Eta's configuration
  eta.configure({
    // This tells Eta to look for templates
    // In the /views directory
    views: path.join(__dirname, "views")
  })
  rendered = await eta.renderFile("./index", { queueDict: bot.queue })
  this.res.writeHead(200);
  this.res.end(rendered);
}