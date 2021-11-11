const { cl } = require('./log');

let _connection;

//Send a move command
const move = (direction) => {
  if (['up', 'down', 'left', 'right'].includes(direction)) {
    //This is a valid direction - send the command
    cl(`Sending the Move: ${direction} command`);
    _connection.write(`Move: ${direction}`);
  }
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
  cl(data,"Keyboard");
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
  }
};

module.exports = { setupInput };