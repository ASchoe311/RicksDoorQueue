var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

var sunday = []
var monday = []
var tuesday = []
var wednesday = []
var thursday = []
var friday = []
var saturday = []

function respond() {
  var request = JSON.parse(this.req.chunks[0])
  var responseText = ""
  if (request.text) {
    var msgArr = request.text.toLowerCase().split(" ")
    if(msgArr[0] == "/queue"){
      let sender = request.name
      responseText.concat(sender)
      responseText.concat(" placed in the queue for")
      for(let i=1;i < msgArr.length;i++){
        if(i > 1) responseText.concat(",")
        if(i == msgArr.length - 1) responseText.concat(" and")
        switch (msgArr[i]) {
          case "sunday":
            responseText.concat(" Sunday at position ")
            sunday.push(sender)
            responseText.concat(sunday.length)
            break;
          case "monday":
            responseText.concat(" Monday at position ")
            monday.push(sender)
            responseText.concat(monday.length)
            break;
          case "tuesday":
            responseText.concat(" Tuesday at position ")
            tuesday.push(sender)
            responseText.concat(tuesday.length)
            break;
          case "wednesday":
            responseText.concat(" Wednesday at position ")
            wednesday.push(sender)
            responseText.concat(wednesday.length)
            break;
          case "thursday":
            responseText.concat(" Thursday at position ")
            thursday.push(sender)
            responseText.concat(thursday.length)
            break;
          case "friday":
            responseText.concat(" Friday at position ")
            friday.push(sender)
            responseText.concat(friday.length)
            break;
          case "saturday":
            responseText.concat(" Friday at position ")
            friday.push(sender)
            responseText.concat(friday.length)
            break;
          default:
            break;
        }
      }
      console.log("Sending response")
      this.res.writeHead(200);
      postMessage(responseText);
      this.res.end();
    }
    else{
      console.log("Nothing to do");
      this.res.writeHead(200);
      this.res.end();
    }
  }
}


function postMessage(msg) {
  var botResponse, options, body, botReq;

  botResponse = msg;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;