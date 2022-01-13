var HTTPS = require('https');
var botID = "";

const maintenanceMode = 2

if(maintenanceMode != 0) {   
  botID = "bee00e962e7dd0d8fbc79f9f03"
}
else{
  botID = "3964152c789e251f4a7d5c864b"
}

var sunday = []
var monday = []
var tuesday = []
var wednesday = []
var thursday = []
var friday = []
var saturday = []

function clearQueue() {
  while(!sunday.length > 0){
    sunday.pop()
  }
  while(!monday.length > 0){
    monday.pop()
  }
  while(!tuesday.length > 0){
    tuesday.pop()
  }
  while(!wednesday.length > 0){
    wednesday.pop()
  }
  while(!thursday.length > 0){
    thursday.pop()
  }
  while(!friday.length > 0){
    friday.pop()
  }
  while(!saturday.length > 0){
    saturday.pop()
  }
  console.log("Queues cleared")
  this.res.writeHead(200)
  postMessage("Queues cleared for new week")
  this.res.end()
}

function respond() {
  var D = new Date()
  if(D.getDay == 1) clearQueue()
  var request = JSON.parse(this.req.chunks[0])
  var responseText = ""
  if (request.text) {
    var msgArr = request.text.toLowerCase().split(" ")
    if(msgArr[0] == "/unqueue"){
      if(maintenanceMode == 1){
        responseText = "My creator put me in maintenance mode until I stop forgetting the queue every day"
      }
      else if(msgArr.length == 1){
        responseText = "Must input a specific day of the week to remove yourself from the queue"
      }
      else{
        switch(msgArr[1]){
          case "sunday":
            queueLocation = sunday.indexOf(request.name)
            if(queueLocation == -1){
              responseText += request.name
              responseText += " was not found in the queue for Sunday"
              break;
            }
            else{
              sunday.splice(queueLocation, 1)
              responseText += request.name
              responseText += " removed from Sunday queue"
            }
            break;
          case "monday":
            queueLocation = monday.indexOf(request.name)
            if(queueLocation == -1){
              responseText += request.name
              responseText += " was not found in the queue for Monday"
              break;
            }
            else{
              monday.splice(queueLocation, 1)
              responseText += request.name
              responseText += " removed from Monday queue"
            }
            break;
          case "tuesday":
            queueLocation = tuesday.indexOf(request.name)
            if(queueLocation == -1){
              responseText += request.name
              responseText += " was not found in the queue for Tuesday"
              break;
            }
            else{
              tuesday.splice(queueLocation, 1)
              responseText += request.name
              responseText += " removed from Tuesday queue"
            }
            break;
          case "wednesday":
            queueLocation = wednesday.indexOf(request.name)
            if(queueLocation == -1){
              responseText += request.name
              responseText += " was not found in the queue for Wednesday"
              break;
            }
            else{
              wednesday.splice(queueLocation, 1)
              responseText += request.name
              responseText += " removed from Wednesday queue"
            }
            break;
          case "thursday":
            queueLocation = thursday.indexOf(request.name)
            if(queueLocation == -1){
              responseText += request.name
              responseText += " was not found in the queue for Thursday"
              break;
            }
            else{
              thursday.splice(queueLocation, 1)
              responseText += request.name
              responseText += " removed from Thursday queue"
            }
            break;
          case "friday":
            queueLocation = friday.indexOf(request.name)
            if(queueLocation == -1){
              responseText += request.name
              responseText += " was not found in the queue for Friday"
              break;
            }
            else{
              friday.splice(queueLocation, 1)
              responseText += request.name
              responseText += " removed from Friday queue"
            }
            break;
          case "saturday":
            queueLocation = saturday.indexOf(request.name)
            if(queueLocation == -1){
              responseText += request.name
              responseText += " was not found in the queue for Saturday"
              break;
            }
            else{
              saturday.splice(queueLocation, 1)
              responseText += request.name
              responseText += " removed from Saturday queue"
            }
            break;
          default:
            responseText += msgArr[1]
            responseText += " is not a day of the week"
            break;
        }
      }
      this.res.writeHead(200);
      postMessage(responseText);
      this.res.end();
    }
    else if(msgArr[0] == "/queuecheck"){
      if(maintenanceMode == 1){
        responseText = "My creator put me in maintenance mode until I stop forgetting the queue every day"
      }
      else if(msgArr.length == 1){
        responseText = "Must input a specific day of the week to check the queue"
      }
      else{
        switch (msgArr[1]) {
          case "sunday":
            if(sunday.length == 0){
              responseText = "The queue for Sunday is empty"
              break;
            }
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
            if(monday.length == 0){
              responseText = "The queue for Monday is empty"
              break;
            }
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
            if(tuesday.length == 0){
              responseText = "The queue for Tuesday is empty"
              break;
            }
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
            if(wednesday.length == 0){
              responseText = "The queue for Wednesday is empty"
              break;
            }
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
            if(thursday.length == 0){
              responseText = "The queue for Thursday is empty"
              break;
            }
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
            if(friday.length == 0){
              responseText = "The queue for Friday is empty"
              break;
            }
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
            if(saturday.length == 0){
              responseText = "The queue for Saturday is empty"
              break;
            }
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
            responseText += msgArr[1]
            responseText += " is not a day of the week"
            break;
        }
      }
      console.log(responseText)
      this.res.writeHead(200);
      postMessage(responseText);
      this.res.end();
    }
    else if(msgArr[0] == "/queue"){
      if(maintenanceMode == 1){
        responseText = "My creator put me in maintenance mode until I stop forgetting the queue every day"
      }
      else if(msgArr.length == 1){
        responseText = "Must include at least one day of the week to be added to the queue"
      }
      else{
        var sender = request.name
        responseText += sender
        responseText += " placed in the queue for"
        for(var i=1;i < msgArr.length;i++){
          if(i > 2) responseText += ","
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
              // responseText += ""
              break;
          }
        }
      }
      this.res.writeHead(200);
      postMessage(responseText);
      this.res.end();
    }
    else if(msgArr[0] == "/queuehelp"){
      responseText = "How to use queubot:\n"
      responseText += "Add yourself to the queue for a given day by sending \"/queue <day>\". Multiple days can be specified at once (e.g. /queue friday saturday).\n"
      responseText += "Remove "
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