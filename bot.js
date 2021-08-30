var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = "3964152c789e251f4a7d5c864b";

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
    if(msgArr[0] == "/queuecheck"){
      if(msgArr.length == 1){
        responseText = "Must input a specific day of the week to check the queue"
        this.res.writeHead(200);
        postMessage(responseText);
        this.res.end();
      }
      else{
        switch (msgArr[i]) {
          case "sunday":
            responseText += "Queue to have Sunday taken:\n"
            for(var i = 0; i < sunday.length; i++){
              responseText += "Position "
              responseText += (i + 1)
              responseText += " is "
              responseText += sunday[i]
              responseText += "\n"
            }
            break;
          case "monday":
            responseText += "Queue to have Monday taken:\n"
            for(var i = 0; i < monday.length; i++){
              responseText += "Position "
              responseText += (i + 1)
              responseText += " is "
              responseText += monday[i]
              responseText += "\n"
            }
            break;
          case "tuesday":
            responseText += "Queue to have Tuesday taken:\n"
            for(var i = 0; i < tuesday.length; i++){
              responseText += "Position "
              responseText += (i + 1)
              responseText += " is "
              responseText += tuesday[i]
              responseText += "\n"
            }
            break;
          case "wednesday":
            responseText += "Queue to have Wednesday taken:\n"
            for(var i = 0; i < wednesday.length; i++){
              responseText += "Position "
              responseText += (i + 1)
              responseText += " is "
              responseText += wednesday[i]
              responseText += "\n"
            }
            break;
          case "thursday":
            responseText += "Queue to have Thursday taken:\n"
            for(var i = 0; i < thursday.length; i++){
              responseText += "Position "
              responseText += (i + 1)
              responseText += " is "
              responseText += thursday[i]
              responseText += "\n"
            }
            break;
          case "friday":
            responseText += "Queue to have Friday taken:\n"
            for(var i = 0; i < friday.length; i++){
              responseText += "Position "
              responseText += (i + 1)
              responseText += " is "
              responseText += friday[i]
              responseText += "\n"
            }
            break;
          case "saturday":
            responseText += "Queue to have Saturday taken:\n"
            for(var i = 0; i < saturday.length; i++){
              responseText += "Position "
              responseText += (i + 1)
              responseText += " is "
              responseText += saturday[i]
              responseText += "\n"
            }
            break;
          default:
            break;
        }
        console.log(responseText)
        this.res.writeHead(200);
        postMessage(responseText);
        this.res.end();
      }
    }
    else if(msgArr[0] == "/queue"){
      var sender = request.name
      responseText += sender
      responseText += " placed in the queue for"
      for(var i=1;i < msgArr.length;i++){
        if(i > 3) responseText += ","
        if(i == msgArr.length - 1 && msgArr.length != 2) responseText += " and"
        switch (msgArr[i]) {
          case "sunday":
            responseText += " Sunday at position "
            sunday.push(sender)
            responseText += sunday.length
            break;
          case "monday":
            responseText += " Monday at position "
            monday.push(sender)
            responseText += monday.length
            break;
          case "tuesday":
            responseText += " Tuesday at position "
            tuesday.push(sender)
            responseText += tuesday.length
            break;
          case "wednesday":
            responseText += " Wednesday at position "
            wednesday.push(sender)
            responseText += wednesday.length
            break;
          case "thursday":
            responseText += " Thursday at position "
            thursday.push(sender)
            responseText += thursday.length
            break;
          case "friday":
            responseText += " Friday at position "
            friday.push(sender)
            responseText += friday.length
            break;
          case "saturday":
            responseText += " Saturday at position "
            saturday.push(sender)
            responseText += saturday.length
            break;
          default:
            break;
        }
      }
      console.log(responseText)
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