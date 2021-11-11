//Get logging function from "log" module
const { cl } = require('./log');
//Get array with canned messages from "constants" module
const { _cannedMessages } = require('./constants');

let _connection;
let _typingMessage = false;
let _message = "";

//Send a move command
const move = (direction) => {
  if (['up', 'down', 'left', 'right'].includes(direction)) {
    //This is a valid direction - send the command
    cl(`Sending the Move: ${direction} command`);
    _connection.write(`Move: ${direction}`);
  }
};

const sendMessage = (message) => {
  cl(`Sending message: ${message}`);
  _connection.write(`Say: ${message}`);
};

const setupInput = (conn) => {
  _connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf-8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  return stdin;
};

const handleUserInput = (data) => {
  //Check for CTRL+C
  if (data === '\u0003') {
    cl("CTRL+C received - goodbye!", "Keyboard");
    process.exit();
  }
  //Check if we're currently typing a message
  if (!_typingMessage) {
    //Not in message mode, check for move command keys
    switch (data) {
    case 'w':
      move('up');
      break;
    case 'a':
      move('left');
      break;
    case 's':
      move('down');
      break;
    case 'd':
      move('right');
      break;
    case '0':
      //Enter message mode
      _typingMessage = true;
      cl("Start typing message","Keyboard");
    }
    //Check for digit other than 0, and send canned message
    if (/[2-9]/.test(data)) {
      cl(`Sending: ${data}`,"Keyboard");
      sendMessage(data);
    }
  } else {
    //Currently typing a message - add to message until exiting with "0" key
    if (data !== "0") {
      //Add to message
      _message += data;
    } else {
      //Exit key pressed - send message and leave messaging mode
      sendMessage(_message);
      _message = "";
      _typingMessage = false;
    }
  }
};

module.exports = { setupInput };