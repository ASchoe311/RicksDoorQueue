var HTTPS = require('https');
const { Module } = require('module');

var querystring = require("querystring")
// const botID = "3964152c789e251f4a7d5c864b"
const botID = "bee00e962e7dd0d8fbc79f9f03"

var queueDict = {
  "sunday": [],
  "monday": [],
  "tuesday": [],
  "wednesday": [],
  "thursday": [],
  "friday": [],
  "saturday": []
}

function clearQueue() {
  for(const day in queueDict){
    queueDict[day].length = 0
  }
  console.log("Queues cleared")
}

function addToQueue() {
  var formData = new URLSearchParams(this.req.chunks[0]);
  if(formData.get('name') == "" || !(formData.has("days"))) { return }
  console.log("Manual queue request received")
  console.log(formData)
  days = formData.getAll('days')
  // console.log(days)
  if(days.length == 1){
    if(queueDict[days[0]].indexOf(formData.get('name')) == -1){
      queueDict[days[0]].push(formData.get('name'))
    }
    return;
  }
  else{
    for(let i=0; i<days.length; i++){
      if(queueDict[days[i]].indexOf(formData.get('name')) == -1){
        queueDict[days[i]].push(formData.get('name'))
      }
    }
  }
}

function respond() {
  // console.log(typeof(this.req.chunks[0]))
  if (this.req.chunks[0].indexOf("0x%5B%5D") != -1){
    console.log("Caught laravel attack query, ignoring")
    this.res.writeHead(400)
    this.res.end()
    return;
  }
  try {
    var request = JSON.parse(this.req.chunks[0])
  } catch (error){
    // console.error(error)
    console.error(error.constructor.name + " while parsing JSON for: " + this.req.chunks[0])
    // console.error(this.req.chunks[0])
    this.res.writeHead(400)
    this.res.end()
    return;
  }
  if (request.sender_type == "bot"){
    console.log("Bot message received, nothing to do")
    this.res.writeHead(200)
    this.res.end()
    return;
  }
  console.log(request)
  var responseText = ""
  if (request.text) {
    // WTF javascript
    var msgArr = request.text.toLowerCase().replace(/^\s+|\s+$/gm, '').split(" ")
    console.log("Parsed message: " + msgArr)
    if(msgArr[0] == "/unqueue"){
      if(msgArr.length == 1){
        responseText = "ERROR - /unqueue: No day specified"
      }
      else if(!(queueDict.hasOwnProperty(msgArr[1]))){
        responseText = "ERROR - /unqueue: Invalid day given -> " + msgArr[1]
      }
      else{
        queueLocation = queueDict[msgArr[1]].indexOf(request.name)
        if(queueLocation == -1){
          responseText += request.name + " was not found in the queue for "
        }
        else{
          queueDict[msgArr[1]].splice(queueLocation, 1)
          responseText += request.name + " removed from the queue for "
        }
        responseText += msgArr[1].charAt(0).toUpperCase() + msgArr[1].slice(1)
      }
      this.res.writeHead(200);
      postMessage(responseText);
      this.res.end();
    }
    else if(msgArr[0] == "/queuecheck"){
      responseText = "";
      if(msgArr.length == 1){
        responseText = "ERROR - /queuecheck: No days (or 'all') specified"
      }
      else{
        if(msgArr.length == 2 && msgArr[1] == "all"){
          msgArr = ["/queuecheck", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        }
        for(var i=1; i<msgArr.length; i++){
          if(!(queueDict.hasOwnProperty(msgArr[i]))){
            responseText = "ERROR - /queuecheck: Invalid day given -> " + msgArr[i]
            break
          }
          if(queueDict[msgArr[i]].length == 0){
            responseText += "The queue for " + msgArr[i].charAt(0).toUpperCase() + msgArr[i].slice(1)
            responseText += " is empty\n"
          }
          else{
            responseText += "Queue to have " + msgArr[i].charAt(0).toUpperCase() + msgArr[i].slice(1) + " taken:\n"
            for(let j=0; j < queueDict[msgArr[i]].length; j++){
              responseText += "Position ";
              responseText += (j + 1);
              responseText += " is ";
              responseText += queueDict[msgArr[i]][j];
              responseText += "\n";
            }
          }
          responseText += "\n"
        }
      }
      // console.log(responseText)
      this.res.writeHead(200);
      postMessage(responseText);
      this.res.end();
    }
    else if(msgArr[0] == "/queue"){
      var queued = 0
      let error = false;
      // console.log(msgArr.length)
      if(msgArr.length == 1){
        responseText = "ERROR - /queue: No day(s) specified"
        error = true
      }
      else{
        // console.log(msgArr.length)
        for(var i=1;i < msgArr.length;i++){
          // console.log(msgArr[i])
          if(!(queueDict.hasOwnProperty(msgArr[i]))){
            responseText = "ERROR - /queue: Invalid day given -> " + msgArr[i]
            error = true
            break;
          }
        }
        if(!error){
          var sender = request.name
          responseText += sender
          responseText += " placed in the queue for "
          for(var i=1;i < msgArr.length;i++){
            if(queueDict[msgArr[i]].indexOf(sender) == -1){
              queued += 1
              if(queued > 1 && msgArr.length > 3) responseText += ", "
              if(i == msgArr.length - 1 && queued >= 2) responseText += " and "
              queueDict[msgArr[i]].push(sender)
              responseText += msgArr[i].charAt(0).toUpperCase() + msgArr[i].slice(1)
              responseText += " at position " + queueDict[msgArr[i]].length
            }
            else{
              msgArr.splice(i, 1)
            }
          }
        }
      }
      this.res.writeHead(201);
      if(queued > 0 || error){ postMessage(responseText); }
      else { postMessage("Already queued, nothing to do"); }
      this.res.end();
    }
    else if(msgArr[0] == "/queuesite"){
      responseText = "http://doorqueue.adamschoe.com/"
      this.res.writeHead(200);
      postMessage(responseText);
      this.res.end();
    }
    else if(msgArr[0] == "/queuehelp"){
      responseText = "QueueBot Commands:\n"
      responseText += "\"/queue <day1> <day2> ...\": Add yourself to the queue for a given day or set of days.\n"
      responseText += "\"/unqueue <day>\": Remove yourself from the queue for a given day.\n"
      responseText += "\"/queuecheck <day1> <day2> ...\": Check the queue for a given day or set of days.\n"
      responseText += "\"/queuecheck all\": Check the queue for all days.(No longer sends 7 seperate messages!)\n"
      responseText += "\"/queuesite\": Shows the link to view/interact with the queue as a web page\n"
      responseText += "\"/queuehelp\": Show this help message."
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
exports.clearQueue = clearQueue;
exports.queue = queueDict;
exports.addToQueue = addToQueue;
