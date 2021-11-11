const { cl } = require('./log');

const setupInput = () => {
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
};

module.exports = { setupInput };