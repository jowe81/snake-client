// input.js: Handles user input from the keyboard

// Get logging function from "log" module
const { cl } = require('./log');

// Get array with canned messages from "constants" module
const { KEY_BINDINGS } = require('./constants');

// Connection handle
let _connection;

// Indicates whether or not we're in message-typing mode
let _typingMessage = false;

// Stores a free-text message as it's being typed
let _message = "";

// Send a move command
const move = (direction) => {
  if (['up', 'down', 'left', 'right'].includes(direction)) {
    // This is a valid direction - send the command
    cl(`Sending move ${direction} command`);
    _connection.write(`Move: ${direction}`);
  }
};

// Send a message
const sendMessage = (message) => {
  cl(`Sending message: ${message}`);
  _connection.write(`Say: ${message}`);
};

// Bind a keyboard listener
const setupInput = (conn) => {
  _connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf-8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  return stdin;
};

// Handle keyboard event (user input)
const handleUserInput = (data) => {

  // Check for CTRL + C
  if (data === '\u0003') {
    cl("CTRL + C received. Goodbye!", "Stdin");
    process.exit();
  }

  // Check if we're currently typing a message
  if (!_typingMessage) {
    // Not in message-typing mode

    switch (data) {
    
    // Navigate
    case KEY_BINDINGS.NAVIGATION.UP:
      move('up');
      break;
    case KEY_BINDINGS.NAVIGATION.LEFT:
      move('left');
      break;
    case KEY_BINDINGS.NAVIGATION.DOWN:
      move('down');
      break;
    case KEY_BINDINGS.NAVIGATION.RIGHT:
      move('right');
      break;

    // Enter message-typing mode
    case KEY_BINDINGS.TYPE_MESSAGE:
      _typingMessage = true;
      cl("Start typing message","Stdin");
    }

    // Send canned Message (digit)
    if (/\d/.test(data)) {
      cl(`Selected canned message: ${KEY_BINDINGS.CANNED_MESSAGES[data]}`,"Stdin");
      sendMessage(KEY_BINDINGS.CANNED_MESSAGES[data]);
    }

  } else {
    //Currently typing a message (exit with TYPE_MESSAGE key or digit)
    if (data !== KEY_BINDINGS.TYPE_MESSAGE && !/\d/.test(data)) {
      //Add this character to message
      _message += data;
    } else {
      //Valid exit key pressed
      if (/\d/.test(data)) {
        //Digit was given - overwrite indicated message-slot with current message
        KEY_BINDINGS.CANNED_MESSAGES[data] = _message;
      }
      //Send message and leave message-typing mode
      sendMessage(_message);
      _message = "";
      _typingMessage = false;
    }
  }
};

module.exports = { setupInput };